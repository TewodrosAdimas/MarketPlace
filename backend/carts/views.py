from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from products.models import Product


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Get the current user's cart and all its items.
        """
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """
        Add a product to the cart.
        """
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity", 1)

        if not product_id or quantity <= 0:
            return Response(
                {"detail": "Product and valid quantity are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Check available quantity in stock
        if quantity > product.stock_quantity:  # Using stock_quantity
            return Response(
                {
                    "detail": "Requested quantity not available.",
                    "available_stock": product.stock_quantity,
                    "requested_quantity": quantity,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        cart, created = Cart.objects.get_or_create(user=request.user)

        # Check if the product is already in the cart
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        if not created:
            # Update quantity if product is already in cart
            new_quantity = cart_item.quantity + quantity
            if new_quantity > product.stock_quantity:
                return Response(
                    {
                        "detail": "Requested quantity exceeds available stock.",
                        "available_stock": product.stock_quantity,
                        "requested_quantity": new_quantity,
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            cart_item.quantity = new_quantity
        else:
            cart_item.quantity = quantity

        cart_item.save()
        return Response(
            {"detail": "Product added to cart."}, status=status.HTTP_201_CREATED
        )


class RemoveFromCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, cart_item_id):
        """
        Remove an item from the cart.
        """
        try:
            cart_item = CartItem.objects.get(id=cart_item_id, cart__user=request.user)
            cart_item.delete()
            return Response(
                {"detail": "Product removed from cart."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except CartItem.DoesNotExist:
            return Response(
                {"detail": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND
            )

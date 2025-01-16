from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsSellerOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser

class ProductListView(APIView):
    """
    View to list all products.
    No authentication required for listing products.
    """

    def get(self, request):
        """
        Get a list of all products.
        """
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data) 


class ProductCreateView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can create products
    parser_classes = [MultiPartParser, FormParser]  # Support file uploads

    def post(self, request):
        if not request.user.is_authenticated:  # Check if the user is authenticated
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        
        if request.user.user_type != "seller":  # Only sellers can create products
            return Response(
                {"detail": "Only sellers can create products."},
                status=status.HTTP_403_FORBIDDEN,
            )

        data = request.data.copy()  # Make a mutable copy
        data["user"] = request.user.id  # Attach the user to the product data

        # Create the product
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()  # Save the product with the user and image file
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        def create(self, validated_data):
        # Ensure the file is saved properly
    
            return Product.objects.create(**validated_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsSellerOrReadOnly]

    def put(self, request, product_id):
        """
        Update an existing product by ID (only for the owner/seller).
        """
        try:
            product = Product.objects.get(id=product_id)
            self.check_object_permissions(
                request, product
            )  # Ensure the user owns the product
            serializer = ProductSerializer(product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response(
                {"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND
            )


class ProductDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsSellerOrReadOnly]

    def delete(self, request, product_id):
        """
        Delete a product by ID (only for the owner/seller).
        """
        try:
            product = Product.objects.get(id=product_id)
            self.check_object_permissions(
                request, product
            )  # Ensure the user owns the product
            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response(
                {"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND
            )


class ProductDetailView(APIView):
    permission_classes = [IsSellerOrReadOnly]

    def get(self, request, product_id):
        """
        Get the details of a specific product by ID.
        """
        try:
            product = Product.objects.get(id=product_id)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response(
                {"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, product_id):
        """
        Update an existing product by ID (only for the owner/seller).
        """
        try:
            product = Product.objects.get(id=product_id)
            self.check_object_permissions(
                request, product
            )  # Ensure the user owns the product
            serializer = ProductSerializer(product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response(
                {"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, product_id):
        """
        Delete a specific product by ID (only for the owner/seller).
        """
        try:
            product = Product.objects.get(id=product_id)
            self.check_object_permissions(
                request, product
            )  # Ensure the user owns the product
            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response(
                {"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND
            )

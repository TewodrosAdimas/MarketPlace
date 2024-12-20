from rest_framework.permissions import BasePermission

class IsSellerOrReadOnly(BasePermission):
    """
    Custom permission to allow only sellers to modify their products.
    Anyone can view the list of products.
    """
    def has_permission(self, request, view):
        if request.method in ['GET']:  # Allow anyone to view the product list
            return True
        return request.user.is_authenticated and request.user.user_type == 'seller'

    def has_object_permission(self, request, view, obj):
        """
        Allow sellers to update or delete only their own products.
        """
        if request.method in ['GET']:  # Allow anyone to view product details
            return True
        return obj.user == request.user  # Only the seller who created the product can modify it

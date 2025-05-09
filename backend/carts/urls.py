from django.urls import path
from .views import CartView, AddToCartView, RemoveFromCartView

urlpatterns = [
    path("", CartView.as_view(), name="cart"),
    path("add/", AddToCartView.as_view(), name="add_to_cart"),
    path("remove/<int:cart_item_id>/", RemoveFromCartView.as_view(), name="remove_from_cart"),
]

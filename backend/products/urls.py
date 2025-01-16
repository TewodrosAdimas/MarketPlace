from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import (
    ProductListView,
    ProductCreateView,
    ProductDetailView,
    ProductUpdateView,
    ProductDeleteView,
)

urlpatterns = [
    path(
        "", ProductListView.as_view(), name="product-list"
    ),  # Only GET method (for listing products)
    path(
        "create/", ProductCreateView.as_view(), name="product-create"
    ),  # Only POST method (for creating a product)
    path("<int:product_id>/", ProductDetailView.as_view(), name="product-detail"),
    path(
        "<int:product_id>/update/", ProductUpdateView.as_view(), name="update-product"
    ),  # New URL for updating product
    path(
        "<int:product_id>/delete/", ProductDeleteView.as_view(), name="delete-product"
    ),  # New URL for deleting product
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

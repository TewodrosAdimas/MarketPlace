from django.urls import path
from .views import RegisterUserView, ActivateBuyerAccountView, LoginView, LogoutView
from rest_framework.permissions import AllowAny
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from .views import RegisterUserView

# Create the schema view for documentation
schema_view = get_schema_view(
    openapi.Info(
        title="Online Store API",
        default_version='v1',
        description="API documentation for the Online Store",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="youremail@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[AllowAny],  # Allow anyone to access the documentation
)

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register-user'),
    path('activate/', ActivateBuyerAccountView.as_view(), name='activate_buyer'),
    # Swagger or ReDoc Docs
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-docs'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]


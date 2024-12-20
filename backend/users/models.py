from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('seller', 'Seller'),
        ('buyer', 'Buyer'),
    )
    email = models.EmailField(unique=True)  # Ensure email is unique
    USERNAME_FIELD = 'email'  # Set email as the unique identifier for authentication
    REQUIRED_FIELDS = ['username']  # Keep username as a required field for migrations but not for authentication
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    is_approved = models.BooleanField(default=False)  # For seller approval
    verification_code = models.CharField(max_length=6, blank=True, null=True)  # For buyers

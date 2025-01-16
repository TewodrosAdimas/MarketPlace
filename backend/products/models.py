from django.db import models
from users.models import User  # Import the User model from the users app


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)
    stock_quantity = models.IntegerField()
    image = models.ImageField(upload_to="images/", blank=True, null=True)  
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE
    )  # Foreign key to the User model

    def __str__(self):
        return self.name

    def available_stock(self):
        return self.stock_quantity

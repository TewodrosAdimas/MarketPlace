from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "category",
            "stock_quantity",
            "image",
            "created_at",
            "user",
        ]
        read_only_fields = ["created_at"]  # Only 'created_at' should be read-only

    def validate(self, attrs):
        if attrs.get("price") <= 0:
            raise serializers.ValidationError(
                {"price": "Price must be a positive number."}
            )
        if attrs.get("stock_quantity") < 0:
            raise serializers.ValidationError(
                {"stock_quantity": "Stock quantity cannot be negative."}
            )
        return attrs

    def create(self, validated_data):
        # If 'user' is passed in the data, use it, otherwise set it manually
        user = validated_data.get("user", None)
        if not user:
            raise serializers.ValidationError({"user": "User field is required."})
        return super().create(validated_data)

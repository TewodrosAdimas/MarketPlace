from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'user_type']
        extra_kwargs = {
            'user_type': {'required': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=validated_data['user_type'],
        )
        return user



from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Authenticate the user using email and password
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid email or password")

        # Generate JWT tokens (access and refresh)
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),  # Access token
            'refresh': str(refresh),  # Refresh token
        }


class BuyerActivationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'], user_type='buyer')
            if user.verification_code != data['code']:
                raise serializers.ValidationError("Invalid verification code.")
            if user.is_active:
                raise serializers.ValidationError("Account is already active.")
        except User.DoesNotExist:
            raise serializers.ValidationError("No such buyer exists.")
        return data

    def save(self, **kwargs):
        email = self.validated_data['email']
        user = User.objects.get(email=email)
        user.is_active = True
        user.verification_code = None
        user.save()
        return user

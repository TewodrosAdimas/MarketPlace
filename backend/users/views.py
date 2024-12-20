from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer, BuyerActivationSerializer, LoginSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated



class RegisterUserView(APIView):
    permission_classes = [AllowAny]  # No authentication required
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully. Please check email or wait for approval."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActivateBuyerAccountView(APIView):
    permission_classes = [AllowAny]  # No authentication required
    def post(self, request):
        serializer = BuyerActivationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account activated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class LoginView(APIView):
    permission_classes = [AllowAny]  # Only authenticated users can log out

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LogoutView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can log out

    def post(self, request):
        # There's no need to clear anything on the server side for JWT, but we can inform the client to discard the token.
        response = Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        return response







from api.models.user import User
from api.serializers.user_serializer import UserSerializer
from api.authentication import CustomUserAuthentication

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    authentication_classes = (CustomUserAuthentication,)
    permission_classes = (IsAuthenticated, IsAdminUser,)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    authentication_classes = (CustomUserAuthentication, )
    permission_classes = (IsAuthenticated, IsAdminUser,)
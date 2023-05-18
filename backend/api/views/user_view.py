from api.models.user import User
from api.serializers.user_serializer import UserSerializer
from api.authentication import CustomUserAuthentication

from django.http import JsonResponse

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import JSONRenderer


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


@api_view(['GET'])
@permission_classes([AllowAny])
@renderer_classes([JSONRenderer])
def username_exists(request):
    username = request.GET.get('username', '')
    if not username:
        return JsonResponse({'error': 'Username is required.'}, status=400)
    
    user_exists = User.objects.filter(username__iexact=username).exists()
    return JsonResponse({'exists': user_exists})


@api_view(['GET'])
@permission_classes([AllowAny])
@renderer_classes([JSONRenderer])
def email_exists(request):
    email = request.GET.get('email', '')
    if not email:
        return JsonResponse({'error': 'Email is required.'}, status=400)
    
    email_exists = User.objects.filter(email__iexact=email).exists()
    return JsonResponse({'exists': email_exists})
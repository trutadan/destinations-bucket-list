from api.authentication import CustomUserAuthentication
from api.serializers.user_account_serializer import UserAccountSerializer

from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated


class UserAccountView(RetrieveUpdateAPIView):
    serializer_class = UserAccountSerializer

    authentication_classes = (CustomUserAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        kwargs['fields'] = ['first_name', 'last_name', 'username']
        
        return super().partial_update(request, *args, **kwargs)

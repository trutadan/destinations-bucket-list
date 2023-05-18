from api.authentication import CustomUserAuthentication
from api.serializers.user_role_serializer import UserRoleSerializer

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class UserRoleView(APIView):
    serializer_class = UserRoleSerializer

    authentication_classes = (CustomUserAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(user)

        return Response(serializer.data)
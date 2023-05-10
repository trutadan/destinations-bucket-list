from api.authentication import CustomUserAuthentication

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class CancelAccountView(APIView):
    authentication_classes = (CustomUserAuthentication,)
    permission_classes = (IsAuthenticated,)

    def delete(self, request):
        user = request.user
        user.delete()

        response = Response()
        response.delete_cookie('jwt', path="/")
        response.data = {
            'message': 'Account deleted successfully!'
        }
        
        return response

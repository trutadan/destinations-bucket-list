from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.serializers.destination_add_update_serializer import DestinationSerializer
from api.authentication import CustomUserAuthentication
class AddDestinationView(APIView):
    """
    Add new destination
    """
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomUserAuthentication]

    def post(self, request):
        """
        Add new destination
        """
        serializer = DestinationSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            belonging_user = request.data['belonging_user']
            if user.is_staff:
                if belonging_user == "publicUser":
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        {"message": "Staff can only add destinations to public user"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            elif user.username == belonging_user:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(
                    {"message": "You can only add destinations to your own account"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
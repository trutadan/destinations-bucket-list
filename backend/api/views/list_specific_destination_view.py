from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models.destination import *
from api.serializers.destination_add_update_serializer import DestinationSerializer
from api.authentication import CustomUserAuthentication


class ListSpecificDestinationView(APIView):
    """
    List specific destination
    """
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomUserAuthentication]

    def get(self, request):
        """
        List specific destination. JSON needs to contain 'id' key with value of destination id
        """
        user = request.user
        destination_id = request.data.get('id', None)

        if destination_id is None:
            return Response(
                {"message": "Bad request: No id provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            destination = Destination.objects.get(pk=destination_id)
        except Destination.DoesNotExist:
            return Response(
                {"message": "Destination not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        belonging_user = destination.belonging_user.username

        if user.is_staff:
            if belonging_user == "publicUser":
                serializer = DestinationSerializer(destination)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "Staff can only list destinations of public user"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        elif user.username == belonging_user or belonging_user == "publicUser":
            serializer = DestinationSerializer(destination)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "User can only list their own destinations"},
                status=status.HTTP_400_BAD_REQUEST
            )
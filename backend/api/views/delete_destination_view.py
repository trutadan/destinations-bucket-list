from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models.destination import *


class DeleteDestinationView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        """
        Delete destination of user, JSON needs to contain 'id' key with value of destination id
        """
        user = request.user

        requested_data = request.data.get('id', None)

        if requested_data is None:
            return Response(
                {"message": "Bad request"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            destination = Destination.objects.get(id=requested_data)
        except Destination.DoesNotExist:
            return Response(
                {"message": "Destination does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if user.is_staff:
            if destination.belonging_user == "public_user":
                destination.delete()
                return Response(
                    {"message": "Destination deleted successfully"},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"message": "Staff can only delete destinations of public list"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        elif user.username == destination.belonging_user:
            destination.delete()
            return Response(
                {"message": "Destination deleted successfully"},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"message": "You can only delete destinations of your own account"},
                status=status.HTTP_400_BAD_REQUEST
            )
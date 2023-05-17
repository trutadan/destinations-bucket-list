from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models.destination import *
from api.serializers.destination_add_update_serializer import DestinationSerializer


class UpdateDestinationView(APIView):
    """
    Update destination
    """
    permission_classes = [IsAuthenticated]

    def put(self, request):
        """
        Update destination
        """
        user = request.user
        belonging_user = request.data['belonging_user']

        if user.is_staff:
            if belonging_user == "public_user":
                try:
                    destination = Destination.objects.get(pk=request.data['id'])
                except Destination.DoesNotExist:
                    return Response(
                        {"message": "Destination not found"},
                        status=status.HTTP_404_NOT_FOUND
                    )
                serializer = DestinationSerializer(destination, data=request.data)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "Staff can only update destinations of public user"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        elif user.username == belonging_user:
            try:
                destination = Destination.objects.get(pk=request.data['id'])
            except Destination.DoesNotExist:
                return Response(
                    {"message": "Destination not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            serializer = DestinationSerializer(destination, data=request.data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(
            {"message": "You can only update destinations of your own account"},
            status=status.HTTP_400_BAD_REQUEST
        )

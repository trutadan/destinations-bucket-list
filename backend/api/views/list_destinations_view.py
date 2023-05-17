from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models.destination import *
from api.serializers.destination_add_update_serializer import DestinationSerializer


class ListDestinationsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        List destinations of user, JSON needs to contain 'list' key with value 'private' or 'public'
        """
        user = request.user

        requested_data = request.data.get('list', 'private')

        destinations = []

        if user.is_staff:
            destinations = Destination.objects.filter(belonging_user="public_user")
            serializer = DestinationSerializer(destinations, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        elif requested_data == "private":
            destinations = Destination.objects.filter(belonging_user=user.username)
            serializer = DestinationSerializer(destinations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif requested_data == "public":
            destinations = Destination.objects.filter(belonging_user="public_user")
            serializer = DestinationSerializer(destinations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "Bad request"},
                status=status.HTTP_400_BAD_REQUEST
            )
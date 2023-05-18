from rest_framework import serializers

from api.models.destination import Destination
import requests


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ['id', 'title', 'latitude', 'longitude', 'description', 'image_url', 'arrive_date', 'depart_date', 'belonging_user']




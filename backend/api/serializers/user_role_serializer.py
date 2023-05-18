from api.models.user import User

from rest_framework import serializers


class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'role']
import re

from api.models.user import User

from rest_framework import serializers


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username']
        extra_kwargs = {'email': {'required': False}}

    def validate(self, data):
        if not data['username'].isalnum():
            raise serializers.ValidationError("Username can only contain letters and numbers.")
        
        if len(data['username']) < 4:
            raise serializers.ValidationError("Username must be at least 4 characters long.")
        
        username_exists = User.objects.filter(username=data['username'])
        if self.instance:
            username_exists = username_exists.exclude(id=self.instance.id)
        if username_exists.exists():
            raise serializers.ValidationError("Username already exists.")
        
        return data
    
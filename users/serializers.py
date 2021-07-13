from rest_framework import serializers
from django.contrib.auth.models import User

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email']

class RegisterSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={"input_style": "password"},write_only=True)

    class Meta:
        model = User
        fields = ['username','email','password','password2','first_name',"last_name"]
        extra_kwargs = {
            "password" : {'write_only':True}
        }

    def save (self):
        if self.validated_data['password'] != self.validated_data['password2']:
            raise serializers.ValidationError("Passwords Do Not Match")
        user = User(
            email = self.validated_data['email'],
            username = self.validated_data['username'],
            first_name = self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
        )
        user.set_password(self.validated_data['password'])
        user.save()
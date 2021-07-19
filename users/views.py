from django.shortcuts import render
from .serializers import userSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status

class RegisterView(viewsets.ModelViewSet):

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.select_related('auth_token').get(username=serializer.data['username'])
            data = {'username':serializer.data['username'],'email':serializer.data['email'],'token':user.auth_token.key}
            return Response(data)
        else:
            return Response(serializer.errors)

class LogoutUserView(viewsets.ModelViewSet):  

    def patch(self, request, format=None, *args, **kwargs):
        try :
            print(request.META)
            print(request.user.auth_token)
        except:
            print("No")
        return Response(status=status.HTTP_200_OK)
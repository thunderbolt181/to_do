from to_do.authentication import UserAuthentication
from rest_framework import response
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib import auth
from rest_framework.authentication import TokenAuthentication , SessionAuthentication

class RegisterView(viewsets.ModelViewSet):
    permission_classes=(AllowAny,)

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
    authentication_classes = (UserAuthentication,SessionAuthentication)

    def patch(self, request, format=None, *args, **kwargs):
        try:
            Token.objects.get(user=request.user).delete()
            response = Response(status=status.HTTP_200_OK)
            response.delete_cookie('auth_token_cookie')
            return response
        except Token.DoesNotExist:
            response = Response(status=status.HTTP_200_OK)
            response.delete_cookie('auth_token_cookie')
            return response

class LoginUserView(viewsets.ModelViewSet):
    authentication_classes = (SessionAuthentication,)
    def create(self, request, *args, **kwargs):
        if request.data['username'] and request.data['password']:
            Username, Password = request.data['username'], request.data['password']
            user = auth.authenticate(username=Username, password=Password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                response = Response(status=status.HTTP_200_OK)
                response.set_cookie('auth_token_cookie',token.key,httponly=True,samesite='strict')
                return response
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        
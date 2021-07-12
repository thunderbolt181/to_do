from django.shortcuts import render
from .serializers import userSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response

class LoginView(viewsets.ModelViewSet):

    def list(self, request, *args, **kwargs):
        print("accessable")
        return Response({"Login Method":"GET"})
        
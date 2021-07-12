from django.shortcuts import render
from .serializers import userSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.response import Response

class RegisterView(viewsets.ModelViewSet):

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'valid':True})
        else:
            return Response(serializer.errors)
        
import os
from django.shortcuts import render
from to_do import settings
from rest_framework import generics, viewsets
from .models import to_do
from .serializers import todoSerializer

class ListView(viewsets.ModelViewSet):
    queryset = to_do.objects.all()
    serializer_class = todoSerializer
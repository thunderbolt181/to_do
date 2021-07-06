import os
from django.shortcuts import render
from to_do import settings
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import to_do
from .serializers import todoSerializer

# pk is only used when primary key is use in url
# GET -> retrieve(self, request, pk, format=None)
# PUT -> update(self, request, pk, format=None)
# PATCH -> partial_update(self, request, pk, format=None)
# DELETE -> destroy(self, request, pk, format=None)
# POST- > create(self, request, format=None)


class ListView(viewsets.ModelViewSet):
    queryset = to_do.objects.all()
    serializer_class = todoSerializer

class ToDoView(viewsets.ViewSet):

    def list(self, request,format=None, *args, **kwargs):
        todo_list=to_do.objects.all()
        serializer = todoSerializer(todo_list, many=True)
        return Response(serializer.data)

    
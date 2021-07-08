import os
from django.shortcuts import render
from to_do import settings
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import to_do
from .serializers import todoSerializer,todoPostSerializer
from django.http import Http404

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
    queryset = to_do.objects.all()

    def get_queryset(self):
        return self.queryset

    def get_object(self):
        pk = self.kwargs['pk']
        try:
            return self.get_queryset().get(id=pk)
        except to_do.DoesNotExist:
            raise Http404

    def list(self, request,format=None, *args, **kwargs):
        todo_list=self.queryset
        serializer = todoSerializer(todo_list, many=True)
        return Response(serializer.data)

    def retrieve(self,request,format=None,*args,**kwargs):
        obj = self.get_object()
        serializer = todoSerializer(obj,many=False)
        return Response(serializer.data,status=status.HTTP_404_NOT_FOUND)

    def create(self, request, format=None, *args, **kwargs):
        serializer = todoPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'valid':True})
        else:
            return Response({'valid':False})

    
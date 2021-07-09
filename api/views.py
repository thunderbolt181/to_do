import os
from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import to_do
from .serializers import todoSerializer,todoPostSerializer,todoPutSerializer
from django.http import Http404
from rest_framework import status

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

    def get_queryset(self):
        return self.queryset

    def get_object(self):
        pk = self.kwargs['pk']
        try:
            return to_do.objects.get(id=pk)
        except to_do.DoesNotExist:
            raise Http404

    def list(self, request, *args, **kwargs):
        todo_list=to_do.objects.all()
        serializer = todoSerializer(todo_list, many=True)
        return Response(serializer.data)

    def retrieve(self,request,*args,**kwargs):
        obj = self.get_object()
        serializer = todoSerializer(obj,many=False)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = todoPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'valid':True})
        else:
            return Response({'valid':False})

    def partial_update(self,request,*args,**kwargs):
        instance = self.get_object()
        print(request.data)
        serializer = todoPutSerializer(instance, data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        print(serializer.validated_data)
        serializer.save()
        return Response(serializer.data)

    # def destroy(self, request, *args,**kwargs):
    #     print(kwargs['pk'])
    #     return Response(({"http_method":"DELETE"}))

    
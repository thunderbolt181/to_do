import os
from django.db.models import Q
# from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import to_do
from .serializers import todoSerializer,todoPostSerializer,todoPutSerializer
from django.http import Http404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication , SessionAuthentication
from rest_framework.permissions import IsAuthenticated

class ToDoView(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,SessionAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_object(self,r_user):
        pk = self.kwargs['pk']
        try:
            lookup = Q(id=pk) & Q(user=r_user)
            return to_do.objects.get(lookup)
        except to_do.DoesNotExist:
            raise Http404

    def list(self, request, *args, **kwargs):
        todo_list=to_do.objects.filter(user=request.user)[::-1]
        serializer = todoSerializer(todo_list, many=True)
        return Response(serializer.data)

    def retrieve(self,request,*args,**kwargs):
        obj = self.get_object(request.user)
        serializer = todoSerializer(obj,many=False)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = todoPostSerializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save(user=request.user)
            return Response({'valid':True,'id':obj.id})
        else:
            return Response({'valid':False},status=status.HTTP_404_NOT_FOUND)

    def partial_update(self,request,*args,**kwargs):
        instance = self.get_object(request.user)
        serializer = todoPutSerializer(instance, data=request.data,partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'valid':True})
        else:
            return Response({'valid':False},status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, *args,**kwargs):
        instance = self.get_object(request.user)
        instance.delete()
        return Response({"valid":True})

    
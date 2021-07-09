from rest_framework import serializers
from .models import to_do

class todoSerializer(serializers.ModelSerializer):
    class Meta:
        model = to_do
        fields = ['id','title','tasks','created_at','completed']

class todoPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = to_do
        fields = ['title','tasks']

class todoPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = to_do
        fields = ['title','tasks','completed']
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

    def save(self,user):
        item = to_do(
            title = self.validated_data['title'],
            tasks = self.validated_data['tasks'],
        )
        item.user=user
        item.save()
        return item

class todoPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = to_do
        fields = ['title','tasks','completed']
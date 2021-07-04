from rest_framework import generics
from .models import to_do
from .serializers import todoSerializer

class home(generics.ListAPIView):
    queryset = to_do.objects.all()
    serializer_class = todoSerializer
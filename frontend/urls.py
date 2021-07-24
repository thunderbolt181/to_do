from django.urls import path
from .views import index,fakeloginview

urlpatterns = [
    path('',index),
    path('login/',index,name='login'),
]
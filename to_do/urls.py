"""to_do URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework import routers
from django.urls import path,include
from api import views as apiviews
from users import views as usersviews
# from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'todoviews',apiviews.ToDoView,'todoview')
router.register(r'register',usersviews.RegisterView,'register')
router.register(r'logout',usersviews.LogoutUserView,'logout')
router.register(r'Userlogin',usersviews.LoginUserView,'Userlogin')

urlpatterns = [
    path('adminpanel_django/', admin.site.urls),
    path('api/',include(router.urls)),
    path('',include("frontend.urls")),
    # path('loginUser',obtain_auth_token, name='loginUser'),
] 


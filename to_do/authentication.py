from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions

class UserAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        username = "thunderbolt"#request.META.get('HTTP_X_USERNAME')
        if not username:
            return None

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')
        print(user)

        return (user, None)
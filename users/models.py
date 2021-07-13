from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver 
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=User)
def created_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
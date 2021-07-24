from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

class to_do(models.Model):
    title = models.CharField(default="",null=False,max_length=50)
    tasks = models.TextField(default="",null=False)
    created_at = models.DateTimeField(auto_now_add=True,null=False)
    completed = models.BooleanField(default=False,null=False)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

    def __str__(self):
        return self.title
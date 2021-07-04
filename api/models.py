from django.db import models

class to_do(models.Model):
    title = models.CharField(default="",unique=True,null=False,max_length=50)
    tasks = models.TextField(default="",null=False)
    created_at = models.DateTimeField(auto_now_add=True,null=False)

    def __str__(self):
        return self.title
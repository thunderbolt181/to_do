# Generated by Django 3.2.5 on 2021-07-06 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_time_created_to_do_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='to_do',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]

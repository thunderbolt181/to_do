# Generated by Django 3.2.5 on 2021-07-04 17:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_created_on_to_do_time_created'),
    ]

    operations = [
        migrations.RenameField(
            model_name='to_do',
            old_name='time_created',
            new_name='created_at',
        ),
    ]

# Generated by Django 3.1.11 on 2022-01-24 20:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailpages', '0066_auto_20220113_1925'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='relatedblogposts',
            options={'ordering': ['sort_order'], 'verbose_name': 'Related blog posts', 'verbose_name_plural': 'Related blog posts'},
        ),
    ]
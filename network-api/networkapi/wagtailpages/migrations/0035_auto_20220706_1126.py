# Generated by Django 3.2.13 on 2022-07-06 11:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0066_collection_management_permissions'),
        ('wagtailpages', '0034_blogindexpage_related_topics'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='blogauthors',
            options={},
        ),
        migrations.AddField(
            model_name='blogauthors',
            name='locale',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='wagtailcore.locale'),
        ),
        migrations.AddField(
            model_name='blogauthors',
            name='translation_key',
            field=models.UUIDField(editable=False, null=True),
        ),
    ]
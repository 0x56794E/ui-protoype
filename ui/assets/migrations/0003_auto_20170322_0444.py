# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-22 04:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0002_asset_asset_symbol'),
    ]

    operations = [
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('creation_date', models.DateTimeField(verbose_name=b'Date created')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.AlterModelOptions(
            name='asset',
            options={'ordering': ('name',)},
        ),
        migrations.AddField(
            model_name='portfolio',
            name='assets',
            field=models.ManyToManyField(to='assets.Asset'),
        ),
    ]

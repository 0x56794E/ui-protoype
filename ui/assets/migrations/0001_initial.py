# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-22 02:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Asset',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('asset_type', models.CharField(choices=[(b'Stock', b'st'), (b'Equity', b'eq'), (b'Commodity', b'cm')], default=b'Stock', max_length=10)),
            ],
        ),
    ]

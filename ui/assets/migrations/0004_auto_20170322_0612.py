# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-22 06:12
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0003_auto_20170322_0444'),
    ]

    operations = [
        migrations.CreateModel(
            name='AssetPortfolio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('percent', models.IntegerField(default=0)),
            ],
        ),
        migrations.AlterField(
            model_name='asset',
            name='asset_type',
            field=models.CharField(choices=[(b'Stock', b'Stock'), (b'Equity', b'Equity'), (b'Commodity', b'Commodity')], default=b'Stock', max_length=10),
        ),
        migrations.AddField(
            model_name='assetportfolio',
            name='asset',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assets.Asset'),
        ),
        migrations.AddField(
            model_name='assetportfolio',
            name='portfolio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assets.Portfolio'),
        ),
    ]

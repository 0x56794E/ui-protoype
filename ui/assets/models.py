from django.db import models

class Asset(models.Model):
    ASSET_TYPES = (
        ('Stock', 'st'),
        ('Equity', 'eq'),
        ('Commodity', 'cm'),
    )
    
    name = models.CharField(max_length=200)
    asset_symbol = models.CharField(max_length=10, default='')
    asset_type = models.CharField(max_length=10, choices=ASSET_TYPES, default='Stock')
    

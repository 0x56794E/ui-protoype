from django.db import models

class Asset(models.Model):
    ASSET_TYPES = (
        ('Stock', 'Stock'),
        ('Equity', 'Equity'),
        ('Commodity', 'Commodity'),
    )
    
    name = models.CharField(max_length=200)
    asset_symbol = models.CharField(max_length=10, default='')
    asset_type = models.CharField(max_length=10, choices=ASSET_TYPES, default='Stock')

    # toString equiv
    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)
        
class Portfolio(models.Model):
    name = models.CharField(max_length=200)
    creation_date = models.DateTimeField('Date created')
    assets = models.ManyToManyField(Asset)
    
    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)

class AssetPortfolio(models.Model):
    asset = models.ForeignKey(Asset)
    portfolio = models.ForeignKey(Portfolio)
    percent = models.IntegerField(default=0)

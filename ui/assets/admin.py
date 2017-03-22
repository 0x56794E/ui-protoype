from django.contrib import admin

from .models import Portfolio, Asset, AssetPortfolio

# Create assets inline
class AssetPortfolioInline(admin.TabularInline):
    model = AssetPortfolio
    extra = 2


# Customize portfolio
class PortfolioAdmin(admin.ModelAdmin):
    # Separate fields
    fieldsets = [
        (None, {'fields': ['name']}),
        ('Date Info', {'fields': ['creation_date'], 'classes': ['collapse']}),
    ]
    inlines = [AssetPortfolioInline]
    search_fields = ['name']
    list_display = ('name', 'creation_date')
    
class AssetAdmin(admin.ModelAdmin):
    pass

# Register your models here.
# to make the class editable from admin page
admin.site.register(Portfolio, PortfolioAdmin)
admin.site.register(Asset, AssetAdmin)

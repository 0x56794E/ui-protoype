from django.contrib import admin

from .models import Portfolio

# Register your models here.
# to make the class editable from admin page

admin.site.register(Portfolio)

from django.contrib import admin

from .models import Asset

# Register your models here.
# to make the class editable from admin page

admin.site.register(Asset)

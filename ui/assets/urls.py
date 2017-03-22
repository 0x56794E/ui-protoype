from django.conf.urls import url

from . import views

app_name = 'assets'
urlpatterns = [
    # eg /assets/
    url(r'^$', views.index, name='index'),
    
    # eg /assets/1
    url(r'^(?P<portfolio_id>[0-9]+)/$', views.detail, name='detail'),
    
]

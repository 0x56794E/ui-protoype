from django.shortcuts import render

from .models import Portfolio

def index(request):
    portfolios = Portfolio.objects.order_by('-creation_date')[:5]
    context = {'portfolios' : portfolios }
    return render(request, 'assets/index.html', context)

def detail(request, portfolio_id):
    return HttpResponse("Portfolio %s." % porfolio_id)


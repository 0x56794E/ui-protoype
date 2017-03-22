from django.shortcuts import render, get_object_or_404

from .models import Portfolio

def index(request):
    portfolios = Portfolio.objects.order_by('-creation_date')[:5]
    context = {'portfolios' : portfolios }
    return render(request, 'assets/index.html', context)

def detail(request, portfolio_id):
    port = get_object_or_404(Portfolio, pk=portfolio_id)
    return render(request, 'assets/detail.html', {'portfolio' : port})


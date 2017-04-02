from django.shortcuts import render

def index(request):
    context = {'name': 'Vy'}
    return render(request, "dashboard/index.html", context);
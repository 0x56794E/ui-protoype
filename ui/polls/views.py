from django.http import Http404
from django.shortcuts import render

from .models import Question

def index (request):
    q_list = Question.objects.order_by('-pub_date')[:5]
    context = {
        'q_list' : q_list
    }

    return render(request, 'polls/index.html', context)

def detail(request, question_id):
    try:
        q = Question.objects.gets(pk=question_id)
    except Question.DoesNotExist:
        raise Http404('Question does not exist')
    
    return render(request, 'polls/details.html', {'question' : q})

def results(request, question_id):
    response = "You're looking at results of q %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on q %s." %  question_id)


from django.shortcuts import get_object_or_404, render

from .models import Question

def index (request):
    q_list = Question.objects.order_by('-pub_date')[:5]
    context = {
        'q_list' : q_list
    }

    return render(request, 'polls/index.html', context)

def detail(request, question_id):
    q = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question' : q})

def results(request, question_id):
    response = "You're looking at results of q %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))


from django.shortcuts import get_object_or_404, render

def HomeView(request):    
    context = {}
    return render(request, 'home.html', context)

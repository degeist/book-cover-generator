from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

def HomeView(request):    
    context = {
    	'site_url': settings.SITE_URL,
    }
    return render(request, 'home.html', context)

def Loaderio(request):
    return HttpResponse("loaderio-04d21c600a033086b4bf93a25a5cdeb8")

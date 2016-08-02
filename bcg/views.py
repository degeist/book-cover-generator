from django.conf import settings
from django.shortcuts import get_object_or_404, render

def HomeView(request):    
    context = {
    	'site_url': settings.SITE_URL,
    }
    return render(request, 'home.html', context)

import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from cloudinary.forms import cl_init_js_callbacks
from cloudinary import api # Only required for creating upload presets on the fly

from .models import Artboard
from .forms import ArtboardForm, ArtboardDirectForm, ArtboardUnsignedDirectForm

def upload(request):
    unsigned = request.GET.get("unsigned") == "true"
    
    if (unsigned):
        # For the sake of simplicity of the sample site, we generate the preset on the fly. It only needs to be created once, in advance.
        try:
            api.upload_preset(ArtboardUnsignedDirectForm.upload_preset_name)
        except api.NotFound:
            api.create_upload_preset(name=ArtboardUnsignedDirectForm.upload_preset_name, unsigned=True, folder="preset_folder")
            
    direct_form = ArtboardUnsignedDirectForm() if unsigned else ArtboardDirectForm()
    context = dict(
        # Form demonstrating backend upload
        backend_form = ArtboardForm(),
        # Form demonstrating direct upload
        direct_form = direct_form,
        # Should the upload form be unsigned
        unsigned = unsigned,
    )
    # When using direct upload - the following call in necessary to update the form's callback url
    cl_init_js_callbacks(context['direct_form'], request)

    if request.method == 'POST':
        # Only backend upload should be posting here
        form = ArtboardForm(request.POST, request.FILES)
        context['posted'] = form.instance
        if form.is_valid():
            # Uploads image and creates a model instance for it
            form.save()

    return render(request, 'upload.html', context)

@csrf_exempt
def direct_upload_complete(request):
    form = ArtboardDirectForm(request.POST)
    if form.is_valid():
        # Create a model instance for uploaded image using the provided data
        form.save()
        ret = dict(photo_id = form.instance.id)
    else:
        ret = dict(errors = form.errors)

    return HttpResponse(json.dumps(ret), content_type='application/json')

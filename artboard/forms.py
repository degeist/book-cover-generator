from django.forms import ModelForm

from cloudinary.forms import CloudinaryJsFileField, CloudinaryUnsignedJsFileField
# Next two lines are only used for generating the upload preset sample name
from cloudinary.compat import to_bytes
import cloudinary, hashlib

from .models import Artboard

class ArtboardForm(ModelForm):
    class Meta:
        model = Artboard
        fields = '__all__'

class ArtboardDirectForm(ArtboardForm):
    image = CloudinaryJsFileField()

class ArtboardUnsignedDirectForm(ArtboardForm):
    upload_preset_name = "sample_" + hashlib.sha1(to_bytes(cloudinary.config().api_key + cloudinary.config().api_secret)).hexdigest()[0:10]
    image = CloudinaryUnsignedJsFileField(upload_preset_name)

from django.db import models
from cloudinary.models import CloudinaryField

"""
This is the main model in the project. It holds a reference to a
cloudinary-stored image (background) and contains some additional
data used in the construction of the final artboard image.
"""

class Artboard(models.Model):
    text = models.CharField(max_length=240, blank=True)
    image = CloudinaryField('image')
    date_added = models.DateTimeField(auto_now_add=True)
    date_changed = models.DateTimeField(auto_now=True)

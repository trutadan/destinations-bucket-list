from django.db import models
from api.models.user import User
from django.core import validators
from django.core.exceptions import ValidationError
import requests
from requests.exceptions import MissingSchema
def validate_image_url(url):
    try:
        response = requests.get(url)
    except MissingSchema as e:
        raise ValidationError("Invalid URL")
    if response.status_code != 200:
        raise ValidationError("Image URL is invalid")
    content_type = response.headers.get('content-type')
    if not content_type.startswith('image'):
        raise ValidationError("URL does not point to an image")


class Destination(models.Model):
    title = models.CharField(max_length=100, validators=[validators.MinLengthValidator(3)])
    latitude = models.DecimalField(max_digits=9, decimal_places=6,
                                   validators=[validators.MinValueValidator(-90), validators.MaxValueValidator(90)])
    longitude = models.DecimalField(max_digits=9, decimal_places=6,
                                    validators=[validators.MinValueValidator(-180), validators.MaxValueValidator(180)])

    image_url = models.URLField(validators=[validate_image_url])
    arrive_date = models.DateField()
    depart_date = models.DateField()
    description = models.TextField()
    belonging_user = models.ForeignKey(User, db_index=True, on_delete=models.CASCADE, to_field='username')

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def clean(self):
        super().clean()
        if self.arrive_date > self.depart_date:
            raise ValidationError("Arrive date must be before depart date")

    def __str__(self):
        return self.name.__str__() + "from User:" + self.belonging_user.__str__()


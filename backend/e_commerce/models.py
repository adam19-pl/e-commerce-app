from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django_advance_thumbnail import AdvanceThumbnailField
from .managers import CustomUserManager
from django.conf import settings
from django.utils import timezone
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from PIL import Image
# Create your models here.


class CustomUser(AbstractUser):
    ROLES = (('Client', 'Client'), ('Seller', 'Seller'))
    email = models.EmailField(max_length=256, unique=True)
    firstname = models.CharField(max_length=256)
    username = None
    role = models.CharField(choices=ROLES, default=ROLES[0], max_length=128)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['firstname', 'role']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class ProductCategory(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(blank=False, null=False, max_length=256)


class Product(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    added_by = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE, null=True)
    name = models.CharField(blank=False, null=False, max_length=256)
    description = models.CharField(blank=True, null=True, max_length=1024)
    price = models.DecimalField(max_digits=7, decimal_places=2, blank=False, null=False)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, blank=False, null=False)
    quantity = models.IntegerField("Quantity", null=True, blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True, editable=True, default='kabel.jpg')
    image_thumbnail = AdvanceThumbnailField(source_field='image', upload_to='images/thumbnails/', null=True,
                                               blank=True,
                                               size=(200, 200))
    add_date = models.DateTimeField(default=timezone.now, null=False)

    def save(self, *args, **kwargs):
        super(Product, self).save(*args, **kwargs)


def payment_date_with_5_days_extra():
    return timezone.now() + timezone.timedelta(days=5)


class Order(models.Model):
    client = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    delivery_address = models.CharField(blank=True, null=True, max_length=1024)
    products_list = models.TextField(null=False)
    add_date = models.DateTimeField(default=timezone.now, null=False)
    payment_date = models.DateTimeField(default=payment_date_with_5_days_extra, null=False)
    summary_price = models.DecimalField(max_digits=7, decimal_places=2, blank=False, null=False)
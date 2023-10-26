from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager
from django.conf import settings
from django.utils import timezone
# Create your models here.


# class CustomUserManager(BaseUserManager):
#     ROLES = ('Client', 'Seller')
#
#     def create_superuser(self, email, nickname, firstname, password, **other_fields):
#         other_fields.setdefault('is_staff', True)
#         other_fields.setdefault('is_superuser', True)
#         other_fields.setdefault('is_active', True)
#
#         if not other_fields.get('is_staff'):
#             raise ValueError('Superuser is_staff must be assigned to True')
#         if other_fields.get('is_superuser') is not True:
#             raise ValueError('Superuser is_superuser must be assigned to True')
#
#         return self.create_user(email, nickname, firstname, password, **other_fields)
#
#     def create_user(self, email, nickname, firstname, password, role, **other_fields):
#         if not email:
#             raise ValueError('You must provide an email')
#         if not password:
#             raise ValueError('The password should not be empty')
#         if role not in self.ROLES:
#             raise ValueError('The user should have a role assigned : Seller or Client')
#
#         email = self.normalize_email(email)
#         user = self.model(email=email, nickname=nickname, firstname=firstname, role=role,
#                           **other_fields)
#         user.set_password(password)
#         user.save()
#         return user
#
#     def user_role(self):
#         return self.model.role


class CustomUser(AbstractUser):
    ROLES = (('Client', 'Client'), ('Seller', 'Seller'))
    email = models.EmailField(max_length=256, unique=True)
    firstname = models.CharField(max_length=256)
    role = models.CharField(choices=ROLES, default=ROLES[0], max_length=128)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['firstname', 'role']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


# class NewUser(AbstractUser):
#     ROLES = (('Client', 'Client'), ('Seller', 'Seller'))
#     # id = models.AutoField(primary_key=True)
#     user = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     email = models.EmailField(max_length=256, unique=True)
#     username = models.CharField(max_length=256)
#     firstname = models.CharField(max_length=256)
#     role = models.CharField(choices=ROLES, default=ROLES[0], max_length=128)
#     # is_staff = models.BooleanField(default=False)
#     # is_active = models.BooleanField(default=True)
#
#     # objects = CustomUserManager()
#
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username', 'firstname', 'role']
#
#     # def __str__(self):
#     #     return self.email
#     #
#     # def user_role(self):
#     #     return self.role


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
    image = models.ImageField(upload_to='images/', null=True, blank=True, editable=True,)
    # thumbnail =
    # category = models.IntegerField()
    add_date = models.DateTimeField(default=timezone.now, null=False)
    # status = models.CharField(choices=STATUS, default=STATUS[0], max_length=128)
    # borrowed_by = models.CharField(max_length=256, null=True, blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


        # super(Product, self).save()
        # image = Image.open(self.photo)
        # (width, height) = image.size
        # size = (100, 100)
        # image = image.resize(size, Image.ANTIALIAS)
        # image.save(self.photo.path)

class Order(models.Model):
    client = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    delivery_address = models.CharField(blank=True, null=True, max_length=1024)
    # products_list =
    payment_date = models.DateTimeField(default=timezone.now, null=False)
    summary_price = models.DecimalField(max_digits=7, decimal_places=2, blank=False, null=False)
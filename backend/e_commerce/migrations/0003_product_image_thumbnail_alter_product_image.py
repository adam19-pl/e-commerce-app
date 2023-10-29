# Generated by Django 4.2.6 on 2023-10-29 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('e_commerce', '0002_product_added_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image_thumbnail',
            field=models.ImageField(blank=True, default='image/kabel.jpg', null=True, upload_to='images/resized'),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='image/kabel.jpg', null=True, upload_to='images/'),
        ),
    ]

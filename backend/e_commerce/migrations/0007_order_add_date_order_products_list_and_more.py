# Generated by Django 4.2.6 on 2023-11-02 00:25

from django.db import migrations, models
import django.utils.timezone
import e_commerce.models


class Migration(migrations.Migration):

    dependencies = [
        ('e_commerce', '0006_remove_customuser_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='add_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='order',
            name='products_list',
            field=models.TextField(default=[]),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='order',
            name='payment_date',
            field=models.DateTimeField(default=e_commerce.models.payment_date_with_5_days_extra),
        ),
    ]

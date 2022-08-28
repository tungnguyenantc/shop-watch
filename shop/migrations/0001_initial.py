# Generated by Django 4.1 on 2022-08-27 03:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='name product')),
                ('product_code', models.CharField(max_length=10, verbose_name='product code')),
                ('price', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='price product')),
                ('image', models.ImageField(upload_to='img/', verbose_name='image')),
                ('available', models.BooleanField(default=True, verbose_name='available')),
            ],
        ),
    ]

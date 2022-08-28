from django.db import models
from django.utils.translation import gettext as _

# Create your models here.


class Product(models.Model):
    name = models.CharField(_("name product"), max_length=100)
    product_code = models.CharField(_("product code"), max_length=10)
    price = models.DecimalField(
        _("price product"), max_digits=10, decimal_places=2)
    image = models.ImageField(_("image"), upload_to='img/')
    available = models.BooleanField(_("available"), default=True)

    def __str__(self) -> str:
        return self.product_code

from django.urls import path
from .views import cart_add, cart_detail, cart


urlpatterns = [
    path("", cart_add, name="cart-add"),
    path("<int:productid>/", cart_detail, name="cart-detail"),
    path("total/", cart, name="cart"),
]

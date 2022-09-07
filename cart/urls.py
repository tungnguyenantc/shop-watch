from django.urls import path
from .views import cart_add, cart_detail, cart, cart_update, cart_clear


urlpatterns = [
    path("", cart_add, name="cart-add"),
    path("<int:productid>/", cart_detail, name="cart-detail"),
    path("total", cart, name="cart"),
    path("update", cart_update, name="cart-update"),
    path("delete", cart_clear, name="delete"),
]

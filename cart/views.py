from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .cart import Cart
import json
from shop.models import Product

# Create your views here.


def cart_add(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':
        cart = Cart(request)
        data = json.load(request)
        productid = data.get('productId')
        product = get_object_or_404(Product, id=productid)
        cart.add(product=product)
        return JsonResponse({'total': len(cart)})
    return redirect('home')


def cart_detail(request, productid):
    product = get_object_or_404(Product, id=productid)
    cart = Cart(request)
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        cart.add(product=product)
        return JsonResponse({'total': len(cart)})
    return render(request, 'cart/templates/cart_detail.html', {'product': product})


def cart(request):
    cart = Cart(request)
    return render(request, 'cart/templates/cart.html', {'carts': cart, 'total': len(cart)})

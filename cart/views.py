from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .cart import Cart
import json
from shop.models import Product
from decimal import Decimal


def cart_add(request):

    cart = Cart(request)
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':

        data = json.load(request)
        productid = data.get('productId')
        product = get_object_or_404(Product, id=productid)
        cart.add(product=product)
        return JsonResponse({'total': len(cart)})
    return redirect('home')


def cart_detail(request, productid):
    product = get_object_or_404(Product, id=productid)
    cart = Cart(request)
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':
        cart.add(product=product)
        return JsonResponse({'total': len(cart)})
    return render(request, 'cart/templates/cart_detail.html', {'product': product})


def cart(request):

    cart = Cart(request)

    return render(request, 'cart/templates/cart.html', {'carts': cart, 'total': len(cart)})


def cart_update(request):
    cart = Cart(request)

    # print('cart_hadle', cart_hadle)
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':
        data = json.load(request)
        type_ = data.get('type')
        product_id = data.get('productId')
        quantity = data.get('quantity')

        product = get_object_or_404(Product, id=product_id)

        if type_ == 'tang':
            cart.add(product=product)
            # xem cart

            # tính tổng tiền tất cả sản phẩm
            totalTongTien = sum(
                [int(i['total_price'].split('.')[0]) for i in cart])

            for i in cart:
                # totalTongTien += int(i['total_price'], base=10)
                # print(i, totalTongTien)
                if i['id'] == int(product_id):
                    # xác định tổng tiền từng sản phẩm
                    total_price_item = i['total_price']
                    return JsonResponse({'total': len(cart), 'type_': type_, 'total_price_item': total_price_item, 'totalTongTien': totalTongTien})
            return JsonResponse({'total': len(cart), 'type_': type_})
        elif type_ == 'giam':
            if int(quantity) == 1:
                # tính tổng tiền tất cả sản phẩm
                totalTongTien = sum(
                    [int(i['total_price'].split('.')[0]) for i in cart])
                return JsonResponse({'total': len(cart), 'type_': type_, 'min': 1, 'totalTongTien': totalTongTien})

            cart.add(product=product,
                     quantity=int(quantity) - 1, override_quantity=True)
            # tính tổng tiền tất cả sản phẩm
            totalTongTien = sum(
                [int(i['total_price'].split('.')[0]) for i in cart])
            for i in cart:
                if i['id'] == int(product_id):
                    # xác định tổng tiền từng sản phẩm
                    total_price_item = i['total_price']
                    return JsonResponse({'total': len(cart), 'type_': type_, 'total_price_item': total_price_item, 'totalTongTien': totalTongTien})
            return JsonResponse({'total': len(cart), 'type_': type_})

    return render(request, 'cart/templates/cart.html', {'carts': cart, 'total': len(cart)})


def cart_clear(request):
    cart = Cart(request)
    cart.clear()
    return redirect('shop:home')


def cart_remove(request):
    cart = Cart(request)
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':
        data = json.load(request)
        product_id = data.get('productId')
        cart.remove(product_id=product_id)
        totalTongTien = sum(
            [int(i['total_price'].split('.')[0]) for i in cart])
        return JsonResponse({'total': len(cart), 'totalTongTien': totalTongTien})
    return render(request, 'cart/templates/cart.html')

from django.shortcuts import render, redirect, get_object_or_404
from .models import OrderItem
from .forms import OrderCreateForm
from cart.cart import Cart
from shop.models import Product

# Create your views here.


def order_create(request):
    carts = Cart(request)

    if request.method == 'POST':
        form = OrderCreateForm(request.POST)
        if form.is_valid():
            order = form.save()
            for item in carts:
                product = get_object_or_404(Product, id=item['id'])
                OrderItem.objects.create(
                    order=order, product=product, price=item['price'], quantity=item['quantity'])
            carts.clear()
            return redirect('shop:home')
    else:
        form = OrderCreateForm()

    return render(request, 'order/templates/order.html', {'form': form, 'carts': carts})

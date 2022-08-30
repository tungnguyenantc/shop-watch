from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Product
from django.contrib.auth import authenticate, login, logout
import json
from django.contrib import messages

# Create your views here.


def index(request):
    products = Product.objects.all()
    return render(request, 'shop/templates/index.html', {'products': products})


def login_view(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':

        data = json.load(request)
        print('data', data)
        user = data.get('username')
        password = data.get('password')

        user = authenticate(username=user, password=password)

        if user:
            login(request, user)
            messages.success(request, 'Login success!')
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False})

    return redirect(request.GET['next'] if 'next' in request.GET else 'shop:home')


def logout_view(request):
    logout(request)
    return redirect(request.GET['next'] if 'next' in request.GET else 'shop:home')

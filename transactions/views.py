from django.shortcuts import render
from .models import Transaction

def transaction_list(request):
    transactions = Transaction.objects.all()
    categories = Transaction.objects.values_list('category', flat=True).distinct()
    return render(request, 'transactions/transaction_list.html', {'transactions': transactions, 'categories': categories})

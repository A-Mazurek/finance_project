import os
import django
from faker import Faker
import random

# Ustawienia Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'finance_project.settings')
django.setup()

from transactions.models import Transaction

def create_fake_transactions(n):
    fake = Faker()
    categories = ['Food', 'Utilities', 'Rent', 'Salary', 'Entertainment', 'Travel', 'Health', 'Education']

    for _ in range(n):
        date = fake.date_this_decade()
        description = fake.sentence(nb_words=6)
        amount = round(random.uniform(10.0, 5000.0), 2)
        category = random.choice(categories)

        Transaction.objects.create(
            date=date,
            description=description,
            amount=amount,
            category=category
        )

if __name__ == '__main__':
    create_fake_transactions(100)
    print("Added 100 fake transactions to the database.")

from django.contrib import admin
from .models import Event  # Убедись, что модель называется Event

admin.site.register(Event)
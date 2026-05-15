from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    date = models.DateTimeField(verbose_name="Дата и время")
    location = models.CharField(max_length=255, verbose_name="Место проведения")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
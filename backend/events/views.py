from django.contrib.auth.models import User
from rest_framework import generics, permissions
from .models import Event 
from .serializers import EventSerializer, UserSerializer # Импортируем оба


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Пока просто сохраняем
        serializer.save()
        
class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # Удалять могут только авторизованные пользователи
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from events.views import RegisterView 

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Главная точка входа для твоего приложения
    path('api/', include('events.urls')), 
    
    # Пути для JWT
    path('api/register/', RegisterView.as_view(), name='auth_register'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
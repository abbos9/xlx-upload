from django.urls import path
from . import views

urlpatterns = [
    path('process_form/', views.process_form_data, name='process_form_data'),
    path('success/', views.success, name='success'),
]

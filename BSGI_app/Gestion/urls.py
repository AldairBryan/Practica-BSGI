from django.urls import path, include
from Gestion.views.views_list import *
from rest_framework import routers


urlpatterns = [
    path("colaborador/", ColaboradorListAPIView.as_view(), name='colaborador-list'),
    path("contacto/", ContactoListAPIView.as_view(), name='contacto-list'),
    path("contrato/", ContratoListAPIView.as_view(), name='contrato-list'),
    path("horario/", HorarioListAPIView.as_view(), name='horario-list'),
]
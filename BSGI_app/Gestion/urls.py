from django.urls import path, include

from Gestion.views.views_create import HorarioCreateAPIView
from .views.views_list import *
from .views.views_create import *
from .views.views_retrieve import *
from .views.views_update import *
from .views.views_destroy import *

from rest_framework import routers


urlpatterns = [
    path("colaborador/", ColaboradorListAPIView.as_view(), name='colaborador-list'),
    path("contacto/", ContactoListAPIView.as_view(), name='contacto-list'),
    path("contrato/", ContratoListAPIView.as_view(), name='contrato-list'),
    path("horario/", HorarioListAPIView.as_view(), name='horario-list'),

    #Retrieve
    path("colaborador/<int:pk>/", ColaboradorRetrieveAPIView.as_view(), name='colaborador-detail'),
    path("contacto/<int:pk>/", ContactoRetrieveAPIView.as_view(), name='contacto-detail'),
    path("contrato/<int:pk>/", ContratoRetrieveAPIView.as_view(), name='contrato-detail'),
    path("horario/<int:pk>/", HorarioRetrieveAPIView.as_view(), name='horario-detail'),
    path("horario/create/", HorarioCreateAPIView.as_view(), name='horario-create'),

]
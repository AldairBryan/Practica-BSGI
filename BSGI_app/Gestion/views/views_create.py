from Gestion.views.mixins import LogCreateAPIView
from rest_framework.generics import (
    CreateAPIView
)
from ..serializers import *
from ..permissions import IsStaffGeneralEditor
from rest_framework import authentication
from .mixins import *

class ColaboradorCreateAPIView(LogCreateAPIView):
    queryset = Colaborador.objects.all()
    serializer_class = ColaboradorSerializer

class ContactoCreateAPIView(LogCreateAPIView):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

class ContratoCreateAPIView(LogCreateAPIView):
    queryset = Contrato.objects.all()
    serializer_class = ContratoSerializer

class HorarioCreateAPIView(LogCreateAPIView):
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer
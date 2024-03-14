from Gestion.views.mixins import LogRetrieveUpdateAPIView
from rest_framework.generics import (
    RetrieveUpdateAPIView
)
from ..serializers import *
from ..permissions import IsStaffGeneralEditor
from .mixins import *

class ColaboradorUpdateAPIView(LogRetrieveUpdateAPIView):
    queryset = Colaborador.objects.all()
    serializer_class = ColaboradorSerializer

class ContactoUpdateAPIView(LogRetrieveUpdateAPIView):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

class ContratoUpdateAPIView(LogRetrieveUpdateAPIView):
    queryset = Contrato.objects.all()
    serializer_class = ContratoSerializer

class HorarioUpdateAPIView(LogRetrieveUpdateAPIView):
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer
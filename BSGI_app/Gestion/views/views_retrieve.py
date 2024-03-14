from Gestion.views.mixins import LogRetrieveAPIView
from rest_framework.generics import (
    RetrieveAPIView
)
from ..serializers import *

from ..permissions import IsStaffGeneralEditor
from .mixins import *


class ColaboradorRetrieveAPIView(LogRetrieveAPIView):
    queryset = Colaborador.objects.all()
    serializer_class = ColaboradorSerializer

class ContactoRetrieveAPIView(LogRetrieveAPIView):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

class ContratoRetrieveAPIView(LogRetrieveAPIView):
    queryset = Contrato.objects.all()
    serializer_class = ContratoSerializer

class HorarioRetrieveAPIView(LogRetrieveAPIView):
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer
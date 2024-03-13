from rest_framework.generics import (
    ListAPIView
)

from ..serializers import *
from ..models import *

class ColaboradorListAPIView(ListAPIView):
    queryset = Colaborador.objects.all()
    serializer_class = ColaboradorSerializer

class ContactoListAPIView(ListAPIView):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

class ContratoListAPIView(ListAPIView):
    queryset = Contrato.objects.all()
    serializer_class = ContratoSerializer

class HorarioListAPIView(ListAPIView):
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer
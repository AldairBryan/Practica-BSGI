from Gestion.views.mixins import LogRetrieveDestroyAPIView
from rest_framework.generics import (
    RetrieveDestroyAPIView
)
from ..serializers import *

class ColaboradorDestroyAPIView(LogRetrieveDestroyAPIView):
    queryset = Colaborador.objects.all()
    serializer_class = ColaboradorSerializer

class ContactoDestroyAPIView(LogRetrieveDestroyAPIView):
    queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer

class ContratoDestroyAPIView(LogRetrieveDestroyAPIView):
    queryset = Contrato.objects.all()
    serializer_class = ContratoSerializer

class HorarioDestroyAPIView(LogRetrieveDestroyAPIView):
    queryset = Horario.objects.all()
    serializer_class = HorarioSerializer
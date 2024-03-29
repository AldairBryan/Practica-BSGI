from rest_framework import serializers
from .models import *

class ColaboradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colaborador
        fields= '__all__'

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields= '__all__'
        depth = 1

class ContratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrato
        fields= '__all__'
        depth = 1

class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horario
        fields= '__all__'
        depth = 1
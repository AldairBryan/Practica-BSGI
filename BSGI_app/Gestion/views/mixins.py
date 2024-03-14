import time
import logging
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveDestroyAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView
)

logger = logging.getLogger(__name__)

class LogAccessMixin:
    def log_access(self, method_name, start_time=None):
        if start_time is None:
            start_time = time.time()

        request_info = f"Método: {self.request.method}, URL: {self.request.path}, Parámetros: {self.request.query_params}"
        user_info = f"Usuario: {self.request.user}, Nivel de Permisos: {self.user_permissions()}"
        processing_time = time.time() - start_time
        performance_info = f"Tiempo de Procesamiento: {processing_time:.4f} segundos"
        log_message = f"Acceso a la vista {method_name} - {self.__class__.__name__}\n{request_info}\n{user_info}\n{performance_info}"
        logger.info(log_message)

    def user_permissions(self):
        return (
            self.request.user.user_permissions.all()
            if self.request.user.is_authenticated
            else 'No autenticado'
        )

    # Método para obtener el nombre del modelo
    def get_model_name(self):
        return self.queryset.model.__name__

    # Método para generar el mensaje de registro común
    def log_record(self, action, instance=None):
        start_time = time.time()
        self.log_access(action, start_time)

        if instance is not None:
            user_info = f"Usuario que {action}: {self.request.user}"
            processing_time = time.time() - start_time
            performance_info = f"Tiempo de Procesamiento: {processing_time:.4f} segundos"
            log_message = (
                f"Registro {action} en {self.get_model_name()}: {instance}\n"
                f"{user_info}\n{performance_info}"
            )
            logger.info(log_message)

class LogListAPIView(LogAccessMixin, ListAPIView):
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        self.log_record('list')
        return response

class LogCreateAPIView(LogAccessMixin, CreateAPIView):
    def perform_create(self, serializer):
        instance = serializer.save()
        self.log_record('creado', instance)

class LogRetrieveDestroyAPIView(LogAccessMixin, RetrieveDestroyAPIView):
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        response = super().destroy(request, *args, **kwargs)
        self.log_record('destruido', instance)
        return response

class LogRetrieveAPIView(LogAccessMixin, RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        self.log_record('recuperado')
        return response

class LogRetrieveUpdateAPIView(LogAccessMixin, RetrieveUpdateAPIView):
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        response = super().update(request, *args, **kwargs)
        self.log_record('actualizado', instance)
        return response

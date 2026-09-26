---
name: backend-dev-skill
description: Desarrollo robusto de API RESTful y Casos de Uso del Backend
---
# Instrucciones de Backend
- **Estructura de Respuesta:** Todas las respuestas de la API deben estar unificadas y estandarizadas (ej. estándar JSON:API). Las respuestas exitosas y de error deben tener un formato predecible.
- **Validación Estricta:** Validar siempre los Request (mediante FormRequests o DTOs) de forma centralizada *antes* de que los datos ingresen a la capa de Aplicación/Dominio.
- **Manejo de Excepciones:** Emplear un manejador global de excepciones (Global Exception Handler) para asegurar que un error interno no colapse la app y siempre retorne una respuesta JSON controlada.
- **Integridad de Capas:** La Capa de Dominio (Entidades de negocio) debe ser purista y permanecer 100% independiente del framework HTTP o librerías externas de transporte.

---
name: architect-skill
description: Arquitectura Limpia, DDD y escalabilidad para ClubGest
---
# Instrucciones de Arquitectura
- **Patrones:** Debes priorizar la Arquitectura Limpia (Hexagonal) y Domain-Driven Design (DDD).
- **Desacoplamiento:** Los controladores NUNCA deben contener lógica de negocio. Deben delegar en Casos de Uso (Application Layer) y Servicios.
- **Persistencia:** La lógica de acceso a datos debe abstraerse siempre mediante el patrón Repositorio, desacoplando el framework de la lógica del dominio.
- **Escalabilidad:** Diseñar el sistema pensando en la integración de colas (Queues) para procesos asíncronos y Caché (ej. Redis) para lecturas de datos maestros o listados intensivos.

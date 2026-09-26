---
name: qa-security-skill
description: Auditoría de seguridad y calidad del código
---
# Instrucciones de Seguridad y Testing
- **Sanitización de Datos:** Todo parámetro de entrada (Params, Body, Query) debe ser rigurosamente sanitizado para mitigar vulnerabilidades tipo XSS (Cross-Site Scripting) e Inyección SQL.
- **Seguridad de Acceso:** Uso de tokens robustos (JWT) y Middlewares para la validación de Permisos y Roles en CADA endpoint privado. Los endpoints sensibles deben implementar Rate Limiting.
- **Cobertura de Código (Testing):** Es obligatorio redactar Pruebas Unitarias para casos de uso complejos de la lógica de negocio (Backend) e implementar Tests E2E (End-to-End) en los flujos principales (Login, Registros clave).
- **Protección CORS / CSRF:** Parametrizar correctamente los encabezados CORS para aceptar dominios autorizados y habilitar protección CSRF en los formularios y sesiones de la aplicación web si no se usa JWT desacoplado.

---
name: db-admin-skill
description: Modelado, estandarización y optimización de Base de Datos
---
# Instrucciones de Base de Datos
- **Convenciones de Nombres:** Uso absoluto de `snake_case` para el nombramiento de tablas y columnas (ej. `user_profiles`). Tablas en plural, modelos en singular.
- **Integridad Referencial:** Claves foráneas (Foreign Keys) obligatorias con reglas de eliminación/actualización explícitas. Implementar Soft-Deletes para prevenir borrado accidental de data maestra.
- **Optimización de Consultas:** Todo campo utilizado frecuentemente para filtrar o buscar debe tener un Índice.
- **Anti-Patrones:** Prohibidas las consultas "N+1". El uso de "Eager Loading" es obligatorio al extraer colecciones asociadas.
- **Versionado:** Todo esquema de BD se define única y exclusivamente mediante archivos de Migración del framework. Nunca alterar la base de datos de manera manual o visual.

---
name: frontend-dev-skill
description: Mejores prácticas y desarrollo estructurado de Frontend Web App & Landing
---
# Instrucciones de Frontend
- **Arquitectura de Vistas:** Utilizar SSR (Server-Side Rendering) para la Landing Page por prioridades SEO y CSR (Client-Side Rendering) para el Dashboard / Web App.
- **Tipado y Calidad:** Obligatorio el uso de TypeScript. Evitar el tipado `any`.
- **Componentización:** Los componentes deben cumplir el principio de Responsabilidad Única (SOLID). Deben ser modulares, encapsulados y altamente reutilizables.
- **Estilos:** Queda estrictamente prohibido usar estilos en línea. Usar Utility Classes (ej. TailwindCSS) o CSS Modules estandarizados.
- **Estado Global:** Evitar propagar "props" profundamente (prop drilling); utilizar gestores de estado (ej. Zustand, Redux) para variables globales, y Context API para flujos acotados.

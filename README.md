# ClubGest

Aplicación de escritorio (Windows Forms, .NET Framework 4.7.2) para **consultar** los registros de un club Rotary guardados en SQL Server: proyectos, eventos, recursos, finanzas, voluntarios, socios y beneficiarios.

> Estado real: es un **visor de solo lectura**. Cada ventana carga una grilla ejecutando un procedimiento almacenado (`SPMOSTRAR...`). Los botones *Guardar*, *Editar* y *Eliminar* existen en el diseño de las ventanas pero **no tienen lógica asociada**: la aplicación no inserta, modifica ni borra datos.

## Funcionalidades verificadas

| Ventana | Procedimiento almacenado |
|---|---|
| Proyectos (`FrmProyecto`) | `SPMOSTRARPROYECTO` |
| Eventos (`FrmEventos`) | `SPMOSTRAREVENTO` |
| Recursos (`FrmRecursos`) | `SPMOSTRARRECURSOS` |
| Finanzas (`FrmFinanzas`) | `SPMOSTRARFINANZASS` |
| Voluntarios (`FrmVoluntarios`) | `SPMOSTRARVOLUNTARIOS` |
| Socios (`FrmSocios`) | `SPMOSTRARSOCIOS` |
| Beneficiarios (`FrmBeneficiarios`) | `SPMOSTRARBENEFICIARIOS` |

`FrmBienvenida` es el menú principal y abre cada ventana como diálogo. Si la base de datos no está disponible se muestra un mensaje comprensible en lugar de cerrar la aplicación.

No hay inicio de sesión, roles ni validación de formularios (no hay formularios de entrada de datos).

## Arquitectura

```
SQL_ROTARY/             Aplicación WinForms (proyecto .csproj clásico)
  Program.cs            Punto de entrada -> FrmBienvenida
  Frm*.cs               Una ventana por entidad (grilla + carga)
  CAcceso.cs            Acceso a datos por procedimientos almacenados (SqlClient)
  ConexionConfig.cs     Lectura/validación de la configuración de conexión
  MensajesError.cs      Traducción de errores de SQL Server a mensajes
  Cargador.cs           Carga una grilla y muestra el error si falla
SQL_ROTARY.Tests/       Pruebas xunit (net8.0) de la lógica sin interfaz
BD_ROTARY.bak           Copia de seguridad de la base de datos (ver advertencia)
```

Todo el acceso a datos usa procedimientos almacenados con parámetros tipados; no hay SQL construido por concatenación.

## Requisitos

- Windows con .NET Framework 4.7.2 y Visual Studio 2022 (o MSBuild).
- SQL Server / SQL Server Express con la base `BD_ROTARY` restaurada desde `BD_ROTARY.bak`.
- Paquete NuGet `FontAwesome.Sharp 6.6.0` (se restaura automáticamente).

## Instalación y ejecución

1. Restaurar `BD_ROTARY.bak` en su instancia de SQL Server (SSMS: *Restaurar base de datos*).
2. Configurar la conexión, en `SQL_ROTARY/App.config` (`appSettings`) o con variables de entorno (tienen prioridad):

   | Clave | Por defecto | Notas |
   |---|---|---|
   | `ROTARY_SQL_SERVER` | `.\SQLEXPRESS` | Instancia de SQL Server |
   | `ROTARY_SQL_DATABASE` | `BD_ROTARY` | |
   | `ROTARY_SQL_USER` | *(vacío)* | Vacío = autenticación integrada de Windows |
   | `ROTARY_SQL_PASSWORD` | *(vacío)* | Solo con usuario; no la escriba en un archivo versionado |

3. Abrir `SQL_ROTARY.sln` en Visual Studio y ejecutar, o desde consola:
   ```
   nuget restore SQL_ROTARY.sln
   msbuild SQL_ROTARY.sln /p:Configuration=Release
   ```

## Pruebas

```
dotnet test SQL_ROTARY.Tests/SQL_ROTARY.Tests.csproj
```

20 pruebas sobre la construcción de la cadena de conexión (incluida la protección frente a `;` en contraseñas), el mapeo de parámetros de entrada/salida de `CAcceso` y los mensajes de error. **No** hay pruebas de las ventanas ni de integración contra SQL Server; esas rutas solo se verificaron compilando.

La integración continua (`.github/workflows/ci.yml`) ejecuta esas pruebas y compila la aplicación.

## Limitaciones conocidas

- Solo lectura: no hay altas, bajas ni modificaciones.
- Las siete ventanas repiten la misma estructura; falta un componente base compartido.
- Sin autenticación de usuarios ni control de acceso propio; se apoya en los permisos de SQL Server.
- No se verificó la restauración de `BD_ROTARY.bak` ni el contenido del esquema en este entorno.
- Sin internacionalización ni ajuste de tamaño de ventana (diseño fijo).

## Seguridad

`BD_ROTARY.bak` está versionado desde el historial original y puede contener datos personales de socios o cuentas de la base. Se recomienda no publicar el repositorio con ese archivo, o sustituirlo por un script de esquema con datos ficticios. Este repositorio no reescribió el historial; retirar el archivo del historial (por ejemplo con `git filter-repo`) es una decisión del propietario.

Las versiones anteriores tenían fijo el nombre de un equipo (`DESKTOP-S0REQAM\SQLEXPRESS`) como servidor; ahora se configura como se indica arriba.

## Licencia

Este repositorio **no incluye archivo de licencia**; por tanto, sin permiso expreso del autor no se concede licencia de uso, copia ni distribución.

# WhatsApp Integration — Meta Cloud API

LeadFlow envía automáticamente un WhatsApp al lead cuando su web pasa a `web_live`.

## Variables de entorno

Agregar en `.env.local` del VPS:

```env
# Meta Cloud API (WhatsApp Business)
WHATSAPP_TOKEN=EAAxxxxxx...          # Token de 60 días (rotar manualmente)
WHATSAPP_PHONE_ID=993611510513270    # Phone number ID del número de prueba Meta
WHATSAPP_BUSINESS_ID=953761270873359 # Business ID (referencia, no usado en código)

# DRY-RUN (seguro por defecto)
WHATSAPP_DRY_RUN=true                # "true" o cualquier valor → manda al número de test
                                     # Solo "false" manda al número REAL del lead
WHATSAPP_DRY_RUN_NUMBER=+34617680026 # Tu móvil personal para pruebas

# Template
WHATSAPP_TEMPLATE_NAME=web_lista     # Template activa (antes: hello_world)
WHATSAPP_TEMPLATE_LANG=es            # Idioma del template (antes: en_US)
```

## Templates disponibles

### `hello_world` (legacy)
- Idioma: `en_US`
- Params: ninguno
- Uso: pruebas iniciales, verificar que la API funciona

### `web_lista` (producción)
- Idioma: `es`
- Categoría: MARKETING
- Params:
  - `{{1}}` → nombre del negocio (`lead.businessName`)
  - `{{2}}` → nombre del negocio (`lead.businessName`)
  - `{{3}}` → URL de la web generada (computada desde `lead.slug`)

Mensaje resultante:
> Hola **Fontanería López**, soy Edu de Nexify.
> Vi tu negocio **Fontanería López** en Google y te he preparado una web profesional de prueba sin ningún costo.
> Mírala aquí: **https://leadflow.es/fontaneria-lopez-madrid**
> Si te gusta, por 25 EUR al mes la dejamos activa con tu dominio.
> Cualquier duda, aquí estoy.

### Cambiar entre templates

Solo cambiar las env vars y reiniciar:

```env
# Para hello_world (legacy):
WHATSAPP_TEMPLATE_NAME=hello_world
WHATSAPP_TEMPLATE_LANG=en_US

# Para web_lista (producción):
WHATSAPP_TEMPLATE_NAME=web_lista
WHATSAPP_TEMPLATE_LANG=es
```

## Validación de datos (web_lista)

Antes de enviar, `notifyLeadViaWhatsApp` valida:

| Campo | Obligatorio para web_lista | Fallback |
|-------|---------------------------|----------|
| `phone` | Sí (cualquier template) | Skip |
| `businessName` | Sí | Skip |
| `slug` | Sí (se usa para construir URL) | Skip |

Si falta alguno, el lead se skipea con log: `"skipped: lead incompleto (sin X)"`.
El pipeline NO se interrumpe — simplemente ese lead no recibe WhatsApp.

## Cambiar de DRY-RUN a producción

1. Verificar que te llegan WhatsApps correctos al +34617680026
2. En `.env.local`, cambiar:
   ```
   WHATSAPP_DRY_RUN=false
   ```
3. Reiniciar el bot (`pm2 restart leadflow` o similar)
4. El primer lead que pase a `web_live` recibirá el WhatsApp en su número real

**IMPORTANTE**: Cualquier valor de `WHATSAPP_DRY_RUN` que NO sea exactamente `"false"` se comporta como dry-run. Esto incluye: `undefined`, `"true"`, `"TRUE"`, `"0"`, vacío, etc. Seguro por defecto.

## Testear con un lead real (dry-run)

```bash
# 1. Asegurarse de que DRY_RUN=true (default)
# 2. Buscar un lead con web generada:
#    En Mongo: db.leads.findOne({ status: "web_live", slug: { $exists: true } })

# 3. Ejecutar el script de test:
npx ts-node scripts/test-whatsapp-meta.ts --lead-id <MONGO_ID>

# El script muestra:
# - Config actual (token, phone ID, dry-run, template)
# - Datos del lead (nombre, sector, teléfono, slug)
# - Params que se van a enviar ({{1}}, {{2}}, {{3}})
# - Resultado del envío y actualización en Mongo
```

## Rotar el token de Meta

El token de Meta Cloud API expira cada 60 días.

1. Ir a [Meta for Developers](https://developers.facebook.com/) → Tu app → WhatsApp → API Setup
2. Generar nuevo token temporal (o configurar un system user token permanente)
3. En `.env.local` del VPS:
   ```
   WHATSAPP_TOKEN=nuevo_token_aqui
   ```
4. Reiniciar el bot
5. Verificar con el script de test:
   ```bash
   npx ts-node scripts/test-whatsapp-meta.ts --lead-id <cualquier_lead_id>
   ```

## Flujo en el pipeline

```
Lead scrapeado → Web generada → status: web_live ──→ WhatsApp enviado (fire-and-forget)
                                                  └→ Card en Telegram (con botón manual "Abrir WhatsApp")
```

- El WhatsApp se envía de forma NON-BLOCKING (fire-and-forget)
- Si WhatsApp falla, el pipeline sigue normalmente
- El botón manual en Telegram sigue funcionando como respaldo
- Si tiene éxito, se guarda `whatsappMessageId` y `whatsappSentAt` en el lead
- Si el lead está incompleto, se skipea silenciosamente (log + `{ skipped: true }`)

## Campos en MongoDB (Lead)

```
whatsappMessageId  — ID del mensaje devuelto por Meta (para tracking de entrega)
whatsappSentAt     — Timestamp del envío exitoso
```

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Token expirado | Rotar token (ver arriba) |
| Lead sin teléfono | Se skipea con log |
| Lead sin businessName o slug | Se skipea con log (solo web_lista) |
| Número inválido | Se skipea con log |
| API Meta caída | El pipeline sigue, solo falla el WhatsApp |
| Template no aprobada | Usar `hello_world` hasta que Meta apruebe |
| Params vacíos en template | Meta rechaza — siempre pasar valores reales |

## Pendiente (futuro)

- Template `follow_up`: recordatorio 48h después del primer envío (aún no creada en Meta)

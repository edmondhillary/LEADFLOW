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
WHATSAPP_TEMPLATE_NAME=hello_world   # Cambiar a "web_lista" cuando Meta la apruebe
WHATSAPP_TEMPLATE_LANG=en_US         # Cambiar a "es" para web_lista
```

## Cambiar de DRY-RUN a producción

1. Verificar que te llegan WhatsApps correctos al +34617680026
2. En `.env.local`, cambiar:
   ```
   WHATSAPP_DRY_RUN=false
   ```
3. Reiniciar el bot (`pm2 restart leadflow` o similar)
4. El primer lead que pase a `web_live` recibirá el WhatsApp en su número real

**IMPORTANTE**: Cualquier valor de `WHATSAPP_DRY_RUN` que NO sea exactamente `"false"` se comporta como dry-run. Esto incluye: `undefined`, `"true"`, `"TRUE"`, `"0"`, vacío, etc. Seguro por defecto.

## Cambiar la template

Cuando Meta apruebe `web_lista`:

```env
WHATSAPP_TEMPLATE_NAME=web_lista
WHATSAPP_TEMPLATE_LANG=es
```

La template `web_lista` usa 3 variables que se envían automáticamente:
- `{{1}}` → nombre del lead (businessName)
- `{{2}}` → nombre del negocio (businessName)
- `{{3}}` → URL de la web generada

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

## Script de test

```bash
# Enviar WhatsApp a un lead específico (respeta DRY-RUN)
npx ts-node scripts/test-whatsapp-meta.ts --lead-id 6540abc123def456

# También acepta el ID como primer argumento
npx ts-node scripts/test-whatsapp-meta.ts 6540abc123def456
```

El script muestra: config, datos del lead, resultado del envío, y verifica la actualización en Mongo.

## Flujo en el pipeline

```
Lead scrapeado → Web generada → status: web_live ──→ WhatsApp enviado (fire-and-forget)
                                                  └→ Card en Telegram (con botón manual "Abrir WhatsApp")
```

- El WhatsApp se envía de forma NON-BLOCKING (fire-and-forget)
- Si WhatsApp falla, el pipeline sigue normalmente
- El botón manual en Telegram sigue funcionando como respaldo
- Si tiene éxito, se guarda `whatsappMessageId` y `whatsappSentAt` en el lead

## Campos en MongoDB (Lead)

```
whatsappMessageId  — ID del mensaje devuelto por Meta (para tracking de entrega)
whatsappSentAt     — Timestamp del envío exitoso
```

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Token expirado | Rotar token (ver arriba) |
| Lead sin teléfono | Se omite con log warning |
| Número inválido | Se omite con log warning |
| API Meta caída | El pipeline sigue, solo falla el WhatsApp |
| Template no aprobada | Usar `hello_world` hasta que Meta apruebe |

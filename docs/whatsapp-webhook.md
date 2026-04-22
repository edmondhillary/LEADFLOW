# WhatsApp Webhook (Meta Cloud API)

Webhook que recibe mensajes entrantes y statuses de entrega desde Meta.
Vive en Vercel (`/api/whatsapp/webhook`); el bot del VPS se queda con las respuestas (`/reply`).

## Endpoint

- **URL**: `https://<tu-dominio-vercel>/api/whatsapp/webhook`
- **Métodos**:
  - `GET` — handshake de verificación (Meta lo llama una vez al guardar la config)
  - `POST` — eventos (mensajes y statuses). Firma validada con HMAC-SHA256.

## Env vars necesarias (Vercel)

| Variable | Ejemplo | Cómo obtenerla |
|---|---|---|
| `WHATSAPP_VERIFY_TOKEN` | string random | Lo inventás vos. Mismo valor en Vercel y en el campo "Verify Token" de Meta Dashboard. |
| `WHATSAPP_APP_SECRET` | hex de 32 chars | Meta Dashboard → Settings → Basic → App Secret → Show |
| `TELEGRAM_BOT_TOKEN` | `1234:AA…` | Tu bot padre de Telegram |
| `TELEGRAM_CHAT_ID` | `835…` | Tu chat ID |
| `MONGODB_URI` | `mongodb+srv://…` | Compartida con el resto del app |
| `NEXT_PUBLIC_BASE_URL` | `https://leadflow-gold-one.vercel.app` | Para armar links en las notificaciones |

## Configurar en Meta Dashboard

1. Entrá a [developers.facebook.com](https://developers.facebook.com) → tu App → **WhatsApp** → **Configuration**.
2. Sección **Webhook** → click **Edit**.
3. Completar:
   - **Callback URL**: `https://<tu-dominio-vercel>/api/whatsapp/webhook`
   - **Verify Token**: el mismo string que pusiste en `WHATSAPP_VERIFY_TOKEN`
4. Click **Verify and Save**. Meta hace un GET con `hub.challenge` al endpoint; si tu env está correcta, responde con el challenge y Meta lo acepta.
5. Una vez verificado, en **Webhook fields** suscribí:
   - ✅ `messages` (obligatorio — mensajes entrantes)
   - ✅ `message_status` (opcional — delivered/read/failed)

## Testeo local (sin esperar que un lead escriba)

Podés simular una request con curl (firma HMAC incluida):

```bash
# 1. Preparar el body
BODY='{"object":"whatsapp_business_account","entry":[{"id":"X","changes":[{"field":"messages","value":{"messaging_product":"whatsapp","metadata":{"phone_number_id":"X"},"contacts":[{"profile":{"name":"Test"},"wa_id":"34617680026"}],"messages":[{"from":"34617680026","id":"wamid.test123","timestamp":"1713800000","type":"text","text":{"body":"hola"}}]}}]}]}'

# 2. Calcular firma (requiere openssl)
APP_SECRET="eed621d5b355fa7ec435abc0e9d74183"
SIG=$(echo -n "$BODY" | openssl dgst -sha256 -hmac "$APP_SECRET" | sed 's/^.* //')

# 3. Enviar
curl -X POST https://<dominio>/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -H "x-hub-signature-256: sha256=$SIG" \
  -d "$BODY"
# Esperado: { "received": true }
```

## Responder a un lead desde Telegram

El bot del VPS tiene el comando `/reply`:

```
/reply 69e8f7944e48a4a006b5e317 Hola, gracias por escribir. Te cuento…
```

Reglas:
- **Ventana de 24h**: Meta solo permite texto libre si el lead escribió en las últimas 24h. Fuera de esa ventana el bot rechaza y te pide usar un template.
- **Respeta DRY_RUN**: si `WHATSAPP_DRY_RUN !== 'false'`, el mensaje se redirige a `WHATSAPP_DRY_RUN_NUMBER`.
- **Guarda el outbound** en la colección `whatsappmessages` (direction: `outbound`).

## Troubleshooting

| Síntoma | Causa probable | Fix |
|---|---|---|
| Meta dice "Callback verification failed" | `WHATSAPP_VERIFY_TOKEN` no coincide | Verificá que el valor en Vercel sea idéntico al del Dashboard (sin espacios) |
| POST devuelve 401 "Invalid signature" | `WHATSAPP_APP_SECRET` mal | Rotá el App Secret en Meta y actualizá Vercel |
| Mensajes llegan pero no aparecen en Telegram | `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` faltan en Vercel | Agregarlos y redeployar |
| Lead no se identifica | El teléfono en la base tiene formato distinto al que manda Meta | El lookup usa regex `^\+?<fromPhone>$`. Si tu base tiene espacios/guiones, normalizar. |
| El bot rechaza con "Ventana de 24h cerrada" | El lead no escribió o ya pasaron >24h | Mandar un template aprobado en vez de texto libre |

## Estructura del payload de Meta (referencia)

### Mensaje entrante (texto)

```json
{
  "object": "whatsapp_business_account",
  "entry": [{
    "id": "<WABA_ID>",
    "changes": [{
      "field": "messages",
      "value": {
        "messaging_product": "whatsapp",
        "metadata": { "phone_number_id": "<PHONE_ID>" },
        "contacts": [{ "profile": { "name": "Juan" }, "wa_id": "34639507593" }],
        "messages": [{
          "from": "34639507593",
          "id": "wamid.HBgL…",
          "timestamp": "1713800000",
          "type": "text",
          "text": { "body": "hola, me interesa" }
        }]
      }
    }]
  }]
}
```

### Status de entrega

```json
{
  "object": "whatsapp_business_account",
  "entry": [{ "id": "<WABA_ID>", "changes": [{
    "field": "messages",
    "value": {
      "statuses": [{
        "id": "wamid.…",
        "status": "delivered",
        "timestamp": "1713800000",
        "recipient_id": "34639507593"
      }]
    }
  }]}]
}
```

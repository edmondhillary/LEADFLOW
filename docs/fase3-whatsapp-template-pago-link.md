# Template `pago_link` — alta en Meta Business Manager

Este template se usa desde el bot cuando se dispara `📲 Enviar link por WhatsApp` (o el futuro `/send_stripe`) sobre un lead que está **fuera de la ventana de 24h**. Dentro de la ventana el bot usa texto libre.

Hasta que Meta apruebe este template, el botón solo funciona con leads que hayan escrito en las últimas 24h. Fuera de esa ventana el bot devolverá "Meta rechazó el template `pago_link`".

## Pasos para darlo de alta

1. Entrá a **Meta Business Manager** → tu portfolio → **WhatsApp Manager** (o directo en `https://business.facebook.com/wa/manage/message-templates/`)
2. Click **Crear plantilla** / "Create template"
3. Rellenar exactamente los campos de abajo
4. Enviar a revisión. Meta responde en 15min–24h

## Configuración exacta

| Campo | Valor |
|---|---|
| **Nombre** (internal name) | `pago_link` |
| **Categoría** | **Utility** (transaccional — no cuenta contra cuota de marketing) |
| **Idioma** | `Spanish` (código `es`) |
| **Header** | ninguno |
| **Body** | ver abajo |
| **Footer** | ninguno |
| **Botones** | ninguno (más rápido de aprobar) |

## Body (copiar y pegar literal)

```
Hola, soy Edu de Nexify. Tu pedido para {{1}} está listo:
{{2}}€/mes, todo incluido (web + gestión).
Link de pago seguro (Stripe): {{3}}

Podés cancelar cuando quieras desde el mismo link. ¿Cualquier duda me decís?
```

## Variables (samples que pide Meta al aprobar)

Meta te va a pedir ejemplos para cada `{{N}}`. Usá estos:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `{{1}}` | Nombre del negocio | `Pizzería López` |
| `{{2}}` | Precio mensual en EUR (sin símbolo) | `25` |
| `{{3}}` | URL de Stripe Payment Link | `https://buy.stripe.com/test_abc123xyz` |

## Preview del mensaje renderizado

Con los samples de arriba, el lead recibirá:

> Hola, soy Edu de Nexify. Tu pedido para **Pizzería López** está listo: **25€/mes**, todo incluido (web + gestión).
>
> Link de pago seguro (Stripe): **https://buy.stripe.com/test_abc123xyz**
>
> Podés cancelar cuando quieras desde el mismo link. ¿Cualquier duda me decís?

## Por qué categoría Utility (no Marketing)

- El template se envía **en respuesta a una negociación puntual** (un link de pago para un pedido concreto).
- Utility templates no consumen cuota de Marketing Messages (que tiene volumen limitado según tu tier).
- La aprobación suele ser más rápida porque Meta considera que no es promocional.

Si Meta te lo rechaza como "should be Marketing" (porque menciona precio), la fallback es:
- Re-subir con categoría **Marketing**
- O quitar `{{2}}€/mes` del body y dejar solo nombre + link

## Después de aprobado

No hay que cambiar nada en el código — el bot ya lo usa por nombre (`pago_link`) y language `es`. El botón `📲 Enviar link por WhatsApp` va a funcionar end-to-end apenas Meta lo marque como **Approved**.

Podés forzar testearlo con un lead cuya ventana 24h esté cerrada (o no haya escrito nunca) usando `/stripe` → seleccionar servicios → generar link → tocar el botón.

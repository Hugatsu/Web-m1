# Coin Clicker

Hugo Aparicio Guillén · 3º INSO C

Misión M1 · El Despertar del DOM — Web Development I.

Juego tipo clicker en HTML, CSS y JavaScript. Pulsas la moneda para ganar dinero y lo inviertes en mejoras que generan dinero automáticamente.

## Cómo probarlo

Abre `inicio.html` en el navegador.

- Haz clic en la moneda para ganar monedas.
- A medida que acumulas dinero se desbloquean nuevas secciones:
  - 100 → Clic Automático (+1 moneda/s cada uno).
  - 500 → Fábricas (+10 monedas/s cada una).
  - 1500 → Potenciadores: *Duplicar Clics* y *Duplicar Zona Trabajo* (x2 durante unos segundos, con cooldown).
  - 4000 → Bancos (+50 monedas/s cada uno).
  - 10000 → Modo Noche (compra única).
- Cada compra sube el precio de la siguiente (x1.1 autoclic, x1.2 fábrica, x1.3 banco).
- Tras comprar el Modo Noche, la tecla "N" activa y desactiva el modo nocturno.

## Uso de IA

Usé Claude Code (extensión de VS Code) sobre todo para depurar, no para generar el juego desde cero. La estructura del HTML, el CSS y la lógica principal (dinero, compras, desbloqueos y potenciadores) los escribí yo.

Partes en las que me ayudó la IA:

- Error de `NaN` en el dinero: Había puesto `addEventListener("click", buy())` con paréntesis. La IA me explicó que así `buy` se ejecutaba al cargar la página, sin coste: `Number(undefined)` da `NaN` y `money -= NaN` dejaba el dinero en `NaN` para siempre. Lo cambié por una función flecha, igual que en el resto de botones.
- El precio del Modo Noche se veía desde el principio: Solo ocultaba el botón, no el `div` que contiene también el precio. Pasé a ocultar el contenedor entero.
- El Modo Noche volvía a aparecer después de comprarlo: `addMoney()` se ejecuta con cada clic y cada segundo, y volvía a ponerlo visible al llegar a la cantidad. Añadí la variable `nightModeBought` para recordar que ya está comprado.
- La función `round()` para redondear los precios hacia arriba sin usar `Math.ceil`.

Cómo lo verifiqué: después de cada cambio probé en el navegador que el dinero se sumaba y restaba bien al comprar, que cada sección aparecía al llegar a su cantidad y que el Modo Noche no volvía a salir tras comprarlo, lo comprobé con números mucho más pequeños y no con los precios altos que hay en la versión final.

## Autopsia

1. Una sola función `buy(coste, button)` para todas las compras: Primero resta el dinero y luego mira qué botón se ha pulsado para actualizar el contador y el precio correspondientes. Descarté hacer una función de compra por edificio (`buyFactory`, `buyBank`…) porque repetiría las mismas líneas de comprobar y restar dinero en cada una. A cambio, `buy` tiene una cadena de `if/else` que crece con cada edificio nuevo. Con más edificios la cambiaría por un objeto con los datos de cada uno.

2. Ocultar las secciones con `visibility: hidden` en vez de `display: none`: Con `visibility` el hueco de cada sección ya está reservado desde el principio, así que cuando se desbloquea algo nuevo la página no salta ni se recoloca. Descarté `display: none` justo por eso: cada desbloqueo movería los botones de sitio mientras el jugador está haciendo clic. El inconveniente es que al principio se ven espacios vacíos en la columna de la derecha.
(() => {
  const CLAVE = "mundo-gamer-carrito:v1";

  const IVA = (img) => {
    const c = document.createElement("template");
    c.innerHTML = img;
    return c.content.firstElementChild;
  };

  const persistenciaDisponible = (() => {
    try {
      const prueba = "__mundo_gamer_test__";
      localStorage.setItem(prueba, "1");
      localStorage.removeItem(prueba);
      return true;
    } catch {
      return false;
    }
  })();

  let memoria = new Map();
  let avisoAlmacenamiento = false;

  function leer() {
    if (persistenciaDisponible) {
      try {
        const datos = JSON.parse(localStorage.getItem(CLAVE));
        return Array.isArray(datos) ? datos : [];
      } catch {
        return [];
      }
    }
    return Array.from(memoria.values());
  }

  function guardar(items) {
    if (persistenciaDisponible) {
      localStorage.setItem(CLAVE, JSON.stringify(items));
      return;
    }
    memoria = new Map(items.map((item) => [item.id, item]));
  }

  function formatear(numero) {
    return "$" + Number(numero || 0).toLocaleString("es-AR");
  }

  const SELECCIONABLES =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const contador = document.querySelector("[data-carrito-contador]");
  const monto = document.querySelector("[data-carrito-monto]");
  const panel = document.querySelector("[data-carrito-panel]");
  const overlay = document.querySelector("[data-carrito-overlay]");
  const lista = document.querySelector("[data-carrito-lista]");
  const total = document.querySelector("[data-carrito-total]");
  const vacio = document.querySelector("[data-carrito-vacio]");
  const pie = document.querySelector("[data-carrito-pie]");
  const toast = document.querySelector("[data-carrito-toast]");
  const toastAccion = document.querySelector("[data-carrito-toast-accion]");
  const toastMensaje = document.querySelector("[data-carrito-toast-mensaje]");
  const checkoutPanel = document.querySelector("[data-checkout-panel]");
  const checkoutOverlay = document.querySelector("[data-checkout-overlay]");
  const checkoutPago = document.querySelector('[data-checkout-paso="pago"]');
  const checkoutExito = document.querySelector('[data-checkout-paso="exito"]');
  const checkoutResumen = document.querySelector("[data-checkout-resumen]");
  const checkoutTotal = document.querySelector("[data-checkout-total]");
  const checkoutDescuento = document.querySelector("[data-checkout-descuento]");
  const checkoutPedido = document.querySelector("[data-checkout-pedido]");
  const checkoutExitoTotal = document.querySelector("[data-checkout-exito-total]");
  const checkoutExitoMetodo = document.querySelector("[data-checkout-exito-metodo]");
  let timerToast = null;
  let focoPrevio = null;

  const METODOS = {
    "tarjeta-credito": "tarjeta de crédito",
    mercadopago: "Mercado Pago",
    debito: "tarjeta de débito",
    transferencia: "transferencia / efectivo",
  };

  function calcular(items) {
    const cantidad = items.reduce((acc, item) => acc + item.cantidad, 0);
    const suma = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    return { cantidad, suma };
  }

  function metodoSeleccionado() {
    const elegido = checkoutPago?.querySelector('input[name="metodo-pago"]:checked');
    return elegido?.value ?? "tarjeta-credito";
  }

  function totalConDescuento(suma) {
    return metodoSeleccionado() === "transferencia" ? Math.round(suma * 0.9) : suma;
  }

  function render() {
    const items = leer();
    const { cantidad: totalCantidad, suma: totalSuma } = calcular(items);

    if (contador) contador.textContent = String(totalCantidad);
    if (monto) monto.textContent = formatear(totalSuma);

    if (!lista || !vacio || !pie || !total) return;

    if (items.length === 0) {
      lista.innerHTML = "";
      vacio.hidden = false;
      pie.hidden = true;
      return;
    }

    vacio.hidden = true;
    pie.hidden = false;
    total.textContent = formatear(totalSuma);

    lista.innerHTML = "";
    for (const item of items) {
      const li = document.createElement("li");
      li.className = "carrito-panel__item";

      const enlace = `/productos/${item.slug ?? "productos"}/${item.id}`;
      li.appendChild(
        IVA(
          `<img src="${item.imagen}" alt="" width="72" height="72" />` +
            `<div class="carrito-panel__info">` +
            `<a class="carrito-panel__nombre" href="${enlace}">${item.nombre}</a>` +
            `<strong class="carrito-panel__precio">${formatear(item.precio)}</strong>` +
            `</div>` +
            `<div class="carrito-panel__acciones">` +
            `<div class="carrito-panel__stepper">` +
            `<button type="button" data-carrito-restar data-id="${item.id}" aria-label="Quitar una unidad">&minus;</button>` +
            `<span aria-live="polite">${item.cantidad}</span>` +
            `<button type="button" data-carrito-sumar data-id="${item.id}" aria-label="Agregar una unidad">+</button>` +
            `</div>` +
            `<button type="button" class="carrito-panel__quitar" data-carrito-quitar data-id="${item.id}">Quitar</button>` +
            `</div>`
        )
      );
      lista.appendChild(li);
    }
  }

  function abrir() {
    focoPrevio = document.activeElement;
    if (panel) panel.classList.add("is-abierto");
    if (overlay) overlay.classList.add("is-abierto");
    if (panel) {
      panel.setAttribute("aria-hidden", "false");
      const cerrar = panel.querySelector("[data-carrito-cerrar]");
      (cerrar || panel).focus();
    }
    document.body.style.overflow = "hidden";
    render();
  }

  function cerrar() {
    if (panel) panel.classList.remove("is-abierto");
    if (overlay) overlay.classList.remove("is-abierto");
    if (panel) panel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (focoPrevio && focoPrevio.focus) focoPrevio.focus();
    focoPrevio = null;
  }

  function mostrarToast(mensaje, conAccion) {
    if (!toast) return;
    if (toastMensaje) toastMensaje.textContent = mensaje;
    if (toastAccion) toastAccion.hidden = !conAccion;
    toast.classList.add("is-visible");
    clearTimeout(timerToast);
    timerToast = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  function agregarItem(id, cantidad) {
    const ficha = document.querySelector(`[data-ficha-producto][data-id="${id}"]`);
    if (!ficha) return;

    const dato = {
      id,
      nombre: ficha.dataset.nombre || id,
      imagen: ficha.dataset.imagen || "",
      alt: ficha.dataset.alt || "",
      precio: Number(ficha.dataset.precio) || 0,
      slug: ficha.dataset.slug || "productos",
    };

    const items = leer();
    const actual = items.find((item) => item.id === id);
    if (actual) {
      actual.cantidad += cantidad;
    } else {
      items.push({ ...dato, cantidad });
    }
    guardar(items);
    render();

    const cantidadTexto = actual ? actual.cantidad : cantidad;
    const unidad = Number(ficha.dataset.precio) || 0;
    mostrarToast(`${dato.nombre}: ${cantidadTexto} x ${formatear(unidad)}`, true);

    if (!persistenciaDisponible && !avisoAlmacenamiento) {
      avisoAlmacenamiento = true;
      setTimeout(() => {
        mostrarToast("Carrito no guardado: el almacenamiento está desactivado.", false);
      }, 3500);
    }
  }

  function ajustarCantidadFicha(boton, delta) {
    const ficha = boton.closest("[data-ficha-producto]");
    if (!ficha) return;
    const stepper = ficha.querySelector("[data-cantidad-valor]");
    if (!stepper) return;
    const nuevo = Math.max(1, Number(stepper.textContent) + delta);
    stepper.textContent = String(nuevo);
  }

  function cambiarCantidad(id, delta) {
    const items = leer();
    const actual = items.find((item) => item.id === id);
    if (!actual) return;
    actual.cantidad = Math.max(1, actual.cantidad + delta);
    guardar(items);
    render();
  }

  function quitarItem(id) {
    const items = leer().filter((item) => item.id !== id);
    guardar(items);
    render();
  }

  function vaciarCarrito() {
    guardar([]);
    render();
    mostrarToast("Tu carrito quedó vacío.", false);
  }

  function mostrarPaso(paso) {
    [checkoutPago, checkoutExito].forEach((seccion) => {
      if (seccion) seccion.hidden = seccion.dataset.checkoutPaso !== paso;
    });
  }

  function abrirCheckout() {
    const items = leer();
    if (items.length === 0) return;
    focoPrevio = document.activeElement;
    const cantidadProductos = items.reduce((acc, item) => acc + item.cantidad, 0);
    if (checkoutResumen) {
      checkoutResumen.textContent = `${cantidadProductos} producto${
        cantidadProductos === 1 ? "" : "s"
      } en tu pedido`;
    }
    alPagar();
    if (checkoutOverlay) checkoutOverlay.classList.add("is-abierto");
    if (checkoutPanel) {
      checkoutPanel.classList.add("is-abierto");
      checkoutPanel.setAttribute("aria-hidden", "false");
      const cerrar = checkoutPanel.querySelector("[data-checkout-cerrar]");
      (cerrar || checkoutPanel).focus();
    }
  }

  function cerrarCheckout() {
    if (checkoutOverlay) checkoutOverlay.classList.remove("is-abierto");
    if (checkoutPanel) {
      checkoutPanel.classList.remove("is-abierto");
      checkoutPanel.setAttribute("aria-hidden", "true");
    }
    if (focoPrevio && focoPrevio.focus) focoPrevio.focus();
    focoPrevio = null;
  }

  function alPagar() {
    if (!checkoutPago) return;
    const { suma } = calcular(leer());
    const totalFinal = totalConDescuento(suma);
    if (checkoutTotal) checkoutTotal.textContent = formatear(totalFinal);
    if (checkoutDescuento) checkoutDescuento.hidden = !(metodoSeleccionado() === "transferencia");
    mostrarPaso("pago");
  }

  function confirmarCompra() {
    const items = leer();
    if (items.length === 0) {
      cerrarCheckout();
      return;
    }
    const metodo = metodoSeleccionado();
    const { suma } = calcular(items);
    const totalFinal = totalConDescuento(suma);
    const nombreMetodo = METODOS[metodo] ?? metodo;
    const pedido = "MG-" + String(Date.now()).slice(-6);

    if (checkoutPedido) checkoutPedido.textContent = pedido;
    if (checkoutExitoTotal) checkoutExitoTotal.textContent = formatear(totalFinal);
    if (checkoutExitoMetodo) checkoutExitoMetodo.textContent = nombreMetodo;

    guardar([]);
    render();
    mostrarPaso("exito");
  }

  function atrapadorDeFoco(contenedor, evento) {
    if (evento.key !== "Tab") return;
    const elementos = Array.from(contenedor.querySelectorAll(SELECCIONABLES)).filter(
      (el) => el.offsetParent !== null || el === document.activeElement
    );
    if (elementos.length === 0) return;
    const primero = elementos[0];
    const ultimo = elementos[elementos.length - 1];
    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  }

  document.addEventListener("click", (evento) => {
    const objetivo = evento.target.closest("*");

    const agregar = objetivo?.closest("[data-agregar]");
    if (agregar) {
      const ficha = agregar.closest("[data-ficha-producto]");
      const stepper = ficha?.querySelector("[data-cantidad-valor]");
      const cantidad = stepper ? Number(stepper.textContent) : 1;
      agregarItem(ficha?.dataset.id, cantidad);
      return;
    }

    const comprar = objetivo?.closest("[data-comprar]");
    if (comprar) {
      const ficha = comprar.closest("[data-ficha-producto]");
      const stepper = ficha?.querySelector("[data-cantidad-valor]");
      const cantidad = stepper ? Number(stepper.textContent) : 1;
      agregarItem(ficha?.dataset.id, cantidad);
      setTimeout(abrir, 350);
      return;
    }

    if (objetivo?.closest("[data-cantidad-sumar]")) {
      ajustarCantidadFicha(objetivo.closest("[data-cantidad-sumar]"), +1);
      return;
    }
    if (objetivo?.closest("[data-cantidad-restar]")) {
      ajustarCantidadFicha(objetivo.closest("[data-cantidad-restar]"), -1);
      return;
    }

    if (objetivo?.closest("[data-carrito-sumar]")) {
      cambiarCantidad(objetivo.closest("[data-carrito-sumar]").dataset.id, +1);
      return;
    }
    if (objetivo?.closest("[data-carrito-restar]")) {
      cambiarCantidad(objetivo.closest("[data-carrito-restar]").dataset.id, -1);
      return;
    }
    if (objetivo?.closest("[data-carrito-quitar]")) {
      quitarItem(objetivo.closest("[data-carrito-quitar]").dataset.id);
      return;
    }

    if (objetivo?.closest("[data-carrito-abrir]")) {
      abrir();
      return;
    }
    if (objetivo?.closest("[data-carrito-cerrar]")) {
      cerrar();
      return;
    }
    if (overlay && evento.target === overlay) {
      cerrar();
      return;
    }

    if (objetivo?.closest("[data-carrito-facturar]")) {
      abrirCheckout();
      return;
    }

    if (objetivo?.closest("[data-carrito-vaciar]")) {
      vaciarCarrito();
      return;
    }

    if (objetivo?.closest("[data-carrito-toast-accion]")) {
      abrir();
      if (toast) toast.classList.remove("is-visible");
      return;
    }

    if (objetivo?.closest("[data-checkout-cerrar]")) {
      cerrarCheckout();
      return;
    }
    if (checkoutOverlay && evento.target === checkoutOverlay) {
      cerrarCheckout();
      return;
    }
    if (objetivo?.closest("[data-checkout-confirmar]")) {
      confirmarCompra();
      return;
    }
    if (objetivo?.closest("[data-checkout-fin]")) {
      cerrarCheckout();
    }
  });

  checkoutPago?.addEventListener("change", (evento) => {
    if (evento.target && evento.target.name === "metodo-pago") {
      alPagar();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      if (checkoutPanel?.classList.contains("is-abierto")) {
        cerrarCheckout();
      } else if (panel?.classList.contains("is-abierto")) {
        cerrar();
      }
      return;
    }
    if (panel?.classList.contains("is-abierto")) {
      atrapadorDeFoco(panel, evento);
    } else if (checkoutPanel?.classList.contains("is-abierto")) {
      atrapadorDeFoco(checkoutPanel, evento);
    }
  });

  document.addEventListener("DOMContentLoaded", render);
})();
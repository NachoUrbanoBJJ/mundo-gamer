function validarCampo(campo) {
  const valor = campo.value.trim();
  const mensaje = campo.parentElement.querySelector(".formulario__mensaje-error");
  const tipo = campo.type;

  if (!valor) {
    campo.classList.add("formulario__entrada--error");
    if (mensaje) mensaje.textContent = "Este campo es obligatorio.";
    return false;
  }

  if (tipo === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    campo.classList.add("formulario__entrada--error");
    if (mensaje) mensaje.textContent = "Ingresá un correo electrónico válido.";
    return false;
  }

  if (tipo === "password" && valor.length < 6) {
    campo.classList.add("formulario__entrada--error");
    if (mensaje) mensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";
    return false;
  }

  campo.classList.remove("formulario__entrada--error");
  if (mensaje) mensaje.textContent = "";
  return true;
}

document.querySelectorAll("form[data-validacion]").forEach((formulario) => {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const campos = formulario.querySelectorAll("[required]");
    let formularioValido = true;

    campos.forEach((campo) => {
      if (!validarCampo(campo)) formularioValido = false;
    });

    if (formularioValido) {
      const estado = formulario.querySelector("[data-mensaje-ok]");
      if (estado) {
        estado.classList.remove("formulario__mensaje-error");
        estado.textContent = "¡Gracias! Tu consulta fue enviada (demo).";
        formulario.reset();
      }
    }
  });
});
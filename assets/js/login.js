document.querySelectorAll(".login-form").forEach((form) => {
  const emailInput = form.querySelector('[name="email"]');
  const passwordInput = form.querySelector('[name="password"]');
  const passwordToggle = form.querySelector(".password-toggle");
  const submitButton = form.querySelector(".submit-button");
  const submitLabel = submitButton.querySelector(".submit-button__label");
  const idleSubmitLabel = submitLabel.textContent;
  const feedback = form.querySelector(".form-feedback");
  let isSubmitting = false;
  const fields = {
    email: { input: emailInput, error: form.querySelector("#email-error"), empty: "Ingresa tu correo corporativo.", invalid: "Escribe un correo válido." },
    password: { input: passwordInput, error: form.querySelector("#password-error"), empty: "Ingresa tu contraseña." },
  };

  function setFieldState(fieldName, message = "") {
    const field = fields[fieldName];
    const isInvalid = Boolean(message);
    field.input.closest(".field").classList.toggle("is-invalid", isInvalid);
    field.input.setAttribute("aria-invalid", String(isInvalid));
    field.error.textContent = message;
  }

  function validateField(fieldName) {
    const field = fields[fieldName];
    const value = field.input.value.trim();
    if (!value) { setFieldState(fieldName, field.empty); return false; }
    if (fieldName === "email" && !field.input.validity.valid) { setFieldState(fieldName, field.invalid); return false; }
    setFieldState(fieldName);
    return true;
  }

  Object.keys(fields).forEach((fieldName) => {
    fields[fieldName].input.addEventListener("blur", () => validateField(fieldName));
    fields[fieldName].input.addEventListener("input", () => {
      if (fields[fieldName].input.getAttribute("aria-invalid") === "true") validateField(fieldName);
      feedback.classList.remove("is-visible");
    });
  });

  passwordToggle.addEventListener("click", () => {
    const willShow = passwordInput.type === "password";
    passwordInput.type = willShow ? "text" : "password";
    passwordToggle.setAttribute("aria-pressed", String(willShow));
    passwordToggle.setAttribute("aria-label", willShow ? "Ocultar contraseña" : "Mostrar contraseña");
    passwordToggle.querySelector("span").textContent = willShow ? "Ocultar" : "Mostrar";
  });

  function setSubmitting(nextState) {
    isSubmitting = nextState;
    form.setAttribute("aria-busy", String(nextState));
    submitButton.disabled = nextState;
    submitButton.classList.toggle("is-loading", nextState);
    submitLabel.textContent = nextState ? "Ingresando…" : idleSubmitLabel;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    const emailIsValid = validateField("email");
    const passwordIsValid = validateField("password");
    if (!emailIsValid || !passwordIsValid) { form.querySelector('[aria-invalid="true"]')?.focus(); return; }
    feedback.classList.remove("is-visible");
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      feedback.textContent = "La autenticación no está disponible en esta versión.";
      feedback.classList.add("is-visible");
    }, 900);
  });
});

const depthSurface = document.querySelector(".archive-shell--selected");
const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (depthSurface && precisePointer.matches && !reducedMotion.matches) {
  let frameId = 0;

  function setDepth(clientX, clientY) {
    const bounds = depthSurface.getBoundingClientRect();
    const x = ((clientX - bounds.left) / bounds.width - 0.5) * -12;
    const y = ((clientY - bounds.top) / bounds.height - 0.5) * -8;
    depthSurface.style.setProperty("--depth-x", `${x.toFixed(2)}px`);
    depthSurface.style.setProperty("--depth-y", `${y.toFixed(2)}px`);
  }

  depthSurface.addEventListener("pointermove", (event) => {
    window.cancelAnimationFrame(frameId);
    frameId = window.requestAnimationFrame(() => setDepth(event.clientX, event.clientY));
  }, { passive: true });

  depthSurface.addEventListener("pointerleave", () => {
    depthSurface.style.setProperty("--depth-x", "0px");
    depthSurface.style.setProperty("--depth-y", "0px");
  });
}

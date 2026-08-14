const form = document.querySelector("[data-early-access-form]");

if (form) {
  const consent = form.querySelector("[data-consent]");
  const consentError = form.querySelector("[data-consent-error]");
  const submitButton = form.querySelector("[data-submit]");

  const clearConsentError = () => {
    consentError.textContent = "";
    consent?.removeAttribute("aria-invalid");
  };

  consent?.addEventListener("change", clearConsentError);

  form.addEventListener("submit", (event) => {
    clearConsentError();

    if (!form.checkValidity()) {
      event.preventDefault();
      if (consent && !consent.checked) {
        consent.setAttribute("aria-invalid", "true");
        consentError.textContent = "Please agree before joining the list.";
      }
      form.reportValidity();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending request…";
  });
}

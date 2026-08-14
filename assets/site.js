const form = document.querySelector("[data-early-access-form]");

if (form) {
  const consent = form.querySelector("[data-consent]");
  const consentError = form.querySelector("[data-consent-error]");
  const repositoryUrl = form.querySelector("[data-repository-url]");
  const repositoryAuthorisation = form.querySelector("[data-repository-authorisation]");
  const repositoryAuthorisationInput = form.querySelector("[data-repository-authorisation-input]");
  const repositoryError = form.querySelector("[data-repository-error]");
  const submitButton = form.querySelector("[data-submit]");

  const clearConsentError = () => {
    consentError.textContent = "";
    consent?.removeAttribute("aria-invalid");
  };

  consent?.addEventListener("change", clearConsentError);

  const updateRepositoryAuthorisation = () => {
    const hasRepository = Boolean(repositoryUrl?.value.trim());

    if (repositoryAuthorisation) {
      repositoryAuthorisation.hidden = !hasRepository;
    }

    if (repositoryAuthorisationInput) {
      repositoryAuthorisationInput.required = hasRepository;
      if (!hasRepository) {
        repositoryAuthorisationInput.checked = false;
        repositoryAuthorisationInput.removeAttribute("aria-invalid");
      }
    }

    if (!hasRepository && repositoryError) {
      repositoryError.textContent = "";
    }
  };

  repositoryUrl?.addEventListener("input", updateRepositoryAuthorisation);
  repositoryAuthorisationInput?.addEventListener("change", () => {
    repositoryAuthorisationInput.removeAttribute("aria-invalid");
    if (repositoryError) {
      repositoryError.textContent = "";
    }
  });
  updateRepositoryAuthorisation();

  form.addEventListener("submit", (event) => {
    clearConsentError();
    updateRepositoryAuthorisation();

    if (!form.checkValidity()) {
      event.preventDefault();
      if (consent && !consent.checked) {
        consent.setAttribute("aria-invalid", "true");
        consentError.textContent = "Please agree before joining the list.";
      }
      if (repositoryAuthorisationInput?.required && !repositoryAuthorisationInput.checked) {
        repositoryAuthorisationInput.setAttribute("aria-invalid", "true");
        repositoryError.textContent = "Please confirm that you are authorised to submit this repository.";
      }
      form.reportValidity();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending request…";
  });
}

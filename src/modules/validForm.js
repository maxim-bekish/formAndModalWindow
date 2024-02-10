import IMask from "imask";

IMask(document.getElementById("telephone"), {
  mask: "+{375}(00)000-00-00",
});
export const validForm = (form) => {
  function createError(input, text) {
    const boxInput = input.parentNode;
    const errorLabel = document.createElement("label");
    errorLabel.innerText = text;
    errorLabel.classList.add("errorLabel");
    boxInput.classList.add("errorBox");
    input.classList.add("error");
    boxInput.append(errorLabel);
  }

  function removeError(input) {
    const boxInput = input.parentNode;
    if (boxInput.classList.contains("errorBox")) {
      boxInput.querySelector(".errorLabel").remove();
      boxInput.classList.remove("errorBox");
      input.classList.remove("error");
    }
  }
  let result = false;
  form.querySelectorAll(".inputForm").forEach((el) => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    removeError(el);
    if (!Boolean(el.value.trim())) {
      createError(el, "Поле должно быть заполнено");
      result = false;
    } else {
      if (el.name === "email") {
        if (!EMAIL_REGEXP.test(el.value)) {
          createError(el, "Некорректный email");
          result = false;
        } else {
          result = true;
        }
      }
      if (el.name === "telephone") {
        const numbersArray = el.value
          .split("")
          .filter((item) => /^\d+$/.test(item));
        if (numbersArray.length > 9) {
          result = true;
        } else {
          result = false;
          createError(el, "Некорректный телефон");
        }
      }
    }
  });
  return result;
};

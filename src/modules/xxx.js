import IMask from "imask";

const wrapModal = document.getElementById("wrapModal");
const inputPhone = document.getElementById("telephone");
const feedbackForm = document.getElementById("feedbackForm");
const body = document.querySelector("body");
const p = document.createElement("p");

IMask(inputPhone, {
  mask: "+{375}(00)000-00-00",
});

document.getElementById("btn").addEventListener("click", function (e) {
  e.preventDefault();
  wrapModal.classList.add("open");
  body.classList.add("hidden");
});
document.getElementById("closed").addEventListener("click", function () {
  wrapModal.classList.remove("open");
  body.classList.remove("hidden");
});
feedbackForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(feedbackForm);

  if (valid(this) === true) {
    submitForm(
      formData,
      "http://localhost:9090/api/registration",
      function (err, response) {
        console.log(err);
        if (err || err===0) {
          err === 400
            ? console.error(`Ошибка при отправке запроса. Код ошибки ${err}`)
            : console.error(`Сервер не запущен! Код ошибки ${err}`);
        } else {
          feedbackForm.reset();
          p.innerText = response.message;
          feedbackForm.append(p);
        }
      }
    );
  }
});

function valid(form) {
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
}

function submitForm(formData, url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        callback(null, response);
      } else {
        callback(xhr.status);
      }
    }
  };

  xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
}

import { submitForm } from "./submitForm";
import { validForm } from "./validForm";

const wrapModal = document.getElementById("wrapModal");
const body = document.querySelector("body");
const feedbackForm = document.getElementById("feedbackForm");
const responseMessage = document.createElement("p");

document.getElementById("btn").addEventListener("click", function (e) {
  e.preventDefault();
  wrapModal.classList.add("open");
  body.classList.add("hidden");
});
document.getElementById("closed").addEventListener("click", function (e) {
  e.preventDefault();
  wrapModal.classList.remove("open");
  body.classList.remove("hidden");
});
feedbackForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(feedbackForm);

  if (validForm(this) === true) {
    submitForm(
      formData,
      "http://localhost:9090/api/registration",
      function (err, response) {
        if (err || err === 0) {
          err === 400
            ? console.error(`Ошибка при отправке запроса. Код ошибки ${err}`)
            : console.error(`Сервер не запущен! Код ошибки ${err}`);
        } else {
          feedbackForm.reset();
          responseMessage.innerText = response.message;
          feedbackForm.append(responseMessage);
        }
      }
    );
  }
});

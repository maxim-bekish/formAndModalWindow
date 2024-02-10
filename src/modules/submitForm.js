export const submitForm = (formData, url, callback) => {
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
};

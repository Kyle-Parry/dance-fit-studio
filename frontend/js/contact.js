function postContactUs() {
  let contactUserForm = document.getElementById("contact-us-form");

  let formDataJSON = JSON.stringify(
    Object.fromEntries(new FormData(contactUserForm))
  );

  fetch("/contact/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJSON,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      window.location.href = "contact-us";
    })
    .catch((error) => {
      console.log("contact us failed - " + error);
    });
}

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

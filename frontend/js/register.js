function postRegisterUser() {
  let createUserForm = document.getElementById("register-user-form");

  let formDataJSON = JSON.stringify(
    Object.fromEntries(new FormData(createUserForm))
  );

  fetch("/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJSON,
  })
    .then((res) => res.json())
    .then((res) => {
      window.location.href = "login";
    })
    .catch((error) => {
      console.log("user creation failed - " + error);
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
        if (
          document.getElementById("password").value !=
          document.getElementById("confirm-password").value
        ) {
          event.preventDefault();
          event.stopPropagation();
        } else if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function postLoginUser() {
  let loginUserForm = document.getElementById("login-user-form");

  let formDataJSON = JSON.stringify(
    Object.fromEntries(new FormData(loginUserForm))
  );

  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJSON,
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "/";
    })
    .catch((error) => {
      window.location.href = window.location.href;
      console.log("user login failed - " + error);
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

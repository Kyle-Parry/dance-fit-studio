let urlParameters = new URLSearchParams(window.location.search);

let userId = urlParameters.get("userId");

fetch(`/users/${userId}`)
  .then((response) => response.json())
  .then((user) => {
    console.log(user);
    document.getElementById("email").value = user[0].email;
    document.getElementById("firstName").value = user[0].firstName;
    document.getElementById("lastName").value = user[0].lastName;
  });

function postUpdateUser() {
  let updateUserForm = document.getElementById("update-user-form");

  let formDataJSON = JSON.stringify(
    Object.fromEntries(new FormData(updateUserForm))
  );

  fetch("/users/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJSON,
  })
    .then((res) => res.json())
    .then((res) => {
      window.location.href = window.location.href;
    })
    .catch((error) => {
      console.log("user update failed - " + error);
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

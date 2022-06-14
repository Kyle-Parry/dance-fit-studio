let urlParameters = new URLSearchParams(window.location.search);

// access user ID from the query string (ie. ?id=1)
let classID = urlParameters.get("id");

if (classID) {
  fetch(`/classes/${classID}`)
    .then((res) => res.json())
    .then((clas) => {
      console.log(clas[0].classID);
      document.getElementById("classID").value = clas[0].classID;
    });
}

function postBookClass() {
  // Get access to the create user form element
  let bookingForm = document.getElementById("booking-form");
  // Convert the user form fields into JSON
  let formDataJSON = JSON.stringify(
    Object.fromEntries(new FormData(bookingForm))
  );
  // Post form data to the API
  fetch("/bookings/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJSON,
  })
    .then((res) => res.json())
    .then((res) => {
      window.location.href = "class-list";
    })
    .catch((error) => {
      //handle the error from the server
      console.log("Create booking request failed");
    });
}

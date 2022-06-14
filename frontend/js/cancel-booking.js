let urlParameters = new URLSearchParams(window.location.search);

// access user ID from the query string (ie. ?id=1)
let bookingNumber = urlParameters.get("id");

if (bookingNumber) {
  fetch(`/bookings/${bookingNumber}`)
    .then((res) => res.json())
    .then((booking) => {
      console.log(booking[0].bookingNumber);
      document.getElementById("bookingNumber").value = booking[0].bookingNumber;
    });
}

function postCancelBooking() {
  // Get access to the create user form element
  let cancelBookingForm = document.getElementById("cancel-booking-form");
  // Convert the user form fields into JSON
  let formDataJSON = JSON.stringify(
    Object.fromEntries(new FormData(cancelBookingForm))
  );
  // Post form data to the API
  fetch("/bookings/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJSON,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      window.location.href = "your-classes";
    })
    .catch((error) => {
      //handle the error from the server
      console.log("Update booking request failed");
    });
}

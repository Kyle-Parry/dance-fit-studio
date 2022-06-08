let urlParameters = new URLSearchParams(window.location.search);

let userId = urlParameters.get("id");

fetch(`/bookings/${userId}`)
  .then((response) => response.json())
  .then((bookings) => {
    console.log(bookings);
    let bookingList = document.getElementById("bookings");

    for (let booking of bookings) {
      bookingList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
              <span>${booking.classType} ${booking.date} ${booking.time}
              </span>
              <a class="btn btn-primary bg-danger btn-sm" href="cancel?id=${booking.bookingNumber}">
                Cancel
              </a>
            </li>
        `;
    }
  });

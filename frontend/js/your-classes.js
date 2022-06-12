let urlParameters = new URLSearchParams(window.location.search);

let userId = urlParameters.get("id");

fetch(`/bookings/${userId}`)
  .then((response) => response.json())
  .then((bookings) => {
    console.log(bookings);
    let bookingList = document.getElementById("bookings");

    for (let booking of bookings) {
      bookingList.innerHTML += `
        <li class="list-group-item d-flex flex-column">
              <span>${booking.classType} ${booking.date} ${booking.time}
              </span>
              <a class="btn btn-primary bg-danger btn-sm" style="width: 100px" href="cancel?id=${booking.bookingNumber}">
                Cancel
              </a>
            </li>
        `;
    }
  });

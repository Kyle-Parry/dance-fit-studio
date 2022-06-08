fetch(`/classes`)
  .then((response) => response.json())
  .then((classes) => {
    console.log(classes);
    let classList = document.getElementById("classes");

    for (let clas of classes) {
      classList.innerHTML += `
      <div class="card">
      <img
        class="card-img-top w-100 d-block"
        src="${clas.imgPath}"
        alt="${clas.imgAlt}"
      />
      <div class="card-body">
        <h1 class="card-title">${clas.classType} ${clas.date} ${clas.time}</h1>
        <h4></h4>
        <p class="card-text">${clas.Description}</p>
    </div>
    <a class="btn btn-primary" href="booking?id=${clas.classID}">Book Class</a>
      </div>
    </div>
        `;
    }
  });

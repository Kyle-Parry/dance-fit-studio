fetch(`/special`)
  .then((response) => response.json())
  .then((specials) => {
    console.log(specials);
    let specialOccasions = document.getElementById("special-occasions");

    for (let special of specials) {
      specialOccasions.innerHTML += `
      <div class="card">
        <img
            class="card-img-top w-100 d-block"
            src="${imagePath}"
        />
            <div class="card-body">
            <h4 class="card-title">${special.title}</h4>
            <p class="card-text">${special.description}</p>
        </div>
      </div>
        `;
    }
  });

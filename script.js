const container = document.createElement("div");
container.classList.add("container", "row");
fetch("https://restcountries.com/v3.1/all")
  .then((data) => {
    let res = data.json();
    return res;
  })
  .then((result) => {
    result.forEach((item) => {
      const card = document.createElement("div");
      container.style.display = "flex";
      container.style.justifyContent = "space-between";
      card.style.padding = "0";
      card.classList.add("card", "col-lg-4", "col-sm-12", "m-3");
      card.style.width = "25rem";
      let card_header = document.createElement("div");
      card_header.classList.add("card-header");
      card_header.innerHTML = item.name.common;
      card_header.style.background = "black";
      card_header.style.color = "white";
      card_header.style.textAlign = "center";
      let card_body = document.createElement("div");
      card_body.classList.add("card-body", "pt-5", "pb-5", "cardBody");
      let countriesImg = document.createElement("img");
      countriesImg.style.width = "20rem";
      countriesImg.style.height = "13rem";
      countriesImg.classList.add("mb-3");
      countriesImg.src = item.flags.png;
      card_body.appendChild(countriesImg);
      let capitalCountries = document.createElement("p");
      if (item.capital !== undefined) {
        const [val] = item.capital;
        capitalCountries.innerHTML = `Capital: ${val}`;
      } else {
        capitalCountries.innerHTML = `Capital is not available`;
      }
      let region = document.createElement("p");
      region.innerHTML = `Region: ${item.region}`;
      let [val1, val2] = item.latlng;
      let latlong = document.createElement("p");
      latlong.innerHTML = `Latitude: ${val1}, Longitude: ${val2}`;
      let countryCode = document.createElement("p");
      countryCode.innerHTML = `Country Code: ${item.cca3}`;
      card_body.appendChild(capitalCountries);
      let button = document.createElement("button");
      button.innerHTML = "Click for Weather";
      button.classList.add("btn", "btn-outline-light");
      card_body.appendChild(region);
      card_body.appendChild(latlong);
      card_body.appendChild(countryCode);
      card_body.appendChild(button);
      card.appendChild(card_header);
      card.appendChild(card_body);
      container.appendChild(card);
      button.onclick = function () {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${val1}&lon=${val2}&appid=d5c10c61400991b454dfe6c896e30ab7`
        )
          .then((res) => res.json())
          .then((res) => console.log(res))
          .catch((err) => {
            console.log(err);
          });
      };
    });
    document.body.appendChild(container);
  })
  .catch((err) => console.log(err));

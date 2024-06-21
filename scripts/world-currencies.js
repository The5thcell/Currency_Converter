// alert("world currencies");

const allCountries = document.querySelectorAll("path");
// console.log(allCountries);

allCountries.forEach((country) => {
  country.onclick = (event) => {
    allCountries.forEach((country) => country.classList.remove("selected"));

    // Add class to selected element
    let selectedCountry = event.target;
    if (!selectedCountry.classList.contains("selected")) {
      selectedCountry.classList.add("selected");
    }

    // Get currency from the selected element
    let currencyCountry = selectedCountry.getAttribute("name");
    let currencyCode = selectedCountry.id || selectedCountry.className.baseVal;

    if (
      currencyCode === "DE" ||
      currencyCode === "FR" ||
      currencyCode === "IT" ||
      currencyCode === "ES" ||
      currencyCode === "NL" ||
      currencyCode === "BE" ||
      currencyCode === "GR" ||
      currencyCode === "PT" ||
      currencyCode === "IE" ||
      currencyCode === "AT" ||
      currencyCode === "FI"
    ) {
      currencyCode = "EUR";
    }
    if (currencyCode === "GB") {
      currencyCode = "GBP";
    }
    if (currencyCode === "US") {
      currencyCode = "USD";
    }
    if (currencyCode === "CA") {
      currencyCode = "CAD";
    }
    //   Display selected country and all conversion rates
    if (currencyCode) {
      currencyCode = currencyCode.toUpperCase();
      console.log(currencyCode);
      const url = `https://api.exchangerate-api.com/v4/latest/${currencyCode}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const rates = data.rates;
          const html = `
           <div class="currency">
                    <div class="currency-header">
                        <h2 class="selected-country">${currencyCountry.toUpperCase()}</h2>
                        <h4 class="base-currency">
                        Base Currency: <span>${currencyCode}</span>
                        </h4>
                        <input type="text" id="search" placeholder="Search for currency" onfocus="getSearchedCurrency()"/>
                    </div>
                    <ul class="conversion-list">
                    ${Object.keys(rates)
                      .map((key) => {
                        return `
                        
                        <li class="currency-item">
                        
                        <p class="currency-name">${key}</p>
                        <p class="currency-rate">${rates[key]}</p>
                        
                        </li>
                        
                        `;
                      })
                      .join("")}
                    </ul>

    </div>
          
          `;

          document.getElementById("currencies").innerHTML = html;
        })
        .catch((error) => console.log(error));
    }
  };
});

// Search function

function getSearchedCurrency() {
  console.log("focus");
  const search = document.querySelector("#search");
  search.addEventListener("keyup", searchCurrency);
}

function searchCurrency(e) {
  //   console.log(e.target.value);

  const currencyList = document.querySelectorAll(".currency-item");
  currencyList.forEach((currency) => {
    const currencyName = currency.querySelector(".currency-name").innerText;
    if (currencyName.toLowerCase().includes(e.target.value.toLowerCase())) {
      currency.style.display = "flex";
    } else {
      currency.style.display = "none";
    }
  });
}

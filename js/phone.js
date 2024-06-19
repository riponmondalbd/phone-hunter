const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);

  // get card container
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container cards before adding new cards
  phoneContainer.textContent = "";

  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // card div
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-gray-100 p-4 shadow-xl";

    // make card for phone
    phoneCard.innerHTML = `
            <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `;
    // append card
    phoneContainer.appendChild(phoneCard);
  });
  // stop loading spinner
  toggleLoadingSpinner(false);
};

//
const handleShowDetails = async (id) => {
  //   console.log("clicked Show Details", id);

  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();

  const phone = data.data;

  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById("show-details-phone-name");
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );
  showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>GPS:</span>${phone?.others?.GPS || "No GPS"}</p>
    `;

  // show the modal
  show_details_modal.showModal();
};

// handle search button
const handleSearch = (isShowAll) => {
  // start spinner
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone("apple");

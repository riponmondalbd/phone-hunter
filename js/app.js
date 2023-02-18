const loadPhones = async (search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    // console.log(phones);
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    // Display 20 phones only
    phones = phones.slice(0, 20);

    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">${phone.slug}</p>
                        </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })

    // stop loader
    toggleSpinner(false);
}

// handle search button clicked
document.getElementById('btn-search').addEventListener('click', function () {

    // start Loader
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);

    searchField.value = '';
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }

}

// loadPhones();
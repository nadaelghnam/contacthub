var fullName = document.querySelector('#fullName')
var phoneNumber = document.querySelector('#phoneNumber')
var emailAddress = document.querySelector('#emailAddress')
var address = document.querySelector('#address')
var group = document.querySelector('#group')
var notes = document.querySelector('#notes')
var lightContainer = document.querySelector(".light-container")
var box = document.querySelector(".light-container .box")
var addBtn = document.querySelector("#addBtn")
var closeBtn = document.querySelector('#closeBtn')
var cancelBtn = document.querySelector('#cancelBtn')
var editBtn = document.querySelector('#editBtn')
var saveBtn = document.querySelector('#saveBtn')
var updateBtn = document.querySelector('#updateBtn')
var isFavorite = document.getElementById('isFavorite');
var isEmergency = document.getElementById('isEmergency');
var currentindex




addBtn.addEventListener("click", function () {
    displayForm()
})
closeBtn.addEventListener("click", function () {
    closeForm()
})
cancelBtn.addEventListener("click", function () {
    closeForm()
})



var contactList = []

if (JSON.parse(localStorage.getItem("contactList")).length > 0) {
    contactList = JSON.parse(localStorage.getItem("contactList"))
    displayContact()
}

function closeForm() {
    lightContainer.classList.add("d-none")
    clearContact()
    document.getElementById("saveBtn").classList.remove("d-none")
    document.getElementById("updateBtn").classList.add("d-none")
}
function displayForm() {
    lightContainer.classList.remove("d-none")
}

function saveContact() {
    if ((validateName() == true) && (validatePhone() == true) && (validateEmail() == true)) {
        var contact = {
            name: fullName.value,
            phone: phoneNumber.value,
            email: emailAddress.value,
            address: address.value,
            group: group.value,
            notes: notes.value,
            // isFavorite: isFavorite.checked,
            // isEmergency: isEmergency.checked
        }

        contactList.push(contact)

        localStorage.setItem("contactList", JSON.stringify(contactList))
        clearContact()
        closeForm()
        displayContact()

        Swal.fire({
            icon: 'success',
            title: 'Added',
            text: `Contact has been added successfully.`,
            timer: 2000,
            showConfirmButton: false
        });


    } else {
        Swal.fire({
            icon: "error",
            title: "Missing Name",
            text: "Please enter a name for the contact!",
        });
    }
}
function updateContact() {

    var contact = {
        name: fullName.value,
        phone: phoneNumber.value,
        email: emailAddress.value,
        address: address.value,
        group: group.value,
        notes: notes.value,
        // isFavorite: isFavorite.checked,
        // isEmergency: isEmergency.checked,
    }

    contactList.splice(currentindex, 1, contact)

    localStorage.setItem("contactList", JSON.stringify(contactList))
    clearContact()
    closeForm()
    displayContact()
    Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `Contact has been updated successfully.`,
        timer: 2000,
        showConfirmButton: false
    });
    document.getElementById("saveBtn").classList.remove("d-none")
    document.getElementById("updateBtn").classList.add("d-none")

}



function clearContact() {
    fullName.value = ""
    phoneNumber.value = ""
    emailAddress.value = ""
    address.value = ""
    group.value = ""
    notes.value = ""
    // isFavorite.checked = false
    // isEmergency.checked = false
}


function deleteContact(index) {
    Swal.fire({
        title: "Delete Contact?",
        text: "Are you sure you want to delete iuoiuop? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "rgba(117, 115, 115, 1)",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            contactList.splice(index, 1);
            localStorage.setItem("contactList", JSON.stringify(contactList));
            displayContact();
            Swal.fire({
                title: "Deleted!",
                text: "Your contact has been deleted.",
                icon: "success"
            });
        }
    });

}
function editContact(index) {
    currentindex = index
    fullName.value = contactList[index].name
    phoneNumber.value = contactList[index].phone
    emailAddress.value = contactList[index].email
    address.value = contactList[index].address
    group.value = contactList[index].group
    notes.value = contactList[index].notes
    // isFavorite.checked = contactList[index].isFavorite;
    // isEmergency.checked = contactList[index].isEmergency;
    document.getElementById("saveBtn").classList.add("d-none")
    document.getElementById("updateBtn").classList.remove("d-none")
    displayForm()
}
function displayContact() {
    var searchBar = document.getElementById("searchBar").value
    var cartona = ``
    var favCount = 0;
    var emergencyCount = 0;
    var favoritesCartona = ``;
    var emergencyCartona = ``;
    for (var i = 0; i < contactList.length; i++) {
        var contact = contactList[i];
        var emergencySpan = contactList[i].isEmergency ?
            `<span class="emergency"><i class="fa-solid fa-heart-pulse me-1"></i>Emergency</span>` : '';
        var favClass = contactList[i].isFavorite ? 'star-full' : 'star-regular';
        var emergencyClass = contactList[i].isEmergency ? 'emerency-full' : 'emerency-regular';

        if (contactList[i].isFavorite) {
            favCount++;
            // document.getElementById("noFav").classList.add("d-none");
        } 
        // else {
        //     document.getElementById("noFav").classList.remove("d-none")
        // }
        if (contactList[i].isEmergency) {
            emergencyCount++;
            // document.getElementById("noEmergency").classList.add("d-none");
        } 
        // else {
        //     document.getElementById("noEmergency").classList.remove("d-none")
        // }

        var sideCard = `

                        <div class="call-design green-call d-flex align-items-center justify-content-between p-2 mb-2">
                                <div class="d-flex align-items-center">
                                    <div class="contact-name me-2">
                                        <span>${contact.name.charAt(0)}</span>
                                    </div>
                                    <div class="left">
                                        <p class="m-0">${contact.name}</p>
                                        <span>${contact.phone}</span>
                                    </div>
                                </div>
                                <div class="call-icons">
                                    <span><a href="tel:+${contact.phone}" class="text-decoration-none">
                                    <i class="icons-design  fa-solid fa-phone ${contact.isEmergency ? 'red-call-design' : 'green-call-design'}"></i></a></span>
                                </div>
                            </div>`;

        if (contact.isFavorite) {
            favoritesCartona += sideCard;
        }

        if (contact.isEmergency) {
            emergencyCartona += sideCard;
        }

        if (contactList[i].name.toLowerCase().includes(searchBar.toLowerCase())
            || contactList[i].phone.includes(searchBar)
            || contactList[i].email.toLowerCase().includes(searchBar.toLowerCase())) {
            cartona += `<div class="col">
                                <div class="contact-details">
                                    <div class="contact-detail">
                                        <div class="d-flex align-items-start mb-3">
                                            <div class="contact-img me-3 position-relative">
                                                <span class="f-letter">${contactList[i].name.charAt(0)}</span>
                                                <span><i class="fa-solid fa-star"></i></span>
                                                <span><i class="fa-solid fa-heart-pulse"></i></span>
                                            </div>
                                            <div class="contact-info">
                                                <p class="m-0 text-black fw-bold fs-6">${contactList[i].name}</p>
                                                <span class="d-flex mt-1">
                                                    <i class="fa-solid fa-phone"></i>${contactList[i].phone}</span>
                                            </div>
                                        </div>
                                        <div class="social my-3">
                                        
                                            <span class="d-flex align-items-center my-2">
                                                <i class="fa-solid fa-envelope"></i>${contactList[i].email}</span>
                                            <span class="d-flex align-items-center my-2">
                                                <i class="fa-solid fa-location-dot"></i>${contactList[i].address}</span>
                                            <span class="group">${contactList[i].group}</span>
                                            <span>${emergencySpan}</span>

                                        </div>
                                    </div>
                                    <div class="contact-icons d-flex justify-content-between">
                                        <div class="d-flex">
                                            <span><a href="tel:+${contactList[i].phone}" class="text-decoration-none"><i class="fa-solid fa-phone icons-design"></i></a></span>
                                            <span><a href="mailto:${contactList[i].email}" class="text-decoration-none"><i class="fa-solid fa-envelope icons-design"></i></a></span>
                                        </div>
                                        <div class="d-flex">
                                   <i class="fa-solid fa-star icons-design ${favClass}" onclick="toggleFavorite(${i})"></i>
                                            <span><i class="fa-solid fa-heart-pulse icons-design ${emergencyClass}"onclick="toggleEmergency(${i})"></i></span>
                                            <span onclick="editContact(${i})"><i class="fa-solid fa-pen icons-design"></i></span>
                                            <span onclick="deleteContact(${i})"><i class="fa-solid fa-trash icons-design"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        }
    }


    document.getElementById("rowData").innerHTML = cartona
    document.getElementById("totalContacts").innerHTML = contactList.length;
    document.getElementById("totalFavorites").innerHTML = favCount;
    document.getElementById("totalEmergency").innerHTML = emergencyCount;
    document.getElementById("favoritesList").innerHTML = favoritesCartona;
    document.getElementById("emergencyList").innerHTML = emergencyCartona;



}


function validateName() {
    var regex = /^[a-zA-Z]{2,50}$/
    var invalidText = document.getElementById('invalidText')
    if (regex.test(fullName.value)) {
        invalidText.classList.add("d-none")
        return true
    } else {
        invalidText.classList.remove("d-none")
        return false
    }

}


function validatePhone() {
    var regex = /^(\+2|002)?01([0-2]|5)\d{8}$/
    var invalidPhone = document.getElementById('invalidPhone')
    if (regex.test(phoneNumber.value)) {
        invalidPhone.classList.add("d-none")
        return true
    } else {
        invalidPhone.classList.remove("d-none")
        return false
    }

}

function validateEmail() {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    var invalidEmail = document.getElementById('invalidEmail')
    if (regex.test(emailAddress.value)) {
        invalidEmail.classList.add("d-none")
        return true
    } else {
        invalidEmail.classList.remove("d-none")
        return false
    }

}


function toggleFavorite(index) {
    var contact = contactList[index];
    contact.isFavorite = !contact.isFavorite;
    localStorage.setItem("contactList", JSON.stringify(contactList));
    displayContact();
}
function toggleEmergency(index) {
    var contact = contactList[index];
    contact.isEmergency = !contact.isEmergency;
    localStorage.setItem("contactList", JSON.stringify(contactList));
    displayContact();
}
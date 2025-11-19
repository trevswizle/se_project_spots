let initialCards = [
    {name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"},
    {name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"},
    {name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"},
    {name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"},
    {name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"},
    {name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"}
];


const modalProfileBtn = document.querySelector('.profile__edit-btn');
const profileModal = document.querySelector('#edit-profile-modal');
const profileModalCloseBtn = document.querySelector('#edit-profile-modal .modal__close-btn');
const newPostModalBtn = document.querySelector('.profile__add-btn');
const newPostModal = document.querySelector('#new-post-modal');
const newPostModalCloseBtn = document.querySelector('#new-post-modal .modal__close-btn');
const profileNameEl = document.querySelector('.profile__name');
const profileRoleEl = document.querySelector('.profile__role');

const modalFormName = document.querySelector('#edit-profile-form');
const profileNameInput = document.querySelector('#new-post-title-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');

const mordalFormPost = document.querySelector('#new-post-form');
const nameInput = document.querySelector('#profile-description-input');
const linkInput = document.querySelector('#profile-name-input');

const cardsContainer = document.querySelector(".cards__list");
const cardtemplate = document.querySelector("#card-template").content.querySelector(".card");


const newLinkEl = document.querySelector("#profile-link-input");
const newCaptionEl = document.querySelector("#profile-caption-input")


const imageModal = document.querySelector('#image-modal');
const previewImageEl = imageModal.querySelector(".modal__image");
const previewCaptionEl = imageModal.querySelector(".modal__caption");
const previewCloseBtn = imageModal.querySelector(".modal__imgage-btn");

// this function makes the card and is all the funtionality
function getCardElement (data) {
    const cardElement = cardtemplate.cloneNode(true);
    const cardLinkEl = cardElement.querySelector(".card__image");
    const cardTileEl = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-btn");
    const trashButton = cardElement.querySelector(".card__trash-btn");
    

    cardLinkEl.src = data.link;
    cardLinkEl.alt = data.name;
    cardTileEl.textContent = data.name;

    likeButton.addEventListener('click' , (evt) => {
        evt.preventDefault();

        likeButton.classList.toggle('card__liked-btn');
    });
    
    trashButton.addEventListener('click', () =>  {
        cardElement.remove();
    });

    cardLinkEl.addEventListener("click", () => {
        previewImageEl.src = data.link;       // 1. Set big image
        previewImageEl.alt = data.name;       // 2. Set alt text
        previewCaptionEl.textContent = data.name; // 3. Set caption
        openModal(imageModal);         // 4. Open modal
    });

    previewCloseBtn.addEventListener('click', () => {
        closeModal(imageModal);
    })

    return cardElement;
}
// this funtion displays the cards and adds them
initialCards.forEach((item) => {
    cardsContainer.append(getCardElement(item));
});

function openModal(modal) {
    modal.classList.add('modal_is-open');
}

function closeModal(modal) {
    modal.classList.remove('modal_is-open');
}

modalProfileBtn.addEventListener('click', () => {
    const newName = profileNameEl.textContent;
    const newDescription = profileRoleEl.textContent;

    profileNameInput.value = newName;
    profileDescriptionInput.value = newDescription;

    openModal(profileModal);
});

modalFormName.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const updatedName = profileNameInput.value;
    const updatedDescription = profileDescriptionInput.value;

    profileNameEl.textContent = updatedName;
    profileRoleEl.textContent = updatedDescription;

    closeModal(profileModal);
});

profileModalCloseBtn.addEventListener('click', function() {
    closeModal(profileModal);
});

newPostModalBtn.addEventListener('click', () => {
    openModal(newPostModal);
});

mordalFormPost.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const newCaptionInput = newCaptionEl.value;
    const newLink = newLinkEl.value;

    const newCardData = {
        name: newCaptionInput,
        link: newLink
    };

    const newCardElement = getCardElement(newCardData);

    cardsContainer.prepend(newCardElement);

    newCaptionEl.value = "";
    newLinkEl.value = "";

    closeModal(newPostModal);
});

newPostModalCloseBtn.addEventListener('click', function() {
    closeModal(newPostModal);
});




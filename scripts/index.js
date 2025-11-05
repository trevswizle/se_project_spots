const modalProfileBtn = document.querySelector('.profile__edit-btn');
const profileModal = document.querySelector('#edit-proile-modal');
const profileModalCloseBtn = document.querySelector('#edit-proile-modal .modal__close-btn');
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

    console.log(nameInput);
    console.log(linkInput);

    closeModal(newPostModal);
});

newPostModalCloseBtn.addEventListener('click', function() {
    closeModal(newPostModal);
});


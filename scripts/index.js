const modalProfileBtn = document.querySelector('.profile__edit-btn');
const profileModal = document.querySelector('#edit-profile-modal');
const profileModalClsBtn = document.querySelector('#edit-profile-modal .modal__close-btn');
const newPostModalBtn = document.querySelector('.profile__add-btn');
const newPostModal = document.querySelector('#new-post-modal');
const newPostModalClsBtn = document.querySelector('#new-post-modal .modal__close-btn');
const profileNameEl = document.querySelector('.profile__name');
const profileRoleEl = document.querySelector('.profile__role');
const profileNameInput = document.querySelector('#profile-name-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');
const modalFormName = document.querySelector('.modal__form');

modalProfileBtn.addEventListener('click', () => {
    const newName = profileNameEl.textContent;
    const newDescript = profileRoleEl.textContent;

    profileNameInput.value = newName;
    profileDescriptionInput.value = newDescript;

    profileModal.classList.remove('modal_is-closed');
    profileModal.classList.add('modal_is-open');
});

modalFormName.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const updatedName = profileNameInput.value;
    const updatedDesc = profileDescriptionInput.value;

    profileNameEl.textContent = updatedName;
    profileRoleEl.textContent = updatedDesc;

    profileModal.classList.remove('modal_is-open');
    profileModal.classList.add('modal_is-closed');
});

profileModalClsBtn.addEventListener('click', function() {
  profileModal.classList.remove('modal_is-open');
  profileModal.classList.add('modal_is-closed');
});

newPostModalBtn.addEventListener('click', () => {
    newPostModal.classList.remove('modal_is-closed');
    newPostModal.classList.add('modal_is-open');
});

newPostModalClsBtn.addEventListener('click', function() {
    newPostModal.classList.remove('modal_is-open');
    newPostModal.classList.add('modal_is-closed');
});


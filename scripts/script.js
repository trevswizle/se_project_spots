const modalProfileBtn = document.querySelector('.profile__edit-btn');
const profileModal = document.querySelector('#edit-profile-modal');
const profileModalClsBtn = document.querySelector('#edit-profile-modal .modal__close-btn');
const newPostModalBtn = document.querySelector('.profile__add-btn');
const newPostModal = document.querySelector('#new-post-modal');
const newPostModalClsBtn = document.querySelector('#new-post-modal .modal__close-btn');



modalProfileBtn.addEventListener('click', () => {
    profileModal.classList.remove('modal_is-closed');
    profileModal.classList.add('modal_is-open');
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


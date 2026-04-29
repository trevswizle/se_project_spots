import {
  enableValidation,
  settings,
  resetValidation,
  toggleButtonState,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6c2bc0b0-f546-4c94-a1b4-2190f096f974",
    "Content-Type": "application/json",
  },
});

// Profile elements
const profileNameEl = document.querySelector(".profile__name");
const profileRoleEl = document.querySelector(".profile__role");
const profileAvatarEl = document.querySelector(".profile__avatar");

// Profile edit modal
const modalProfileBtn = document.querySelector(".profile__edit-btn");
const profileModal = document.querySelector("#edit-profile-modal");
const profileModalCloseBtn = document.querySelector(
  "#edit-profile-modal .modal__close-btn"
);
const modalFormName = document.querySelector("#edit-profile-form");
const profileNameInput = document.querySelector("#new-post-title");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// New post modal
const newPostModalBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostModalCloseBtn = document.querySelector(
  "#new-post-modal .modal__close-btn"
);
const modalFormPost = document.querySelector("#new-post-form");
const newLinkEl = document.querySelector("#profile-link-input");
const newCaptionEl = document.querySelector("#profile-caption-input");
const cardSubmitBtn = modalFormPost.querySelector(".modal__submit-btn");

// Cards
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Image preview modal
const imageModal = document.querySelector("#image-modal");
const previewImageEl = imageModal.querySelector(".modal__image");
const previewCaptionEl = imageModal.querySelector(".modal__caption");
const previewCloseBtn = imageModal.querySelector(".modal__image-btn");

// Delete confirmation modal
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteConfirmBtn = document.querySelector("#delete-confirm-btn");
const deleteCancelBtn = document.querySelector("#delete-cancel-btn");

// Avatar edit modal
const avatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarModalCloseBtn = editAvatarModal.querySelector(
  ".modal__close-btn"
);
const editAvatarForm = document.querySelector("#edit-avatar-form");
const avatarLinkInput = document.querySelector("#avatar-link-input");

let currentCardElement = null;
let currentCardId = null;

function renderLoading(isLoading, button, defaultText = "Save") {
  button.textContent = isLoading ? "Saving..." : defaultText;
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardLinkEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const trashButton = cardElement.querySelector(".card__trash-btn");

  cardLinkEl.src = data.link;
  cardLinkEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  if (data.isLiked) {
    likeButton.classList.add("card__liked-btn");
  }

  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains("card__liked-btn");
    const request = isLiked
      ? api.dislikeCard(data._id)
      : api.likeCard(data._id);

    request
      .then((updatedCard) => {
        if (updatedCard.isLiked) {
          likeButton.classList.add("card__liked-btn");
        } else {
          likeButton.classList.remove("card__liked-btn");
        }
      })
      .catch(console.error);
  });

  trashButton.addEventListener("click", () => {
    currentCardElement = cardElement;
    currentCardId = data._id;
    openModal(deleteModal);
  });

  cardLinkEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(imageModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-open");
  window.addEventListener("keydown", handleEscape);
  modal.addEventListener("mousedown", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  window.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("mousedown", handleOverlayClick);
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-open");
    if (openedModal) closeModal(openedModal);
  }
}

// Image preview
previewCloseBtn.addEventListener("click", () => closeModal(imageModal));

// Profile edit
modalProfileBtn.addEventListener("click", () => {
  profileNameInput.value = profileNameEl.textContent;
  profileDescriptionInput.value = profileRoleEl.textContent;
  const inputList = Array.from(modalFormName.querySelectorAll(".modal__input"));
  resetValidation(modalFormName, inputList);
  toggleButtonState(inputList, modalFormName.querySelector(".modal__submit-btn"));
  openModal(profileModal);
});

profileModalCloseBtn.addEventListener("click", () => closeModal(profileModal));

modalFormName.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitBtn = modalFormName.querySelector(".modal__submit-btn");
  renderLoading(true, submitBtn);
  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    })
    .then((userData) => {
      profileNameEl.textContent = userData.name;
      profileRoleEl.textContent = userData.about;
      closeModal(profileModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, submitBtn));
});

// New post
newPostModalBtn.addEventListener("click", () => {
  const inputList = Array.from(modalFormPost.querySelectorAll(".modal__input"));
  resetValidation(modalFormPost, inputList);
  toggleButtonState(inputList, cardSubmitBtn);
  openModal(newPostModal);
});

newPostModalCloseBtn.addEventListener("click", () => closeModal(newPostModal));

modalFormPost.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, cardSubmitBtn);
  api
    .addCard({ name: newCaptionEl.value, link: newLinkEl.value })
    .then((cardData) => {
      cardsContainer.prepend(getCardElement(cardData));
      modalFormPost.reset();
      const inputList = Array.from(
        modalFormPost.querySelectorAll(".modal__input")
      );
      resetValidation(modalFormPost, inputList);
      toggleButtonState(inputList, cardSubmitBtn);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, cardSubmitBtn));
});

// Delete confirmation
deleteModalCloseBtn.addEventListener("click", () => closeModal(deleteModal));
deleteCancelBtn.addEventListener("click", () => closeModal(deleteModal));

deleteConfirmBtn.addEventListener("click", () => {
  deleteConfirmBtn.textContent = "Deleting...";
  api
    .removeCard(currentCardId)
    .then(() => {
      currentCardElement.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      deleteConfirmBtn.textContent = "Delete";
    });
});

// Avatar edit
avatarBtn.addEventListener("click", () => {
  editAvatarForm.reset();
  const inputList = Array.from(
    editAvatarForm.querySelectorAll(".modal__input")
  );
  resetValidation(editAvatarForm, inputList);
  toggleButtonState(
    inputList,
    editAvatarForm.querySelector(".modal__submit-btn")
  );
  openModal(editAvatarModal);
});

editAvatarModalCloseBtn.addEventListener("click", () =>
  closeModal(editAvatarModal)
);

editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitBtn = editAvatarForm.querySelector(".modal__submit-btn");
  renderLoading(true, submitBtn);
  api
    .updateAvatar({ avatar: avatarLinkInput.value })
    .then((userData) => {
      profileAvatarEl.src = userData.avatar;
      editAvatarForm.reset();
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => renderLoading(false, submitBtn));
});

// Initial page load
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    profileNameEl.textContent = userData.name;
    profileRoleEl.textContent = userData.about;
    profileAvatarEl.src = userData.avatar;
    cardsData.forEach((card) => {
      cardsContainer.append(getCardElement(card));
    });
  })
  .catch(console.error);

enableValidation(settings);

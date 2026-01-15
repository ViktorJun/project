import {containerForPhoto, bigPictureCancel} from "./variables.js";
import {createBigPicture, showComments} from "./fullScreen.js";
import {createMockData} from "./mockData.js";
import {renderFragmentDOM, createArrayPhotos} from "./renderPictures.js";
import {validateUploadOverlay, clearValidity} from "./validateUploadOverlay.js";
import {closeBigPicture, onDocumentKeydown, closeOverlay, stopEscPropagation} from "./modalClose.js";
import {handlerEffects, handlerScale, openUploadFile, handlerSlider} from "./uploadOverlay.js";

const slider = document.querySelector('.effect-level__slider');
const containerEffects = document.querySelector('.effects__list');
const uploadScale = document.querySelector('.img-upload__scale');
const socialCommentsLoader = document.querySelector('.social__comments-loader');
const uploadFile = document.querySelector('#upload-file');
const containerUploadOverlay = document.querySelector('.img-upload__text');
const uploadForm = document.querySelector('.img-upload__form');
const closeButtonOverlay = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const mockData = createMockData();
const resultArray = createArrayPhotos(mockData);
renderFragmentDOM(resultArray);

containerForPhoto.addEventListener('click', (event) => {
    const target = +event.target.dataset.id;
    const targetObject = mockData.find(photo => {
        if (target === photo.id){
            return photo;
        }
    });
    if (targetObject !== undefined) {
        createBigPicture(targetObject);
    }
});
socialCommentsLoader.addEventListener('click', showComments);
uploadFile.addEventListener('change', openUploadFile);
bigPictureCancel.addEventListener('click', closeBigPicture);
closeButtonOverlay.addEventListener('click', closeOverlay);
textHashtags.addEventListener('keydown', stopEscPropagation);
textDescription.addEventListener('keydown', stopEscPropagation);
document.addEventListener('keydown', onDocumentKeydown);
uploadForm.addEventListener('submit', validateUploadOverlay);
containerUploadOverlay.addEventListener('input', clearValidity);
uploadScale.addEventListener('click', handlerScale);
containerEffects.addEventListener('change', handlerEffects);
slider.noUiSlider.on('update', handlerSlider);


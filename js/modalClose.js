import{resetCommentsState} from './fullScreen.js';
import {resetUploadFile} from "./uploadOverlay.js";

const uploadFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const containerBigPicture = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');

export function closeOverlay() {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadForm.reset();
    uploadFile.value = '';
    resetUploadFile();
}
export function closeBigPicture() {
    containerBigPicture.classList.add('hidden');
    socialCommentCount.classList.remove('hidden');
    document.body.classList.remove('modal-open');
    resetCommentsState();
}
export function onDocumentKeydown(event) {
    if (event.key === 'Escape' && !containerBigPicture.classList.contains('hidden')) {
        closeBigPicture();
    }else if (event.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
        closeOverlay();
    }
}
export function stopEscPropagation(event) {
    if (event.key === 'Escape') {
        event.stopPropagation();
    }
}


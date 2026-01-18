import {imageStartsWith} from "./variables.js";

const imagePreview = document.querySelector('.img-upload__preview img');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadEffectLevel = document.querySelector('.img-upload__effect-level');

let previewUrl = null;

export function openUploadFile(){
    const file = uploadFile.files[0];
    if (!file) return;
    if (!file.type.startsWith(imageStartsWith)) {
        return uploadFile.value = '';
    }
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadEffectLevel.classList.add('hidden');
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
    }
    previewUrl = URL.createObjectURL(file);
    imagePreview.src = previewUrl;
}
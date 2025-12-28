import {containerForPhoto} from "./variables.js";
export function createPhoto(value) {
    const cloneElementDOM = document.querySelector('#picture').content.cloneNode(true);
    const elementPicture = cloneElementDOM.querySelector('.picture');
    elementPicture.querySelector('img').src = value.url;
    elementPicture.querySelector('.picture__likes').innerText = value.likes;
    elementPicture.querySelector('.picture__comments').innerText = value.comments ? value.comments.length : 0;
    return elementPicture;
}
export function createArrayPhotos(array) {
    return array.map((element) => {
        return createPhoto(element);
    });
}
export function renderFragmentDOM(photos) {
    const fragmentDOM = document.createDocumentFragment();
    photos.forEach(element => {
        fragmentDOM.appendChild(element);
    });
    containerForPhoto.appendChild(fragmentDOM);
}



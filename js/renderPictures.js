const containerForPhoto = document.querySelector('.pictures');
export function createPhoto(obj) {
    const cloneElementDOM = document.querySelector('#picture').content.cloneNode(true);
    const elementPicture = cloneElementDOM.querySelector('.picture');
    elementPicture.querySelector('img').src = obj.url;
    elementPicture.querySelector('.picture__likes').innerText = obj.likes;
    elementPicture.querySelector('.picture__comments').innerText = obj.comments ? obj.comments.length : 0;
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



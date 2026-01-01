import {containerForPhoto, bigPictureCancel} from "./variables.js";
import {createBigPicture, closeBigPicture, onDocumentKeydown} from "./fullScreen.js";
import {createMockData} from "./mockData.js";
import {renderFragmentDOM, createArrayPhotos} from "./renderPictures.js";

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
bigPictureCancel.addEventListener('click',closeBigPicture);
document.addEventListener('keydown', onDocumentKeydown);

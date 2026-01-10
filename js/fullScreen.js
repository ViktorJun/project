import{NUMBER_SHOWING_COMMENTS} from './variables.js';

const socialCommentsLoader = document.querySelector('.social__comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialComments = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const commentsCount = document.querySelector('.comments-count');
const likesCount = document.querySelector('.likes-count');
const bigPictureImg = document.querySelector('.big-picture__img');
const containerBigPicture = document.querySelector('.big-picture');
const commentsCountShow = document.querySelector('.comments-count-show');
let countComments = 0;
let chunkedArray = [];

export function createBigPicture(targetPicture) {
    containerBigPicture.classList.remove('hidden');
    bigPictureImg.firstElementChild.src = targetPicture.url;
    likesCount.textContent = targetPicture.likes;
    commentsCount.textContent = targetPicture.comments?.length ?? 0;
    socialCaption.textContent = targetPicture.description;
    document.body.classList.add('modal-open');
    commentsCountShow.textContent = NUMBER_SHOWING_COMMENTS;
    clearComments();
    if (targetPicture.comments === null){
        socialCommentsLoader.classList.add('hidden');
        socialCommentCount.classList.add('hidden');
    }else if (targetPicture.comments.length <= 5){
        socialCommentsLoader.classList.add('hidden');
        socialCommentCount.classList.add('hidden');
        createComments(targetPicture.comments);
    }else {
        socialCommentCount.classList.remove('hidden');
        socialCommentsLoader.classList.remove('hidden');
        filtrationArrayComments(targetPicture.comments);
        createComments(chunkedArray[0]);
        countComments++
    }
}
export function resetCommentsState() {
    countComments = 0;
    chunkedArray.length = 0;
}
function clearComments() {
    while(socialComments.firstChild) {
        socialComments.removeChild(socialComments.firstChild);
    }
}
function createComments(arrayComments) {
    arrayComments.forEach(objectComment => {
        const socialComment = document.createElement('li');
        socialComment.className = 'social__comment';
        socialComments.appendChild(socialComment);
        const socialPicture = document.createElement('img');
        socialPicture.className = 'social__picture';
        socialPicture.src = objectComment.avatar;
        socialPicture.alt = objectComment.name;
        socialPicture.width = 35;
        socialPicture.height = 35;
        socialComment.appendChild(socialPicture);
        const socialText = document.createElement('p');
        socialText.className = 'social__text';
        socialText.textContent = objectComment.message;
        socialComment.appendChild(socialText);
    });
}
export function showComments() {
    if (countComments !== chunkedArray.length){
        createComments(chunkedArray[countComments]);
        const statusNumberComments = parseInt(commentsCountShow.textContent);
        commentsCountShow.textContent = statusNumberComments + chunkedArray[countComments].length;
        countComments++
    }
    if (countComments === chunkedArray.length){
        socialCommentsLoader.classList.add('hidden');
    }
}
function filtrationArrayComments(array) {
    for (let i = 0; i < array.length; i += NUMBER_SHOWING_COMMENTS) {
        chunkedArray.push(array.slice(i, i + NUMBER_SHOWING_COMMENTS));
    }
    return chunkedArray
}
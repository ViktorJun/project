const socialCommentsLoader = document.querySelector('.social__comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialComments = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const commentsCount = document.querySelector('.comments-count');
const likesCount = document.querySelector('.likes-count');
const bigPictureImg = document.querySelector('.big-picture__img');
const containerBigPicture = document.querySelector('.big-picture');

export function createBigPicture(targetPicture) {
    containerBigPicture.classList.remove('hidden');
    bigPictureImg.firstElementChild.src = targetPicture.url;
    likesCount.textContent = targetPicture.likes;
    commentsCount.textContent = targetPicture.comments?.length ?? 0;
    socialCaption.textContent = targetPicture.description;
    socialCommentCount.classList.add('hidden');
    document.body.classList.add('modal-open');
    if (targetPicture.comments === null || targetPicture.comments.length < 5){
        socialCommentsLoader.classList.add('hidden');
    }else {
        socialCommentsLoader.classList.remove('hidden');
    }
    createComments(targetPicture.comments);
}
function createComments(arrayComments) {
    while(socialComments.firstChild) {
        socialComments.removeChild(socialComments.firstChild);
    }
    if (arrayComments === null){
        return;
    }
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

export function closeBigPicture() {
    containerBigPicture.classList.add('hidden');
    socialCommentCount.classList.remove('hidden');
    document.body.classList.remove('modal-open');
}
export function onDocumentKeydown(event) {
    if (event.key === 'Escape' && !containerBigPicture.classList.contains('hidden')) {
        closeBigPicture();
    }
}

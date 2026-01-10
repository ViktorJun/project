import {MAX_COUNT_HASHTAG, MAX_LENGTH_SYMBOL_DESCRIPTION} from "./variables.js";
import {closeOverlay} from "./modalClose.js";

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const allowedCharacters = new RegExp(/^(#[A-Za-z0-9]{1,19})$/i);

export function validateUploadOverlay(event) {
    validateTextHashtags(event);
    validateTextDescription(event);
}
export function clearValidity(event) {
    const target = event.target;
    if (target === textHashtags || target === textDescription) {
        target.setCustomValidity('');
    }
}
function validateTextHashtags(event){
    const value = textHashtags.value.trim().split(/\s+/);
    if (value.length === 0){
        return
    }
    const validators = [
        checkLengthHashtags,
        validateHashtag,
        checkSameHashtags
    ];
    for (const validate of validators){
        const message = validate(value);
        if (message){
            textHashtags.setCustomValidity(message);
            event.preventDefault();
            return;
        }
    }
    textHashtags.setCustomValidity('');
    closeOverlay();
}
function validateHashtag(value) {
    let textValidity = '';
    for (const hashtag of value){
        if (!allowedCharacters.test(hashtag)){
            return textValidity = `не корректный ввод, хештег должен состоять из символов и цифр, иметь длинну 20 символов, включая #`;
        }
        if (!hashtag.startsWith('#')){
            return textValidity = 'хештег должен начинаться с #';
        }
    }
    return textValidity;
}
function checkSameHashtags(value) {
    const lowerValueArray = value.map(hashtag => hashtag.toLowerCase());
    const setArray = new Set(lowerValueArray);
    if (setArray.size !== lowerValueArray.length) {
        return 'хештеги не должны повторяться';
    }
    return '';
}
function checkLengthHashtags(value) {
    if (value.length > MAX_COUNT_HASHTAG){
        return 'должно быть не больше 5 хештегов';
    }
    return '';
}
function validateTextDescription(event) {
    const value = textDescription.value.trim();
    if (value.length > MAX_LENGTH_SYMBOL_DESCRIPTION) {
        textDescription.setCustomValidity('Максимум 140 символов');
        event.preventDefault()
    }
    textDescription.setCustomValidity('');
}
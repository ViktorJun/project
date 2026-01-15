import {scale, SCALE_STEP} from "./variables.js";

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const effectOriginal = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const imagePreview = document.querySelector('.img-upload__preview img');
const uploadEffectLevel = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
let resultValue = document.querySelector('.effect-level__value').value;

export function openUploadFile(){
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadEffectLevel.classList.add('hidden');
}
export function handlerScale(event) {
    const target = event.target;
    const value = +scaleValue.value.slice(0, -1);
    if (target === scaleSmaller){
        const resultValue = Math.max(scale.min, value - SCALE_STEP);
        imagePreview.style.transform = `scale(${resultValue / 100})`;
        return scaleValue.value = `${resultValue}%`;
    }else if (target === scaleBigger){
        const resultValue = Math.min(scale.max, value + SCALE_STEP);
        imagePreview.style.transform = `scale(${resultValue / 100})`;
        return scaleValue.value = `${resultValue}%`;
    }
}
export function handlerEffects(event) {
    const target = event.target;
    if (!target.classList.contains('effects__radio')) return;
    imagePreview.className = '';
    slider.noUiSlider.set([100]);
    switch (target.value) {
        case effectOriginal.value:
            uploadEffectLevel.classList.add('hidden');
            imagePreview.style.filter = ``;
            break
        case effectChrome.value:
            imagePreview.classList.add('effects__preview--chrome');
            uploadEffectLevel.classList.remove('hidden');
            break
        case effectSepia.value:
            imagePreview.classList.add('effects__preview--sepia');
            uploadEffectLevel.classList.remove('hidden');
            break
        case effectMarvin.value:
            imagePreview.classList.add('effects__preview--marvin');
            uploadEffectLevel.classList.remove('hidden');
            break
        case effectPhobos.value:
            imagePreview.classList.add('effects__preview--phobos');
            uploadEffectLevel.classList.remove('hidden');
            break
        case effectHeat.value:
            imagePreview.classList.add('effects__preview--heat');
            uploadEffectLevel.classList.remove('hidden');
            break
    }
}
export function handlerSlider() {
    const value = slider.noUiSlider.get();
    const effect = document.querySelector ('.effects__radio:checked').value;
    resultValue = `${value}`;
    switch (effect){
        case effectChrome.value:
            imagePreview.style.filter = `grayscale(${value / 100})`;
            break
        case effectSepia.value:
            imagePreview.style.filter = `sepia(${value / 100})`;
            break
        case effectMarvin.value:
            imagePreview.style.filter = `invert(${value}%)`;
            break
        case effectPhobos.value:
            imagePreview.style.filter = `blur(${(value * 3) / 100}px)`;
            break
        case effectHeat.value:
            imagePreview.style.filter = `brightness(${1 + (value * 2) / 100})`;
            break
    }
}
noUiSlider.create(slider, {
    start: [100],
    connect: 'lower',
    step: 1,
    tooltips: [
        {to: function (value) {return Math.trunc(value)}}
    ],
    range: {
        'min': 0,
        'max': 100
    }
});
export function resetUploadFile() {
    scaleValue.value = `${scale.max}%`;
    imagePreview.style.transform = `scale(1)`;
    imagePreview.style.filter = ``;
    imagePreview.className = '';
    slider.noUiSlider.set([100]);
    resultValue = 0;
}

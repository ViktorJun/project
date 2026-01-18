import {mockData} from "./main.js";
import {createArrayPhotos, renderFragmentDOM} from "./renderPictures.js";
import {getRandomNumber} from "./functions.js";
import {COUNT_RANDOM_PICTURE, containerForPhoto} from "./variables.js";

const filterContainer = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterContainerForm = document.querySelector('.img-filters__form');
const filterTitle = document.querySelector('.img-filters__title');

export function showFilters() {
    filterContainer.classList.remove('img-filters--inactive');
    filterTitle.classList.remove('visually-hidden');
}
function debounce(func, timeout = 500){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), timeout);
    };
}
const debouncedApplyFilter = debounce((type) => {
    switch (type) {
        case 'default':
            applyDefaultFilter();
            break;
        case 'random':
            applyRandomFilter();
            break;
        case 'discussed':
            applyDiscussedFilter();
            break;
    }
}, 500);
export function filterButtons(event) {
    const target = event.target;
    if (target === filterDefault){
        debouncedApplyFilter('default');
    }
    if (target === filterRandom){
        debouncedApplyFilter('random');
    }
    if (target === filterDiscussed){
        debouncedApplyFilter('discussed');
    }
    if (target.classList.contains('img-filters__button')){
        filterContainerForm.querySelectorAll('.img-filters__button').forEach(element => {
            element.classList.remove('img-filters__button--active');
        });
        target.classList.add('img-filters__button--active');
    }
}
function clearAllImages() {
    containerForPhoto.querySelectorAll('.picture').forEach(el => el.remove());
}
function applyDefaultFilter() {
    clearAllImages();
    const resultArray = createArrayPhotos(mockData);
    renderFragmentDOM(resultArray);
}
function applyRandomFilter() {
    clearAllImages();
    const usedIndexes = new Set();
    const randomArray = new Array(COUNT_RANDOM_PICTURE).fill(null).map(() => {
        let randomNumb = getRandomNumber(0, mockData.length - 1);
        while (usedIndexes.has(randomNumb)) {
            randomNumb = getRandomNumber(0, mockData.length - 1);
        }
        usedIndexes.add(randomNumb);
        return mockData[randomNumb];
    });
    const resultArray = createArrayPhotos(randomArray);
    renderFragmentDOM(resultArray);
}
function applyDiscussedFilter() {
    clearAllImages();
    const discussedArray = [...mockData].sort((a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0));
    const resultArray = createArrayPhotos(discussedArray);
    renderFragmentDOM(resultArray);
}
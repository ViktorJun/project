import {getRandomNumber, getRandomString} from "./functions.js";
import * as variables from "./variables.js";

export function createMockData(count = 25) {
    if (count <= 0){
        throw new Error('Count должен быть больше 0');
    }
    return new Array(count).fill(undefined).map((_, index)=>{
        return {
            id: index + 1,
            url: `photos/${index + 1}.jpg`,
            description: getRandomString(variables.arrayDescription),
            likes: getRandomNumber(variables.likes.min, variables.likes.max),
            comments: getRandomComments()
        }
    });
}
function getRandomComments() {
    const randomNumberComments = getRandomNumber(variables.numbComments.min, variables.numbComments.max);
    if (randomNumberComments === 0) {
        return null;
    }else {
        return new Array(randomNumberComments).fill(undefined).map(()=>{
            return {
                id: Date.now(),
                avatar: getRandomAvatar(),
                message: createRandomMessage(),
                name: getRandomString(variables.arrayName)
            };
        });
    }
}
function getRandomAvatar() {
    return `img/avatar-${getRandomNumber(variables.avatar.min, variables.avatar.max)}.svg`
}
function createRandomMessage() {
    let firstPartLine = getRandomString(variables.arrayMessage);
    let secondPartLine = getRandomString(variables.arrayMessage);

    while (firstPartLine === secondPartLine){
        firstPartLine = getRandomString(variables.arrayMessage);
        secondPartLine = getRandomString(variables.arrayMessage);
    }
    if(firstPartLine === variables.arrayMessage[0] || secondPartLine === variables.arrayMessage[0]){
        return variables.arrayMessage[0];
    }else {
        return `${firstPartLine} ${secondPartLine}`;
    }
}


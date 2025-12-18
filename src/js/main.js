export function getMockData(count = 25) {
    if (count <= 0){
        throw new Error('Count должен быть больше 0');
    }
    return new Array(count).fill(undefined).map((_, index)=>{
        return {
            id: index + 1,
            url: `photos/${index + 1}.jpg`,
            description: getRandomDescription(),
            likes: Math.floor(Math.random() * 186) + 15,
            comments: getRandomComments()
        }
    });
}

function getRandomDescription() {
    const arrayDescription = [
        'Фотографія з красивим заходом сонця над гори.',
        'Веселий момент на святковій вечірці.',
        'Тиха річка в лісі в ранковому тумані.',
        'Сімейна фотосесія на пляжі під час відпустки.',
        'Кіт, який заснув в найнеочікуванішому місці.',
        'Молоді пари, що гуляють по місту в осінній день.',
        'Маленький собака бігає по зеленій галявині.',
        'Група друзів на пікніку, що сміються і обідають разом.',
        'Вечірній міський пейзаж з яскравими вогнями вулиць.',
        'Фотографія квітів, що розцвітають у весняному саду.'
    ];
    const randomDescription = Math.floor(Math.random() * 10);
    return arrayDescription[randomDescription]
}

function getRandomComments() {
    const randomNumberComments = Math.floor(Math.random() * 3) + 1;
    return new Array(randomNumberComments).fill(undefined).map(()=>{
        return {
            id: Date.now(),
            avatar: getRandomAvatar(),
            message: getRandomMessage(),
            name: getRandomName()
        };
    });
}

function getRandomAvatar() {
    return `img/avatar-${Math.floor(Math.random() * 6) + 1}.svg`
}

function getRandomMessage() {
    const arrayMessage = [
        'Все відмінно!',
        'Загалом все непогано. Але не всі.',
        'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
        'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
        'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
        'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?'
    ];
    const firstPartLine = Math.floor(Math.random() * 6);
    const secondPartLine = Math.floor(Math.random() * 6);
    if (firstPartLine === 1 || firstPartLine === secondPartLine){
        return arrayMessage[firstPartLine];
    }else {
        return `${arrayMessage[firstPartLine]} ${arrayMessage[secondPartLine]}`;
    }
}

function getRandomName() {
    const arrayName = [
        'Андрей',
        'Руслан',
        'Николай',
        'Василий',
        'Роман',
        'Виктор',
        'Игорь',
        'Виталий',
        'Александр',
        'Даниил'
    ];
    const randomName = Math.floor(Math.random() * 10);
    return arrayName[randomName];
}

console.log(getMockData())
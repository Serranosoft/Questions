export function createObjectFromArray(strings) {
    const objectArray = strings.map((value, index) => ({
        id: index,
        question: value,
    }));

    return objectArray;
}

export function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function getRandomObjectFromArray(array) {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error("El argumento debe ser un array no vacío.");
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
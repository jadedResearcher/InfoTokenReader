export const getRandomNumberBetween =(min: number, max:number) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomElementFromArray=(array: any[])=>{
    return array[getRandomNumberBetween(0, array.length -1)];
}
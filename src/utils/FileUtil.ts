import SeededRandom from './SeededRandom';

export default class FileUtil{
    rand: SeededRandom;

    constructor(rand: SeededRandom) {
        this.rand = rand;
    }

}
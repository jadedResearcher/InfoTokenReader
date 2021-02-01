export interface FileCallback {
    (word_list: string[],pic_list: string[],sound_list: string[]): void;

}

export interface Action {
    (): void;
}
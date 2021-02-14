export interface FileCallback {
    (word_list: string[],pic_list: string[],sound_list: string[], search_term_list: string[]): void;

}

export interface Action {
    (): void;
}
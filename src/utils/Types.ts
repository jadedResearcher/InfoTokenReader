export interface Callback {
    (message: string): void;
}

export interface Action {
    (): void;
}
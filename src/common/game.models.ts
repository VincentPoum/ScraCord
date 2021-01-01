export interface IGame {
    boards: IBoard[];

}

export interface IBoard {
    id: number;
    cases: ICase[];
    size: number;
    users: IUser[];
}

export interface ICase {
    index: number;
    type: ICaseType;
    letter?: LetterType;
}

export type LetterType = string[0];

export type ICaseType = 'mct' | 'mcd' | 'letter';
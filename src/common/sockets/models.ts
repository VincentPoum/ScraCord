import { LetterType } from "../game.models";

export interface IAddLetterToCase {
    user: IUser;
    boardId: number;
    caseIndex: number;
    letter: LetterType;
}
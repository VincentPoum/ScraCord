import { getCaseType } from "./case";
import { IBoard, ICase, IGame } from "./game.models";

export function getNewBoard(creator: IUser): IBoard {

    const size = 15;
    const cases: ICase[] = [];

    for (let i = 0; i < size * size; i += 1) {
        cases.push({ type: getCaseType(i), index: i });
    }
    return { cases, size, users: [creator], id: Date.now() };
}

export function getMyBoards(game: IGame, user: IUser) {
    return game.boards.filter(b => b.users.find(({ id }) => id === user?.id));
}

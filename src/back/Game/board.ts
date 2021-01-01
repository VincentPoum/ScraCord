import { saveGame } from "../../common/game";
import { IGame } from "../../common/game.models";
import { IAddLetterToCase } from "../../common/sockets/models";

export function addLetterToCase(game: IGame, data: IAddLetterToCase) {
    const { boardId, caseIndex, letter } = data;
    const board = getBoardFromGame(game, boardId);
    if (board) {
        board.cases[caseIndex].letter = letter;
    }
    saveGame(game)
    return board;
}

function getBoardFromGame(game: IGame, boardId: number) {
    return game.boards.find(b => b.id === boardId);
}
import { existsSync, readFileSync, writeFileSync } from "fs";
import { getNewBoard } from "./board";
import { IGame } from "./game.models";

export function addNewBoardToGame(game: IGame, creator: IUser) {
    const board = getNewBoard(creator);
    game.boards.push(board);
    board.cases[24].letter = 'B';
    saveGame(game);
    return board;
}

function getNewGame(): IGame {
    return { boards: [] };
}

const gameJsonFilePath = 'game.json';

export function saveGame(game: IGame) {
    writeFileSync(gameJsonFilePath, JSON.stringify(game, undefined, 4));
}

export function createOrLoadGame(): IGame {
    if (existsSync(gameJsonFilePath)) {
        const content = JSON.parse(readFileSync(gameJsonFilePath, 'utf8'));
        return content;
    }
    const game = getNewGame();
    saveGame(game);
    return game;
}
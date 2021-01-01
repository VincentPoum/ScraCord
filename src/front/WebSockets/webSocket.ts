import * as ioLib from 'socket.io-client';
import { IBoard } from '../../common/game.models';
import { IAddLetterToCase } from '../../common/sockets/models';


export const socket = ioLib.io();
socket.connect();

var appCache = window.applicationCache;
appCache.update();

export function createNewBoard(creator: IUser) {
    return new Promise(r => {
        socket.emit('createNewBoard', creator, (board: IBoard) => {
            r(board);
        })

    })
}

export function addLetterToCase(data: IAddLetterToCase): Promise<IBoard> {
    return new Promise(r => {
        socket.emit('addLetterToCase', data, (board: IBoard) => {
            r(board);
        })
    })
}

export function getUser(id: number): Promise<IUser> {
    return new Promise(r => {
        socket.emit('getUser', id, (user: IUser) => {
            r(user);
        })
    })
}

export function getMyBoards(user: IUser): Promise<IBoard[]> {
    return new Promise(r => {
        socket.emit('getMyBoards', user, (boards: IBoard[]) => {
            r(boards);
        })
    })
}

export function getBoard(id: number): Promise<IBoard> {
    return new Promise(r => {
        socket.emit('getBoard', id, (board: IBoard) => {
            r(board);
        })
    })
}


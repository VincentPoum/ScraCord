
import express from "express";
import compression from "compression";
import { createServer } from "http";
import * as ioLib from "socket.io";
import { addNewBoardToGame } from "../common/game";
import { getMyBoards } from "../common/board";
import { users } from "../common/users/users";
import { IBoard, IGame } from "../common/game.models";
import { IAddLetterToCase } from "../common/sockets/models";
import { addLetterToCase } from "./Game/board";

export function expressServer(game: IGame) {
    const app = express();
    app.use(express.static('dist/front', { maxAge: 0 }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(compression());

    const port = process.env.PORT || 3000;
    const server = createServer(app);
    server.listen(port, () => console.log(`🚀 Surfy for iot ready with https on port ${port}!`));

    const io = new ioLib.Server(server);


    io.on("connection", (socket) => {
        console.log("socket.io".blue, "a user connected", socket.id);
        socket.on("disconnect", () => {
            console.log("socket.io".blue, "a user disconnected", socket.id);
        });

        socket.on("createNewBoard", (creator: IUser, cb: (c: IBoard) => void) => {
            const board = addNewBoardToGame(game, creator);
            return cb(board);
        })

        socket.on("getMyBoards", (user: IUser, cb: (boards: IBoard[]) => void) => {
            cb(getMyBoards(game, user));
        });

        socket.on("getUser", (userId: number, cb: (user?: IUser) => void) => {
            cb(users.find(({ id }) => userId === id));
        });

        socket.on("getBoard", (boardId: number, cb: (board?: IBoard) => void) => {
            cb(game.boards.find(({ id }) => boardId === id));
        });

        socket.on('addLetterToCase', async (data: IAddLetterToCase, cb: (board: IBoard) => void) => {
            const board = await addLetterToCase(game, data);
            if (board) {
                cb(board);
            }
        })

    });

    app.get('/', (req, res) => {
        res.end(true);
    })
}


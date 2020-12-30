
import express from "express";
import compression from "compression";
import { createServer } from "http";
import * as ioLib from "socket.io";

export function expressServer() {
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
        socket.on("add", (a: number, cb: (a: number) => void) => {
            return cb(a + 1);
        })
    });

    app.get('/', (req, res) => {
        res.end(true);
    })
}
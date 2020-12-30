
import express from "express";
import compression from "compression";
import { createServer } from "http";

export function expressServer() {
    const app = express();
    app.use(express.static('dist/front', { maxAge: 0 }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(compression());

    const port = process.env.PORT || 3000;
    const server = createServer(app);
    server.listen(port, () => console.log(`🚀 Surfy for iot ready with https on port ${port}!`));

    // app.get('*', function (req, res) {
    //     const r = resolve('dist/front/index.html');
    //     res.sendFile(r);
    // });

    app.get('/', (req, res) => {
        res.end(true);
    })
}
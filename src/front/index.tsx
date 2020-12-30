import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ioLib from 'socket.io-client';
import { IC } from "../common/models";


ReactDOM.render(
    <Application />,
    document.getElementById("root")
);

const socket = ioLib.io();
socket.connect();


function addWithSocket(c: IC, setC: (c: IC) => void) {
    socket.emit('add', c, setC);
}


function Application() {
    // const [a, setA] = React.useState<number>(0);
    // const [b, setB] = React.useState<number>(0);
    const [c, setC] = React.useState<IC | undefined>();
    React.useEffect(() => {
        const c23 = { n: 7, str: 'salut', b: false, m: (n: number) => n * 2 };
        addWithSocket(c23, setC);
    }, [])

    if (!c) {
        return null;
    }
    return <div>{c.n}</div>

    // return <div>SCRABBY ! ({a})</div>
}


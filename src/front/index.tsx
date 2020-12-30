import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ioLib from 'socket.io-client';



ReactDOM.render(
    <Application />,
    document.getElementById("root")
);

const socket = ioLib.io();
socket.connect();

function Application() {

    const [a, setA] = React.useState<number>(0);
    React.useEffect(() => {
        socket.emit('add', 1, setA);
    }, [])


    return <div>SCRABBY ! ({a})</div>
}


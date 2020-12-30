import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ioLib from 'socket.io-client';



ReactDOM.render(
    <Application />,
    document.getElementById("root")
);

function Application() {
    return <div>SCRABBY !</div>
}

const socket = ioLib.io();
socket.connect();
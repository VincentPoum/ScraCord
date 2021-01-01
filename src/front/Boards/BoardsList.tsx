import React from "react";
import { useEffect, useState } from "react";
import { createNewBoard, getMyBoards } from "../WebSockets/webSocket";
import { Link } from 'react-router-dom'
import { IBoard } from "../../common/game.models";

export function BoardList(props: { currentUser: IUser }) {
    const { currentUser } = props;
    const [boards, setBoards] = useState<IBoard[]>([]);
    useEffect(() => {
        getMyBoards(currentUser).then(setBoards);
    }, []);
    return <div>
        <button onClick={async () => {
            await createNewBoard(currentUser);
            getMyBoards(currentUser).then(setBoards);
        }} >créer une partie</button>
        {boards.length > 0 && <ul>
            {boards.map(b => <BoardListItem key={b.id} board={b} />)}
        </ul>}
    </div>
}

function BoardListItem(props: { board: IBoard }) {
    const { board } = props;
    return <li><Link to={`/boards/${board.id}`}>{board.id} [{board.users.map(u => u.name).join(', ')}]</Link></li>
}
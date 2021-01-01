import React from "react";
import { useRecoilState } from "recoil";
import { BoardList } from "../Boards/BoardsList";
import { currentUserAtom, Login } from "./Login";

export function Home() {
    const [user, setUser] = useRecoilState(currentUserAtom);
    if (!user) {
        return <Login />;
    }
    return <div>
        <div>Salut {user?.name} <button onClick={() => { setUser(undefined) }}>déconnecter</button></div>
        <BoardList currentUser={user} />
    </div>
}
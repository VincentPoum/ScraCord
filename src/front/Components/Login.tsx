import React, { useEffect, useState } from "react"
import { atom, useRecoilState } from "recoil"
import { localStorageEffect } from "../Recoil/localstorage";
import { getUser } from "../WebSockets/webSocket";

export const currentUserAtom = atom<IUser | undefined>({
    key: 'currentUser',
    default: undefined,
    effects_UNSTABLE: [localStorageEffect()]
})
export function Login() {
    const [id, setId] = useState<number | null>(null);
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    useEffect(() => {
        if (id) {
            getUser(id).then(user => {
                if (user) {
                    setCurrentUser(user);
                }
            })
        }
    }, [id])
    return <div>
        identifiant : <input
            style={{ backgroundColor: currentUser ? 'white' : 'red' }}
            onChange={(e) => {
                setId(parseInt(e.target.value, 10));
            }} />
    </div>
}
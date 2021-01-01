import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../Components/Loader";
import { addLetterToCase, getBoard } from "../WebSockets/webSocket";
import { IBoard, ICase, LetterType, ICaseType } from "../../common/game.models";
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { atomFamily, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserAtom } from "../Components/Login";
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import * as modernizr from 'modernizr';

const boards = atomFamily<IBoard | undefined, number>({
    key: 'boards',
    default: undefined
})
export function BoardRouter() {
    const { id: idString } = useParams();
    const id = parseInt(idString, 10);
    const [board, setBoard] = useRecoilState(boards(id));
    useEffect(() => {
        getBoard(id).then(setBoard);
    }, [id])
    return board ? <Board board={board} /> : <Loader />;
}

const caseSize = 20;
export function Board(props: { board: IBoard }) {
    const { board } = props;
    const backend = modernizr.touchevents ? TouchBackend : HTML5Backend;
    return <div>
        <div>touch:{modernizr.touchevents}</div>
        <DndProvider backend={backend}>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: (caseSize + 2) * board.size + board.size }}>{board.cases.map((c, i) => <Case boardId={board.id} key={i} value={c} />)}</div>
            <Letter letter="A" />
        </DndProvider>
    </div>
}

type DropType = 'NOTHING' | 'LETTER';

function Case(props: { value: ICase, boardId: number }) {
    const { value, boardId } = props;
    const user = useRecoilValue(currentUserAtom);
    const setBoard = useSetRecoilState(boards(boardId));

    const [{ canDrop, isOver }, dropRef] = useDrop({
        accept: value.letter ? 'NOTHING' : 'LETTER',
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        }),
        drop: async (item: { type: DropType, letter: LetterType }, monitor) => {
            const { letter } = item;
            if (user) {
                const board = await addLetterToCase({ user, boardId, caseIndex: value.index, letter });
                setBoard(board);
            }
            return undefined
        },
    })

    const backgroundColor = getCaseBackgroundColor(value.type);
    const borderColor = canDrop && isOver ? 'green' : '#efefef'

    return <div
        ref={dropRef}
        id={`case|${value.index}`}
        data-id={value.index}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderColor, backgroundColor, minWidth: caseSize, height: caseSize }} >
        {value.letter}
    </div>;
}

function Letter(props: { letter: LetterType }) {
    const { letter } = props;
    const [{ isDragging, fontSize }, dragRef] = useDrag({
        item: { type: 'LETTER', letter },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            fontSize: monitor.isDragging() ? 24 : 14
        })
    })
    if (isDragging) {
        return <div ref={dragRef} />
    }
    return <div ref={dragRef} style={{
        fontSize: fontSize,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #efefef',
        width: caseSize,
        height: caseSize
    }}>{letter.toUpperCase()}</div>;
}


function getCaseBackgroundColor(type: ICaseType) {
    switch (type) {
        case 'mcd':
            return 'red';
        case 'mct':
            return 'blue';
        default:
            return 'transparent';
    }
}
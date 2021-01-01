import { ICaseType } from "./game.models";


const caseTypes = {
    mct: [1, 4],
    mcd: [3, 5]
}
export function getCaseType(index: number): ICaseType {
    const { mcd, mct } = caseTypes;
    if (mcd.includes(index)) {
        return 'mcd';
    }
    if (mct.includes(index)) {
        return 'mct';
    }
    return 'letter';
}

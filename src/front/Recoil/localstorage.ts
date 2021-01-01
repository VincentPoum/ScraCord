import { DefaultValue } from "recoil";

type OnSetType<T> = (
    param: (newValue: T | DefaultValue, oldValue: T | DefaultValue) => void,
) => void;
type SetStateType<T> = (param:
    | T
    | DefaultValue
    | Promise<T | DefaultValue>
    | ((param: T | DefaultValue) => T | DefaultValue),
) => void;

interface A<T> {
    onSet: OnSetType<T>;
    setSelf: SetStateType<T>;
    node: {
        key: string;
    }
}export const localStorageEffect = <T>(key?: string) => (atomEffect: A<T>) => {
    const { onSet, setSelf, node } = atomEffect;
    const lsKey = key ? `${key}-${node.key}` : node.key;
    const { localStorage } = window;
    if (localStorage) {
        const defaultValue = localStorage.getItem(lsKey);
        if (defaultValue) {
            setSelf(JSON.parse(defaultValue));
        }
        onSet((newValue: T) => {
            if (newValue === undefined) {
                localStorage.removeItem(lsKey);
            } else {
                localStorage.setItem(lsKey, JSON.stringify(newValue));
            }
        });
    }
};

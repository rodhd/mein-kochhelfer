import {atom} from "recoil"

export const searchBarInputState = atom<string>({
    key: 'searchBarInput',
    default: ''
})
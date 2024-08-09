import { atom } from "recoil";
export const modalState = atom({
    key: 'modalState',
    default: false,
})

export const postIdState = atom({
    key: 'postIdState',
    default: '',
})

export const editProfile = atom({
    key: "editProfile",
    default: false,
})

export const profileState = atom({
    key: "profileState",
    default: {},
})
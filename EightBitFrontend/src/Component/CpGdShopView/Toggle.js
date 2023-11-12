import { atom } from "recoil";
import { useLayoutEffect } from "react";


export const toggle = atom
    (
        {
            key: "toggle",
            default: true,
        }

    )

export const toggle2 = atom
    (
        {
            key: "toggle2",
            default: true,
        }
    )


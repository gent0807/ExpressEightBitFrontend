import { atom } from "recoil";
import { useLayoutEffect } from "react";

export const work = atom
    (
        {
            key: "work",
            default: "find",
        }
    )
import { atom } from "recoil";
import { useLayoutEffect } from "react";

export const isDark = atom
    (
        {
            key: "isDark",
            default: localStorage.getItem("mode") === "false" ? false : true,
        }

    )

export const firstReset = atom
    (
        {
            key: "firstReset",
            default: false,
        }
    )
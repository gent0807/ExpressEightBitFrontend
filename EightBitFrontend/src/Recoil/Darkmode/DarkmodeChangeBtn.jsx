import { useRecoilState } from "recoil";
import { useState, useRef, useEffect } from "react";
import { isDark } from "./Darkmode";
import { styled, keyframes } from "styled-components";
import { icons } from "react-icons/lib";
import { BsSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import Dark from "../../Item/img/Darkmode/dark.png";
import light from "../../Item/img/Darkmode/light.png";

const Darkmode = () => {

    const [Darkmode, setDarkmode] = useRecoilState(isDark);
    const [stateSunDarkMode, setstateSunDarkMode ] = useState(true);
    const [stateMoonDarkMode, setstateMoonDarkMode ] = useState(true);

    const ToggleBtn = () => {
        setDarkmode((prev) => !prev);

        localStorage.setItem("mode", String(!Darkmode));

        if(Darkmode === false)
        {
            setstateSunDarkMode(true);
            setstateMoonDarkMode(false);
        }else{
            setstateSunDarkMode(false);
            setstateMoonDarkMode(true);
        }
    };

    const [WindowLength, setWindowLength] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowLength(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    })

    useEffect(() => {
       if ( WindowLength <= 1343)
       {
            if(Darkmode === false)
            {
                setstateSunDarkMode(true);
                setstateMoonDarkMode(false);
            }else{
                setstateSunDarkMode(false);
                setstateMoonDarkMode(true);
            }
       }
       
    }, [WindowLength])

    return (
        <IconsBox change={Darkmode} onClick={ToggleBtn}>
            <Icons Move={Darkmode} stateSunDarkMode={stateSunDarkMode} stateMoonDarkMode={stateMoonDarkMode} />
            <IconsAllBox>
                <SunIcon Opacity={Darkmode}><BsSunFill /></SunIcon>
                <MoonIcon Opacity={Darkmode}><BsFillMoonFill /></MoonIcon>
            </IconsAllBox>
        </IconsBox>
    );

}

export default Darkmode;

const IconsBox = styled.div
    `
    cursor: pointer;
    background: ${props => props.change ? "rgba(55,65,118,1)" : "rgba(0,144,249,1)" };
    border-radius: 42px;
    padding: 5px;
    width: 50px;
    height: 20px;
    margin: 0px 10px 0px 10px;
    -webkit-tap-highlight-color:transparent;
    transition: background 0.5s;
`

const IconsAllBox = styled.div
    `
    display: flex;
    flex-direction: row;
    margin: 2px 0px 0px 4px;
`

const IconOpacityUp = keyframes
    `
    0%
    {
        opacity: 100%;
    100%
    {
        opacity: 0%;
    }
`

const IconOpacityDown = keyframes
    `
    0%
    {
        opacity: 0%;
    100%
    {
        opacity: 100%;
    }
`

const SunIcon = styled.i
    `
    color: yellow;
    font-size:16px;
    margin: 0px 10px 0px 0px;
    opacity: ${props => props.Opacity ? "0%" : "100%"};
    animation: ${props => props.Opacity ? IconOpacityUp : IconOpacityDown} 0.4s;
    `
    
    const MoonIcon = styled.i
    `
    font-size:16px;
    opacity: ${props => props.Opacity ? "100%" : "0%"};
    animation: ${props => props.Opacity ? IconOpacityDown : IconOpacityUp } 0.4s;
`

const IconLeft = keyframes
    `
    0%
    {
        margin-left: 30px;
    100%
    {
        margin-left: 0px;
    }
`

const IconRightDefalut = keyframes
    `
    0%
    {
        margin-left: 30px;
    100%
    {
        margin-left: 30px;
    }
`

const IconRight = keyframes
    `
    0%
    {
        margin-left: 0px;
    100%
    {
        margin-left: 30px;
    }
`

const IconLeftDefalut = keyframes
    `
    0%
    {
        margin-left: 0px;
    100%
    {
        margin-left: 0px;
    }
`

const Icons = styled.div
    `
    position: absolute;
    animation: ${props => props.Move ? props => props.stateMoonDarkMode ? IconLeftDefalut : IconLeft : props => props.stateSunDarkMode ? IconRightDefalut : IconRight } 0.4s;
    margin-left: ${props => props.Move ? "0px" : "30px"};
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: white;
    -webkit-user-select: none;
    z-index: 1;
`


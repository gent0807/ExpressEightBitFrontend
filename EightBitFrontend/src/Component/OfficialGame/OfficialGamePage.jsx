import { useState, useEffect, useRef, useCallback, FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import OfficialGameMainImg from './OfficialGameMainImg';
import { Slide } from "../Game";

const OfficialGamePage = () => {

    const { contentType } = useParams();
    const [Games, setGames] = useState(Slide);

    useEffect(() => {
        setGames(Slide.filter((Game) => Game.game === "공식게임"))
    }, [Slide]);

    const ScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <OfficialGameAllBox>
            <OfficialGameBox>
                <OfficialGame1>
                    <Link to={`/Game/${Games[0].developer}/${Games[0].regdate}/${contentType}`} onClick={() => ScrollTop()}>
                        <OfficialGame1imgBox>
                            <OfficialGameImg src={Games[0].thumbnailImg} />

                            <OfficialGame1InformaitonBox />

                        </OfficialGame1imgBox>
                    </Link>
                </OfficialGame1>

                <OfficialGame2>
                    <Link to={`/Game/${Games[1].developer}/${Games[1].regdate}/${contentType}`} onClick={() => ScrollTop()}>
                        <OfficialGame2imgBox>
                            <OfficialGameImg src={Games[1].thumbnailImg} />

                            <OfficialGame2InformaitonBox />

                        </OfficialGame2imgBox>
                    </Link>
                </OfficialGame2>

                <OfficialGame3>
                    <Link to={`/Game/${Games[2].developer}/${Games[2].regdate}/${contentType}`} onClick={() => ScrollTop()}>
                        <OfficialGame3imgBox>
                            <OfficialGameImg src={Games[2].thumbnailImg} />

                            <OfficialGame3InformaitonBox />

                        </OfficialGame3imgBox>
                    </Link>
                </OfficialGame3>

            </OfficialGameBox>

            <GradientBox />

        </OfficialGameAllBox>
    );
}

export default OfficialGamePage;

const GradientBox = styled.div
`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50vw;
    z-index: 999;
    pointer-events: none; 
    background-image: linear-gradient(to top, rgba(25,25,25,1) -1%, transparent 30%);

    @media (min-width:250px) and (max-width:750px)
    {
        display: none;
    }
`

const OfficialGame1InformaitonBox = styled.div
    `
    position: absolute;
    width: 33.4vw;
    height: 100%;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    transition: opacity 0.5s ease;
    opacity: 1;

    @media (min-width:250px) and (max-width:750px)
    {
        display: none;
    }
`

const OfficialGame2InformaitonBox = styled.div
    `
    position: absolute;
    width: 33.4vw;
    height: 100%;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    transition: opacity 0.5s ease;
    opacity: 1;

    @media (min-width:250px) and (max-width:750px)
    {
        display: none;
    }
`

const OfficialGame3InformaitonBox = styled.div
    `
    position: absolute;
    width: 33.4vw;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    transition: opacity 0.5s ease;
    opacity: 1;

    @media (min-width:250px) and (max-width:750px)
    {
        display: none;
    }
`
const OfficialGameImg = styled.img
    `
    width: 100%;
    height: 100%;d
    transform: scale(1);
    transition: transform 0.5s;
`


const OfficialGame1 = styled.div
    `
    width: 100%;
    height: 50vw;
    overflow: hidden;
    cursor: pointer;
    a{
            text-decoration: none;
        }
    &:hover{
        ${OfficialGame1InformaitonBox}{
            transition: opacity 0.5s ease;
            opacity: 0;
        }
        ${OfficialGameImg}{
            transform: scale(1.1);
            transition: transform 0.5s;
        }
    }

    @media (min-width:250px) and (max-width:750px)
    {
        height: 100%;
    }

    `

const OfficialGame2 = styled(OfficialGame1)
    `
    &:hover{
        ${OfficialGame2InformaitonBox}{
            transition: opacity 0.5s ease;
            opacity: 0;
        }
        ${OfficialGameImg}{
            transform: scale(1.1);
            transition: transform 0.5s;
    }
    `

const OfficialGame3 = styled(OfficialGame1)
    `
    &:hover{
        ${OfficialGame3InformaitonBox}{
            transition: opacity 0.5s ease;
            opacity: 0;
        }
        ${OfficialGameImg}{
            transform: scale(1.1);
            transition: transform 0.5s;
    }
    `

const OfficialGameAllBox = styled.div
    `
    
    `

const OfficialGameBox = styled.div
    `
        display: flex;
        position: relative;
        background: rgba(25,25,25,1);

        @media (min-width:250px) and (max-width:750px)
        {
            flex-direction: column;
        }
    `


const OfficialGame1imgBox = styled.div
    `
        position: relative;
    `

const OfficialGame2imgBox = styled.div
    `
        position: relative;
    `

const OfficialGame3imgBox = styled.div
    `
         position: relative;
    `




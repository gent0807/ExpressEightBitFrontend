import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import Article from "./Article";
import { styled } from "styled-components";



let Containerbox = styled.div
`
    margin: 0 auto;
    max-width: 1280px;
    min-height: 1000px;
    padding: 267px 0px 154px 0px;
    color: ${props=>props.theme.textColor};
    transition: background 0.5s;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 358px 0px 54px 0px;
    }
`

const ArticleContainer = () => {

    return (
        <Containerbox>
            <Article/>
        </Containerbox>
    );
}

export default ArticleContainer;

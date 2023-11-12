import NotPage from "./NotPage";
import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";

const Containerbox = styled.div`
    margin: 0 auto;
    max-width: 1280px;
    min-height: 1000px;
    padding: 267px 0px 54px 0px;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 358px 0px 54px 0px;
    }
`

const NotPageContainer = () => {
    return (
        <Containerbox>
            < NotPage/>
        </Containerbox>
    );
}

export default NotPageContainer;

import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
const ip = localStorage.getItem("ip");


const CpGdShopMainImg = ({ id, src }) => {

    return (
        <MainImg src={src} alt="상품 이미지" />
    );

}

export default CpGdShopMainImg;

const MainImg = styled.img
`
    width: 100%;
    height: 100%;
`
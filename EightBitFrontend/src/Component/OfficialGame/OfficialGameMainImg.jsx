
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
const ip = localStorage.getItem("ip");


const OfficialGameMainImg = ({ uploader, regdate, contentType, storeType, depth }) => {

    const [id, setId] = useState("");

    useEffect(() => {

        const getFileList = async (uploader, regdate, contentType, storeType, depth) => {
            await axios.get(`${ip}/Files/files/${uploader}/${regdate}/${contentType}/${storeType}/${depth}`, {

            }, {

            })
                .then(res => {
                    return res.data
                })
                .then(data => {
                    console.log(data);
                    setId(data[0].id);
                    uploader=data[0].uploader;
                    regdate=data[0].regdate;
                    contentType=data[0].contentType;
                    storeType=data[0].storeType;
                    depth=data[0].depth;
                })
        }

        getFileList(uploader, regdate, contentType, storeType, depth);
        
    });

    


    return (
        <OfficialGameImg src={`${ip}/Files/file/${id}/${uploader}/${regdate}/${contentType}/${storeType}/${depth}`} alt="게임 이미지" />
    );

}

export default OfficialGameMainImg;

const OfficialGameImg = styled.img
    `
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 0.5s;
`
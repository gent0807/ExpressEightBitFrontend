import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const WriterProfile = ({ writer }) => {
    const ip = localStorage.getItem("ip");

    /* useEffect(() => {
        const getUserProfileImagePath = (writer) => {
            axios.get(`${ip}/Users/profileImgPath?nickname=${writer}`, {

            },
                {

                })
                .then((res) => {
                    return res.data;
                })
                .then(data => {
                    setProfileImagePath(data.profileImgPath);
                })

        }

        getUserProfileImagePath(writer);
    }); */

    return (
        <Profile src={`${ip}/Users/profileImg/${writer}`} />
    );
}

export default WriterProfile;

const Profile = styled.img
`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    cursor: pointer;
`
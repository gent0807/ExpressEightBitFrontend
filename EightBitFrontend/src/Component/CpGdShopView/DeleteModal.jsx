import axios from "axios";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ setDeleteMode, deleteMode, regdate, writer, loginMaintain, userInfo, user }) => {
    const ip = localStorage.getItem("ip");
    const navigate = useNavigate();
    const [CompleteModal, setCompleteModal] = useState("");
    const [ismodalchange, setIsmodalchange] = useState(true);

    const Completehandle = () => {
        setDeleteMode(!deleteMode);
        setIsmodalchange(true);
        navigate("/FreeBoard");
    }

    const Sumbit = (e) => {

        e.preventDefault();

        axios.delete(`${ip}/Board/article/${writer}/${regdate}/${loginMaintain == "true" ? userInfo.role : user.role}`,
            {
                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
            })
            .then(res => {
                /* regenerateAccessTokenOrLogout(res, deleteArticle, e); */
                return res.data;
            })
            .then(data => {
                setIsmodalchange(false);
                setCompleteModal(
                    <CompleteModalBox>
                        <CompleteTextBox>
                            <CompleteText>삭제가 완료 되었습니다!</CompleteText>
                        </CompleteTextBox>
                        <CompleteBtnBox>
                            <CompleteBtn onClick={() => Completehandle()}>
                                <CompleteBtnText>확인</CompleteBtnText>
                            </CompleteBtn>
                        </CompleteBtnBox>
                    </CompleteModalBox>
                )
            });
    }

    return (
        <DeleteModalBackground OnOff={deleteMode}>
            <ReportModalAllBox ModalChange={ismodalchange}>
                <SubmitBox onSubmit={Sumbit}>
                    <ModalDeleteBtn
                        onClick={() => [setDeleteMode(!deleteMode)

                        ]}>
                        x
                    </ModalDeleteBtn>

                    <DeleteTextBox>
                        <DeleteText>정말로 삭제 하겠습니까?</DeleteText>
                    </DeleteTextBox>

                    <DeleleFormBtnBox type="button">
                        <DeleleFormBtn>
                            <DeleleFormText>삭제하기</DeleleFormText>
                        </DeleleFormBtn>
                    </DeleleFormBtnBox>
                </SubmitBox>
            </ReportModalAllBox>

            <>
                {ismodalchange ? "" : CompleteModal}
            </>
        </DeleteModalBackground>
    );
};

export default DeleteModal;

const ModalDeleteBtn = styled.div
    `
    font-size: 32px;
    cursor: pointer;
    display: flex;
    justify-content: end;
    padding: 9px 15px 0px 0px;
    color: black;
`

const DeleleFormText = styled.span
    `
    font-weight: bold;
    font-size: 16px;
    color: white;
`

const DeleleFormBtn = styled.button
    `
    display: flex;
    align-items: center;
    justify-content: center;
    background: #007aff;
    width: 100px;
    height: 50px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
`

const DeleleFormBtnBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const CompleteBtnText = styled.span
    `
    font-weight: bold;
    font-size: 16px;
    color: white;
`

const CompleteBtn = styled.div
    `
    display: flex;
    align-items: center;
    justify-content: center;
    background: #007aff;
    width: 100px;
    height: 50px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
`

const CompleteBtnBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const CompleteModalBox = styled.div
    `
    display: block;
    width: 560px;
    height: 240px;
    background: ${props => props.theme.backgroundColor};
    border-radius: 10px;
`

const CompleteTextBox = styled.div
    `
    display: flex;
    justify-content: center;
    padding: 57px;
`

const CompleteText = styled.span
    `
    font-size: 37px;
    font-weight: bold;
    color: white;
`

const DeleteTextBox = styled(CompleteTextBox)
    `
    padding: 30px 57px 49px 57px;
`

const DeleteText = styled(CompleteText)
    `
    color: black;
`


const SubmitBox = styled.form
    `

`

const ReportModalAllBox = styled.div
    `
    display: ${props => props.ModalChange ? "block" : "none"};
    width: 560px;
    height: 240px;
    background: white;
    border-radius: 10px;
`

const DeleteModalBackground = styled.div
    `
    display: ${props => props.OnOff ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(25,25,25,0.3);
    z-index: 99999;
`
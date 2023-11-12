import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled, { ThemeProvider } from "styled-components";

const GameReplyModal = ({
    setModalReplyCommentOnOff,
    ModalReplyCommentOnOff,
}) => {

    return (
        <DeleteModalBackground OnOff={ ModalReplyCommentOnOff}>
            <ReportModalAllBox>
                <ModalDeleteBtn
                    onClick={() => setModalReplyCommentOnOff(! ModalReplyCommentOnOff)}>
                    x
                </ModalDeleteBtn>

                <DeleteTextBox>
                    <DeleteText>댓글 내용을 입력해주세요!</DeleteText>
                </DeleteTextBox>

                <DeleleFormBtnBox

                >
                    <DeleleFormBtn
                        onClick={() => setModalReplyCommentOnOff(! ModalReplyCommentOnOff)}
                    >
                        <DeleleFormText>확인</DeleleFormText>
                    </DeleleFormBtn>
                </DeleleFormBtnBox>
            </ReportModalAllBox>
        </DeleteModalBackground>
    );
};

export default GameReplyModal;

const ModalDeleteBtn = styled.div
    `
    font-size: 32px;
    cursor: pointer;
    display: flex;
    justify-content: end;
    padding: 9px 15px 0px 0px;
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
`

const DeleteTextBox = styled(CompleteTextBox)
    `
    padding: 30px 57px 49px 57px;
`

const DeleteText = styled(CompleteText)
    `
    color: black;
`

const ReportModalAllBox = styled.div
    `
    display: block;
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
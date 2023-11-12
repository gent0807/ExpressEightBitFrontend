import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled, { ThemeProvider } from "styled-components";

const GameUploadMobileFileModal = ({
    setGameUploadMobileFileModalOnOff,
    GameUploadMobileFileModalOnOff,

    MobileExtensionCheck,
    MobileExtensionList,

    mobilefileSize,

    mobilefiles,

    MaxSize,

}) => {

    return (
        <FileCheckModalBackground OnOff={GameUploadMobileFileModalOnOff}>
            <FileCheckModalAllBox>
                <FileCheckBox>
                    <FileCheckText>
                        {
                            MobileExtensionList.indexOf(MobileExtensionCheck) === -1 || 
                            MobileExtensionCheck === "" ?
                            "파일 업로드가 불가한 파일입니다!" :
                            mobilefileSize > MaxSize ?
                            "파일은 2GB 이내로 업로드 가능합니다!" :
                            mobilefiles.length >= 1 ?
                            "하나의 파일만 업로드 해주세요!" : ""
                        }
                    </FileCheckText>
                </FileCheckBox>

                <FileChechBtnBox>
                    <FileCheckBtn onClick={() => setGameUploadMobileFileModalOnOff(!GameUploadMobileFileModalOnOff)}>
                        <FileBtnText>확인</FileBtnText>
                    </FileCheckBtn>
                </FileChechBtnBox>

            </FileCheckModalAllBox>
        </FileCheckModalBackground>
    );
}

export default GameUploadMobileFileModal;

const FileChechBtnBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const FileCheckText = styled.span
    `
    font-weight: bold;
    font-size: 37px;
`

const FileCheckBox = styled.div
    `
    display: flex;
    padding: 57px;
`

const FileBtnText = styled.span
    `
    font-weight: bold;
    color: white;
`

const FileCheckBtn = styled.div
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

const FileCheckModalAllBox = styled.div
    `
    display: block;
    min-width: 560px;
    height: 240px;
    background: white;
    border-radius: 10px;
`

const FileCheckModalBackground = styled.div
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

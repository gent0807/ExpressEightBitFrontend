import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from 'styled-components';
import axios from 'axios';
import { ImageDrop } from "quill-image-drop-module";
import { AiFillFileAdd } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";

import PPTX from "../../Item/img/FileList/pptx.png";
import JPG from "../../Item/img/FileList/jpg.png";
import PNG from "../../Item/img/FileList/png.png";
import PDF from "../../Item/img/FileList/pdf.png";
import TXT from "../../Item/img/FileList/txt.png";
import ZIP from "../../Item/img/FileList/zip.png";
import Default from "../../Item/img/FileList/defaultWhite.png"
import { accessToken, clearLoginState, point } from '../../Redux/User';
import WriteBoardModal from "./WriteBoardModal";
import WirteFileModal from "./WirteFileModal";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const WriteBoard = () => {
    const { contentType } = useParams();
    const [WriterChangeValue, setWriterChangeValue] = useState("");
    const [EditerValue, setEditerValue] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const [WriteBoardModalOnOff, setWriteBoardModalOnOff] = useState(false);
    const [WriteFileModalOnOff, setWriteFileModalOnOff] = useState(false);
    const [FileSize, setFileSize] = useState("");
    const [ExtensionCheck, setExtensionCheck] = useState("");
    const [IconCheck, setIconCheck] = useState("");
    const [IconOnOff, setIconOnOff] = useState(false);
    const FileMaxSize = 2 * 1024 * 1024 * 1024;
    const ExtensionAllList = "lnk,url";

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const loginMaintain = localStorage.getItem("loginMaintain");
    const ip = localStorage.getItem("ip");
    const navigate = useNavigate();

    const dragRef = useRef(null);
    const fileId = useRef(0);

    const quillRef = useRef(null);
    const toolbarOptions = [
        ["link", "image", "video"],
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
    ];

    const modules = useMemo(
        () => ({
            toolbar: {
                container: toolbarOptions,
            },
            imageResize: {
                parchment: Quill.import("parchment"),
                modules: ["Resize", "DisplaySize", "Toolbar"],
            },
            imageDrop: true,
        }), []);

    /* useEffect(() => {
       const quill = quillRef.current;
       // console.log(quill);
 
       const handleImage = () => {
           // 이미지 핸들 로직
           const input = document.createElement("input");
           input.setAttribute("type", "file");
           input.setAttribute("accept", "image/*");
           input.click();
 
           input.onchange = async () => {
               const file = input.files[0];
 
               // 현재 커서 위치 저장
               // const range = getEditor().getSelection(true);
               const range = quill.selection
 
               // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
               quill.getEditor().insertEmbed(range.index, "image", `/img/loading.gif`);
               
               
               try {
                   // S3에 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현
                   const formData = new FormData();
                   formData.append('file' , file)
                   const result = await actionUploadEditorImage(formData); 
                   const url = result.data
                   console.log(url);
                   // 정상적으로 업로드 됐다면 로딩 placeholder 삭제
                   quill.getEditor().deleteText(range.index, 1);
                   // 받아온 url을 이미지 태그에 삽입
                   quill.getEditor().insertEmbed(range.index, "image", url);
                   
                   // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
                   quill.getEditor().setSelection(range.index + 1);
               } catch (e) {
                   quill.getEditor().deleteText(range.index, 1);
               }
           };
       }
       
       if (quillRef.current) {
           // const { getEditor } = quillRef.current;
           const toolbar = quill.getEditor().getModule("toolbar");
           toolbar.addHandler("image", handleImage);
       }
   }, []); */


    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "align",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "background",
        "color",
        "link",
        "image",
        "video",
        "width",
    ];

    const ExtensionName = ({ Extension }) => {
        const lastIndex = Extension.lastIndexOf(".");

        if (lastIndex < 0) {
            return "";
        }

        return Extension.substring(lastIndex + 1).toLowerCase();
    }

    const onChangeFiles = useCallback((e) => {
        let selectFiles = [];
        let tempFiles = files;
        const ExtensionList = ExtensionAllList;

        if (e.type === "drop") {
            selectFiles = e.dataTransfer.files;
        } else {
            selectFiles = e.target.files;
        }

        const Extension = selectFiles[0].name;
        const ExtensionCheck = ExtensionName({ Extension });
        const FileSize = selectFiles[0].size;
        setFileSize(FileSize);
        setExtensionCheck(ExtensionCheck);
        const MaxSize = FileMaxSize;

        if (ExtensionList.indexOf(ExtensionCheck) > -1 || ExtensionCheck === "") {
            setWriteFileModalOnOff(true);
            return;
        }

        if (FileSize > MaxSize) {
            setWriteFileModalOnOff(true);
            return;
        }

        if (files.length >= 5) {
            setWriteFileModalOnOff(true);
            return;
        }


        for (const file of selectFiles) {
            tempFiles = [
                ...tempFiles,
                {
                    id: fileId.current++,
                    object: file
                }
            ];
        }

        setFiles(tempFiles);

    }, [files]);

    console.log(files);

    const handleFilterFile = useCallback(
        (id) => {
            setFiles(files.filter(file => file.id !== id));
        }, [files]
    );

    const handleDragIn = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragOut = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files !== null) {
            setIsDragging(true);
        }
    }, []);

    const handleDrop = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        onChangeFiles(e);
        setIsDragging(false);
    }, [onChangeFiles]
    )

    const WriterChange = (e) => {
        const currentWriter = e.target.value;
        setWriterChangeValue(currentWriter);
        console.log(WriterChangeValue);
    }

    const initDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
            dragRef.current.addEventListener("dragenter", handleDragIn);
            dragRef.current.addEventListener("dragleave", handleDragOut);
            dragRef.current.addEventListener("dragover", handleDragOver);
            dragRef.current.addEventListener("drop", handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    const resetDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
            dragRef.current.removeEventListener("dragenter", handleDragIn);
            dragRef.current.removeEventListener("dragleave", handleDragOut);
            dragRef.current.removeEventListener("dragover", handleDragOver);
            dragRef.current.removeEventListener("drop", handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    useEffect(() => {
        initDragEvents();

        return () => resetDragEvents();
    }, [initDragEvents, resetDragEvents]);

    const OncheckSubmit = (e) => {
        const registFile = async (writer, regdate, contentType) => {
            const fd = new FormData();

            fd.append("uploader", writer);
            fd.append("regdate", regdate);
            fd.append("storeType","attach");


            for (let i = 0; i < files.length; i++) {
                fd.append("files", files[i].object);
            }

            await axios.post(`${ip}/Files/files/${contentType}/1`, fd, {
                headers: {
                    'Authorization': loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    return res.data;
                })
                .then((data) => {
                    dispatch(point(user.point + 10));
                    navigate('/Article/'+writer+'/'+regdate+'/'+contentType);
                    return;
                })



        }

        e.preventDefault();

        console.log(files.map(file => file.object));

        if (WriterChangeValue.length < 5 && EditerValue.length > 20) {
            setWriteBoardModalOnOff(true);
            return;
        }
        else if (WriterChangeValue.length > 5 && EditerValue.length < 20) {
            setWriteBoardModalOnOff(true);
            return;
        }
        else if (WriterChangeValue.length < 5 && EditerValue.length < 20) {
            setWriteBoardModalOnOff(true);
            return;
        }


        axios.post(`${ip}/Articles/article/${contentType}`, {
            title: WriterChangeValue,
            content: EditerValue,
            writer: loginMaintain == "true" ? userInfo.nickName : user.nickname,
            depth: 1,
        },
            {
                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` },
            })
            .then((res) => {
                /* regenerateAccessTokenOrLogout(res, OncheckSubmit, e) */
                return res.data;
            })
            .then((data) => {
                const writer = data.writer;
                const regdate = data.regdate;

                if (files.length == 0) {
                    dispatch(point(user.point + 10));
                    navigate('/Article/'+writer+'/'+regdate+'/'+contentType);
                    return;
                }

                else if (files.length > 0) {
                    registFile(writer, regdate, contentType);
                    return;
                }




            })

    }

    const regenerateAccessTokenOrLogout = (res, f, e) => {
        if (res.status == 403) {
            axios.patch(`${ip}/Users/token/${loginMaintain == "true" ? userInfo.nickName : user.nickname}`, {

            },
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` },
                })
                .then((res) => {
                    return res.data
                }
                )
                .then((data) => {
                    if (data == "invalid") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("인증되지 않은 접근입니다.");
                        navigate('/Login');
                    }
                    else if (data == "accesstoken valid") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("인증되지 않은 접근입니다.");
                        navigate('/Login');
                    }
                    else if (data == "accesstoken not matched user") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("인증되지 않은 접근입니다.");
                        navigate('/Login');
                    }
                    else if (data == "refreshtoken invalid") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("인증되지 않은 접근입니다.");
                        navigate('/Login');
                    }
                    else if (data == "refreshtoken expired") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("로그인이 만료되었습니다.");
                        navigate('/Login');
                    }
                    else if (data == "refreshtoken not matched user") {
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("loginMaintain");
                        dispatch(clearLoginState());
                        deleteRefreshToken("refreshToken");
                        window.alert("인증되지 않은 접근입니다.");
                        navigate('/Login');
                    }
                    else {
                        const object = {
                            accessToken: data,
                        };
                        if (loginMaintain == "true") {
                            userInfo.accessToken = data;
                        }
                        dispatch(accessToken(object));
                        f(e);
                    }
                })
            return;
        }
        else if (res.status == 200) {
            return res.data
        }
    }

    const deleteRefreshToken = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    }

    return (
        <WriterInputBox>

            {WriteFileModalOnOff ? <WirteFileModal
                setWriteFileModalOnOff={setWriteFileModalOnOff}
                WriteFileModalOnOff={WriteFileModalOnOff}
                ExtensionCheck={ExtensionCheck}
                ExtensionList={ExtensionAllList}
                FileSize={FileSize}
                MaxSize={FileMaxSize}
                files={files}
            /> : <></>}

            {WriteBoardModalOnOff ? <WriteBoardModal
                setWriteBoardModalOnOff={setWriteBoardModalOnOff}
                WriteBoardModalOnOff={WriteBoardModalOnOff}
                EditerValue={EditerValue}
                WriterChangeValue={WriterChangeValue}
            /> : <></>}

            <WriterInformationTextAllBox>
                <WriterInformation><WriterInformationText>여러분의 생각을 펼쳐 보세요!</WriterInformationText></WriterInformation>
            </WriterInformationTextAllBox>
            <WriteBoardSubmit onSubmit={OncheckSubmit}>
                <TagTextBox><TagText>제목</TagText></TagTextBox>
                <WriterInput placeholder='제목을 입력해 주세요!' maxLength={50} onChange={WriterChange} value={WriterChangeValue} />
                <TagTextBox><TagText>본문</TagText></TagTextBox>
                <EditerBox>
                    <Editer
                        placeholder="내용을 입력해 주세요!"
                        value={EditerValue}
                        onChange={(content, delta, source, editor) => setEditerValue(editor.getHTML())}
                        modules={modules}
                        formats={formats}
                    ></Editer>
                </EditerBox>
                <TagTextBox><TagText>파일첨부</TagText></TagTextBox>
                <FileUploadBox ref={dragRef} checkFile={isDragging}>
                    <FileBtnBox>
                        <FileUploadLabel checkFile={isDragging} htmlFor='fileUpload'>
                            <FileUpload
                                id='fileUpload'
                                type="file"
                                multiple="multiple"
                                onChange={(e) => { onChangeFiles(e); e.target.value = ""; }}
                            />
                            <FileUploadText checkFile={isDragging}><AiFillFileAdd /></FileUploadText>
                        </FileUploadLabel>
                    </FileBtnBox>
                    <FileList Files={files}>
                        {files.length > 0 &&
                            files.map(file => {
                                const {
                                    id,
                                    object: { name }
                                } = file;
                                return (
                                    <FileNumber key={id}>
                                        <>
                                            <Icon
                                                onError={(e) => e.target.style.display = 'none'}
                                                src={[
                                                    (name.includes("pptx") ? PPTX :
                                                        (name.includes("txt") ? TXT :
                                                            (name.includes("pdf") ? PDF :
                                                                (name.includes("jpg") ? JPG :
                                                                    (name.includes("png") ? PNG :
                                                                        (name.includes("zip") ? ZIP :
                                                                            ""))))))
                                                ]} />
                                        </>
                                        <FileName>{name}</FileName>
                                        <FileDelete onClick={() => handleFilterFile(id)}>
                                            X
                                        </FileDelete>
                                    </FileNumber>
                                );
                            })
                        }
                    </FileList>
                </FileUploadBox>
                <SubmitBtnBox>
                    <Link to={`/Board/${contentType}`}><CancelBtn type="button">취소</CancelBtn></Link>
                    <SubmitBtn type='submit'>등록</SubmitBtn>
                </SubmitBtnBox>
            </WriteBoardSubmit>
        </WriterInputBox>
    );
}

export default WriteBoard;

const Editer = styled(ReactQuill)
    `
    display: flex;
    flex-direction: column;
    
    .ql-editor.ql-blank::before
    {
        color:${props => props.theme.textColor};
    }

    .ql-editor ol, .ql-editor ul
    {
        color:${props => props.theme.textColor};
    }

    .ql-editor p
    {
        color:${props => props.theme.textColor};
    }

    .ql-editor
    {
        margin: 0px -2px -2px 0px;
        min-height: 600px;
        font-size: 20px;
        background: ${props => props.theme.backgroundColor};
    }

    .ql-editor::-webkit-scrollbar 
    {
        display: none;
    }

    .ql-container::-webkit-scrollbar
    {
        background: gray;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .ql-snow .ql-tooltip
    {
        left: 1% !important;
        top: -1% !important;
    }

    .ql-container::-webkit-scrollbar-thumb
    {
        background: #55AAFF;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-clip: padding-box;
        border: 5px solid transparent;
    }
    .ql-container::-webkit-scrollbar-track
    {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .ql-video
    {
        width: 1280px;
        height: 700px;
    }

    .ql-toolbar.ql-toolbar.ql-snow
    {
        order: 0;
    }
`

const Icon = styled.img
    `
    width : 30px;
    height : 30px;
    margin: -6px 0px 0px 0px;
    background: ${props => props.theme.backgroundColor};
`

const FileBtnBox = styled.div
    `
    width: 100%;
    text-align: center;
`

const TagText = styled.span
    `

`

const TagTextBox = styled.div
    `
    display: flex;
    text-align: center;
    justify-content: start;
    align-items: start;
    margin: 0px 20px 13px 20px;
    font-size: 30px;
    color : ${props => props.theme.textColor};
`

const EditerBox = styled.div
    `
    max-width: 1240px;
    margin: 0px 20px 30px 20px;
    border: solid 3px ${props => props.theme.borderColor};
    border-radius: 20px;
    overflow: hidden;
    background: white;
`

const WriteBoardSubmit = styled.form
    `
    display: flex;
    flex-direction: column;
`

const SubmitBtnBox = styled.div
    `
    display: flex;
    justify-content: end;
    margin: 0px 20px 30px 20px;
`

const SubmitBtn = styled.button
    `
    color: black;
    border: solid 3px ${props => props.theme.borderColor};
    background: #6a9dda;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size: 24px;
    caret-color: transparent;
    margin: 0px 0px 0px 15px;
    width: 120px;
    height: 60px;
    &:hover
    {
        background : ${props => props.theme.HoverColor};
    }
`

const CancelBtn = styled(SubmitBtn)
    `
    margin: 0px 0px 0px 0px;

`

const FileNumber = styled.div
    `
    width: 300px;
    box-sizing: border-box;
    display: flex;
    padding: 10px;
    border: 3px solid ${props => props.theme.borderColor};
    margin: 0px 0px 10px 0px;
    color : ${props => props.theme.textColor};
    font-weight : bold;
    justify-content: space-between;
    height: 44px;
`

const FileName = styled.div
    `
    width: 200px;
    height: 25px;
    margin: -2px 0px 0px 0px;
    box-sizing: border-box;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`

const FileDelete = styled.div
    `
    margin: -1px 0px 0px 0px;
    cursor: pointer;
`

const FileList = styled.div
    `
    padding: 8px;
    margin-bottom: 10px;
    font-size: 20px;
    display: ${props => props.Files.length === 0 ? "none" : "flex"};
    justify-content: space-between;
    flex-direction: column;
    &:hover
    {
        opacity: 0.7;
    }
    
`

const FileUploadLabel = styled.label
    `
    color: black;
    border-radius : 10px;
    cursor : pointer;
    caret-color: transparent;
    font-size: 80px;
    outline: none;
    -webkit-tap-highlight-color: transparent;
`

const FileUploadText = styled.div
    `
    color: ${props => props.checkFile ? "#55aaff" : "black"};
    svg
    {
        color: ${props => props.checkFile ? "#55aaff" : props => props.theme.textColor};
    }
`

const WriterInputBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const FileUploadBox = styled.div
    `
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    border: solid 3px ${props => props.theme.borderColor};
    margin: 0px 20px 30px 20px;
    border-radius: 20px;
    justify-content: center;
    padding: 19px 0px 0px 0px;
    background: ${props => props.checkFile ? "rgb(0,0,0,0.04)" : props.theme.backgroundColor};
    min-height: 135px;
    @media (hover: hover)
    {
        &:hover
        {
            background: ${props => props.theme.HoverColor};
        } 
    }
`

const WriterInput = styled.input
    `
    border: none;
    outline: none;
    padding: 10px 10px 10px 15px;
    box-shadow: 0 0 0 3px ${props => props.theme.borderColor} inset;
    border-radius: 10px;
    font-size: 20px;
    box-sizing: border-box;
    margin: 0px 20px 30px 20px;
    height: 70px;
    font-size: 23px;
    color : ${props => props.theme.textColor}; 
    background: ${props => props.theme.backgroundColor};   
    &::placeholder{
        color:${props => props.theme.textColor};
    }
`

const FileUpload = styled.input
    `
    display : none;
    caret-color: transparent;
`

const StoryInput = styled.textarea
    `
    box-sizing: border-box;
    height: 500px;
    border: none;
    resize: none;
    padding: 10px 10px 10px 15px;
    font-size: 15px;
    box-shadow: 0 0 0 3px ${props => props.theme.borderColor} inset;
    border-radius: 10px;
    outline: none;
    margin: 0px 20px 30px 20px;
    &::-webkit-scrollbar{
        background: gray;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border: solid 3px ${props => props.theme.borderColor};
    }
    &::-webkit-scrollbar-thumb
    {
        background: #55AAFF;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-clip: padding-box;
        border: 5px solid transparent;
    }
    &::-webkit-scrollbar-track
    {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`

const WriterInformation = styled.div
    `
    display: flex;
    text-align: center;
    color : ${props => props.theme.textColor};
    padding: 15px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 22px;
    @media (min-width:250px) and (max-width:666px)
    {
        font-size: 15px;
    }
}
`

const WriterInformationText = styled.h1
    `
    color : ${props => props.theme.textColor};
`
const WriterInformationTextAllBox = styled.div
    `
    display: flex;
    justify-content: start;
    @media (min-width:250px) and (max-width:666px)
    {
        justify-content: center;
    }
`

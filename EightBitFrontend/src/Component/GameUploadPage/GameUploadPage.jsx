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

import JPG from "../../Item/img/FileList/jpg.png";
import PNG from "../../Item/img/FileList/png.png";
import ZIP from "../../Item/img/FileList/zip.png";

import { accessToken, clearLoginState, point } from '../../Redux/User';

import GameUploadModal from "./Modal/GameUploadModal";

import GameUploadPcFileModal from "./Modal/GameUploadPcFileModal";
import GameUploadMobileFileModal from "./Modal/GameUploadMobileFileModal";
import GameUploadMainModal from "./Modal/GameUploadMainModal";
import GameUploadBackgroundModal from "./Modal/GameUploadBackgroundModal";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const GameUploadPage = () => {
    const { contentType } = useParams();
    const [TitleChangeValue, setTitleChangeValue] = useState("");
    const [URLChangeValue, setURLChangeValue] = useState("");
    const [GenreChangeValue, setGenreChangeValue] = useState("");
    const [contact, setContact] = useState("");
    const [ExplanationValue, setExplanationValue] = useState('<p><br></p>');
    const [WordCountValue, setWordCountValue] = useState(0);
    const [MainImgURL, setMainImgURL] = useState("");
    const [BackgroundImgURL, setBackgroundImgURL] = useState("");

    const [isPcDragging, setIsPcDragging] = useState(false);
    const [isMobileDragging, setIsMobileDragging] = useState(false);
    const [isMainImgDragging, setIsMainImgDragging] = useState(false);
    const [isBackgroungImgDragging, setIsBackgroungImgDragging] = useState(false);

    const [GameUploadModalOnOff, setGameUploadModalOnOff] = useState(false);

    const [GameUploadPcFileModalOnOff, setGameUploadPcFileModalOnOff] = useState(false);
    const [GameUploadMobileFileModalOnOff, setGameUploadMobileFileModalOnOff] = useState(false);
    const [GameUploadMainModalOnOff, setGameUploadMainModalOnOff] = useState(false);
    const [GameUploadBackgroundModalOnOff, setGameUploadBackgroundModalOnOff] = useState(false);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const loginMaintain = localStorage.getItem("loginMaintain");
    const ip = localStorage.getItem("ip");
    const navigate = useNavigate();

    const PcDragRef = useRef(null);
    const MobileDragRef = useRef(null);
    const MainImgDragRef = useRef(null);
    const BackgroundImgDragRef = useRef(null);
    const quill = useRef(null);
    const fileId = useRef(0);

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

    const TitleChange = (e) => {
        const currentTitle = e.target.value;
        setTitleChangeValue(currentTitle);
    }

    const GenreChange = (e) => {
        const currentGenre = e.target.value;
        setGenreChangeValue(currentGenre);
    }

    const ContactChange = (e) => {
        const currentContact = e.target.value;
        setContact(currentContact);
    }

    const URLChange = (e) => {
        const currentURL = e.target.value;
        setURLChangeValue(currentURL);
    }

    const [pcfiles, setPcfiles] = useState([]);
    const [mobilefiles, setMobilefiles] = useState([]);
    const [mainimgfiles, setMainImgfiles] = useState([]);
    const [backgroundimgfiles, setBackgroundImgfiles] = useState([]);

    const [PcExtensionCheck, setPcExtensionCheck] = useState("");
    const [MobileExtensionCheck, setMobileExtensionCheck] = useState("");
    const [MainImgExtensionCheck, setMainImgExtensionCheck] = useState("");
    const [BackgroundImgExtensionCheck, setBackgroundImgExtensionCheck] = useState("");

    const [pcfileSize, setPcFileSize] = useState("");
    const [mobilefileSize, setMobileFileSize] = useState("");
    const [mainimgSize, setMainImgSize] = useState("");
    const [backgroundimgSize, setBackgroundImgSize] = useState("");

    const FileMaxSize = 2 * 1024 * 1024 * 1024;

    const PcExtensionAllList = "exe,zip";
    const MobileExtensionAllList = "apk";
    const MainImgExtensionAllList = "jpg,png,jpeg";
    const BackgroundImgExtensionAllList = "jpg,png,jpeg";

    const PcExtensionName = ({ Extension }) => {
        const lastIndex = Extension.lastIndexOf(".");

        if (lastIndex < 0) {
            return "";
        }

        return Extension.substring(lastIndex + 1).toLowerCase();
    }

    const MobileExtensionName = ({ Extension }) => {
        const lastIndex = Extension.lastIndexOf(".");

        if (lastIndex < 0) {
            return "";
        }

        return Extension.substring(lastIndex + 1).toLowerCase();
    }

    const MainImgExtensionName = ({ Extension }) => {
        const lastIndex = Extension.lastIndexOf(".");

        if (lastIndex < 0) {
            return "";
        }

        return Extension.substring(lastIndex + 1).toLowerCase();
    }

    const BackgroundImgExtensionName = ({ Extension }) => {
        const lastIndex = Extension.lastIndexOf(".");

        if (lastIndex < 0) {
            return "";
        }

        return Extension.substring(lastIndex + 1).toLowerCase();
    }


    const onPcChangeFiles = useCallback((e) => {
        let selectFiles = [];
        let tempFiles = pcfiles;
        const PcExtensionList = PcExtensionAllList;

        if (e.type === "drop") {
            selectFiles = e.dataTransfer.files;
        } else {
            selectFiles = e.target.files;
        }

        const Extension = selectFiles[0].name;
        const PcExtensionCheck = PcExtensionName({ Extension });
        const FileSize = selectFiles[0].size;
        setPcFileSize(FileSize);
        setPcExtensionCheck(PcExtensionCheck);
        const MaxSize = FileMaxSize;

        if (FileSize > MaxSize) {
            setGameUploadPcFileModalOnOff(true);
            return;
        }

        if (pcfiles.length >= 1) {
            setGameUploadPcFileModalOnOff(true);
            return;
        }

        if (PcExtensionCheck === "") {
            setGameUploadPcFileModalOnOff(true);
            return;
        }

        if (PcExtensionList.indexOf(PcExtensionCheck) > -1) {
            for (const file of selectFiles) {
                tempFiles = [
                    ...tempFiles,
                    {
                        id: fileId.current++,
                        object: file
                    }
                ];
            }

            setPcfiles(tempFiles);
        } else {
            setGameUploadPcFileModalOnOff(true);
            return;
        }

    }, [pcfiles]);

    const onMobileChangeFiles = useCallback((e) => {
        let selectFiles = [];
        let tempFiles = mobilefiles;
        const MobileExtensionList = MobileExtensionAllList;

        if (e.type === "drop") {
            selectFiles = e.dataTransfer.files;
        } else {
            selectFiles = e.target.files;
        }

        const Extension = selectFiles[0].name;
        const MobileExtensionCheck = MobileExtensionName({ Extension });
        const FileSize = selectFiles[0].size;
        setMobileFileSize(FileSize);
        setMobileExtensionCheck(MobileExtensionCheck);
        const MaxSize = FileMaxSize;

        if (FileSize > MaxSize) {
            setGameUploadMobileFileModalOnOff(true);
            return;
        }

        if (mobilefiles.length >= 1) {
            setGameUploadMobileFileModalOnOff(true);
            return;
        }

        if (MobileExtensionCheck === "") {
            setGameUploadMobileFileModalOnOff(true);
            return;
        }

        if (MobileExtensionList.indexOf(MobileExtensionCheck) > -1) {
            for (const file of selectFiles) {
                tempFiles = [
                    ...tempFiles,
                    {
                        id: fileId.current++,
                        object: file
                    }
                ];
            }

            setMobilefiles(tempFiles);
        } else {
            setGameUploadMobileFileModalOnOff(true);
            return;
        }

    }, [mobilefiles]);

    const onMainImgChangeFiles = useCallback((e) => {
        let selectFiles = [];
        let tempFiles = mainimgfiles;
        const MainImgExtensionList = MainImgExtensionAllList

        if (e.type === "drop") {
            selectFiles = e.dataTransfer.files;
        } else {
            selectFiles = e.target.files;
        }

        const Extension = selectFiles[0].name;
        const MainImgExtensionCheck = MainImgExtensionName({ Extension });

        const FileSize = selectFiles[0].size;

        setMainImgSize(FileSize);
        setMainImgExtensionCheck(MainImgExtensionCheck);
        console.log(MainImgExtensionCheck);
        const MaxSize = FileMaxSize;

        if (FileSize > MaxSize) {
            setGameUploadMainModalOnOff(true);
            return;
        }

        if (mainimgfiles.length >= 1) {
            setGameUploadMainModalOnOff(true);
            return;
        }

        if (MainImgExtensionCheck === "") {
            setGameUploadMainModalOnOff(true);
            return;
        }

        if (MainImgExtensionList.indexOf(MainImgExtensionCheck) > -1) {
            for (const file of selectFiles) {
                tempFiles = [
                    ...tempFiles,
                    {
                        id: fileId.current++,
                        object: file
                    }
                ];
            }

            setMainImgfiles(tempFiles);

            const file = selectFiles[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setMainImgURL(reader.result);
            }

        } else {
            setGameUploadMainModalOnOff(true);
            return;
        }


    }, [mainimgfiles]);

    const onBackgroundImgChangeFiles = useCallback((e) => {
        let selectFiles = [];
        let tempFiles = backgroundimgfiles;
        const BackgroundImgExtensionList = BackgroundImgExtensionAllList;

        if (e.type === "drop") {
            selectFiles = e.dataTransfer.files;
        } else {
            selectFiles = e.target.files;
        }

        const Extension = selectFiles[0].name;


        const BackgroundImgExtensionCheck = BackgroundImgExtensionName({ Extension });
        const FileSize = selectFiles[0].size;
        setBackgroundImgSize(FileSize);
        setBackgroundImgExtensionCheck(BackgroundImgExtensionCheck);
        const MaxSize = FileMaxSize;

        if (FileSize > MaxSize) {
            setGameUploadBackgroundModalOnOff(true);
            return;
        }

        if (backgroundimgfiles.length >= 1) {
            setGameUploadBackgroundModalOnOff(true);
            return;
        }

        if (BackgroundImgExtensionCheck === "") {
            setGameUploadBackgroundModalOnOff(true);
            return;
        }

        if (BackgroundImgExtensionList.indexOf(BackgroundImgExtensionCheck) > -1) {
            for (const file of selectFiles) {
                tempFiles = [
                    ...tempFiles,
                    {
                        id: fileId.current++,
                        object: file
                    }
                ];
            }

            setBackgroundImgfiles(tempFiles);

            const file = selectFiles[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setBackgroundImgURL(reader.result);
            }

        } else {
            setGameUploadBackgroundModalOnOff(true);
            return;
        }


    }, [backgroundimgfiles]);

    const handleFilterPcFile = useCallback(
        (id) => {
            setPcfiles(pcfiles.filter(file => file.id !== id));
        }, [pcfiles]
    );

    const handleFilterMobileFile = useCallback(
        (id) => {
            setMobilefiles(mobilefiles.filter(file => file.id !== id));
        }, [mobilefiles]
    );

    const handleFilterMainImgFile = useCallback(
        (id) => {
            setMainImgfiles(mainimgfiles.filter(file => file.id !== id));
        }, [mainimgfiles]
    );

    const handleFilterBackgroundImgFile = useCallback(
        (id) => {
            setBackgroundImgfiles(backgroundimgfiles.filter(file => file.id !== id));
        }, [backgroundimgfiles]
    );

    const handlePcDragIn = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handlePcDragOut = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        setIsPcDragging(false);
    }, []);

    const handlePcDragOver = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files !== null) {
            setIsPcDragging(true);
        }
    }, []);

    const handlePcDrop = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        onPcChangeFiles(e);
        setIsPcDragging(false);
    }, [onPcChangeFiles]
    )

    const handleMoblieDragIn = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleMoblieDragOut = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        setIsMobileDragging(false);
    }, []);

    const handleMoblieDragOver = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files !== null) {
            setIsMobileDragging(true);
        }
    }, []);

    const handleMoblieDrop = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        onMobileChangeFiles(e);
        setIsMobileDragging(false);
    }, [onMobileChangeFiles]
    )

    const handleMainImgDragIn = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleMainImgDragOut = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        setIsMainImgDragging(false);
    }, []);

    const handleMainImgDragOver = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files !== null) {
            setIsMainImgDragging(true);
        }
    }, []);

    const handleMainImgDrop = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        onMainImgChangeFiles(e);
        setIsMainImgDragging(false);
    }, [onMainImgChangeFiles]
    )

    const handleBackgroundImgDragIn = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleBackgroundImgDragOut = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        setIsBackgroungImgDragging(false);
    }, []);

    const handleBackgroundImgDragOver = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files !== null) {
            setIsBackgroungImgDragging(true);
        }
    }, []);

    const handleBackgroundImgDrop = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();

        onBackgroundImgChangeFiles(e);
        setIsBackgroungImgDragging(false);
    }, [onBackgroundImgChangeFiles]
    )

    const initPcDragEvents = useCallback(() => {
        if (PcDragRef.current !== null) {
            PcDragRef.current.addEventListener("dragenter", handlePcDragIn);
            PcDragRef.current.addEventListener("dragleave", handlePcDragOut);
            PcDragRef.current.addEventListener("dragover", handlePcDragOver);
            PcDragRef.current.addEventListener("drop", handlePcDrop);
        }
    }, [handlePcDragIn, handlePcDragOut, handlePcDragOver, handlePcDrop]);

    const resetPcDragEvents = useCallback(() => {
        if (PcDragRef.current !== null) {
            PcDragRef.current.removeEventListener("dragenter", handlePcDragIn);
            PcDragRef.current.removeEventListener("dragleave", handlePcDragOut);
            PcDragRef.current.removeEventListener("dragover", handlePcDragOver);
            PcDragRef.current.removeEventListener("drop", handlePcDrop);
        }
    }, [handlePcDragIn, handlePcDragOut, handlePcDragOver, handlePcDrop]);

    const initMobileDragEvents = useCallback(() => {
        if (MobileDragRef.current !== null) {
            MobileDragRef.current.addEventListener("dragenter", handleMoblieDragIn);
            MobileDragRef.current.addEventListener("dragleave", handleMoblieDragOut);
            MobileDragRef.current.addEventListener("dragover", handleMoblieDragOver);
            MobileDragRef.current.addEventListener("drop", handleMoblieDrop);
        }
    }, [handleMoblieDragIn, handleMoblieDragOut, handleMoblieDragOver, handleMoblieDrop]);

    const resetMobileDragEvents = useCallback(() => {
        if (MobileDragRef.current !== null) {
            MobileDragRef.current.removeEventListener("dragenter", handleMoblieDragIn);
            MobileDragRef.current.removeEventListener("dragleave", handleMoblieDragOut);
            MobileDragRef.current.removeEventListener("dragover", handleMoblieDragOver);
            MobileDragRef.current.removeEventListener("drop", handleMoblieDrop);
        }
    }, [handleMoblieDragIn, handleMoblieDragOut, handleMoblieDragOver, handleMoblieDrop]);

    const initMainImgDragEvents = useCallback(() => {
        if (MainImgDragRef.current !== null) {
            MainImgDragRef.current.addEventListener("dragenter", handleMainImgDragIn);
            MainImgDragRef.current.addEventListener("dragleave", handleMainImgDragOut);
            MainImgDragRef.current.addEventListener("dragover", handleMainImgDragOver);
            MainImgDragRef.current.addEventListener("drop", handleMainImgDrop);
        }
    }, [handleMainImgDragIn, handleMainImgDragOut, handleMainImgDragOver, handleMainImgDrop]);

    const resetMainImgDragEvents = useCallback(() => {
        if (MainImgDragRef.current !== null) {
            MainImgDragRef.current.removeEventListener("dragenter", handleMainImgDragIn);
            MainImgDragRef.current.removeEventListener("dragleave", handleMainImgDragOut);
            MainImgDragRef.current.removeEventListener("dragover", handleMainImgDragOver);
            MainImgDragRef.current.removeEventListener("drop", handleMainImgDrop);
        }
    }, [handleMainImgDragIn, handleMainImgDragOut, handleMainImgDragOver, handleMainImgDrop]);

    const initBackgroundImgDragEvents = useCallback(() => {
        if (BackgroundImgDragRef.current !== null) {
            BackgroundImgDragRef.current.addEventListener("dragenter", handleBackgroundImgDragIn);
            BackgroundImgDragRef.current.addEventListener("dragleave", handleBackgroundImgDragOut);
            BackgroundImgDragRef.current.addEventListener("dragover", handleBackgroundImgDragOver);
            BackgroundImgDragRef.current.addEventListener("drop", handleBackgroundImgDrop);
        }
    }, [handleBackgroundImgDragIn, handleBackgroundImgDragOut, handleBackgroundImgDragOver, handleBackgroundImgDrop]);

    const resetBackgroundImgDragEvents = useCallback(() => {
        if (BackgroundImgDragRef.current !== null) {
            BackgroundImgDragRef.current.removeEventListener("dragenter", handleBackgroundImgDragIn);
            BackgroundImgDragRef.current.removeEventListener("dragleave", handleBackgroundImgDragOut);
            BackgroundImgDragRef.current.removeEventListener("dragover", handleBackgroundImgDragOver);
            BackgroundImgDragRef.current.removeEventListener("drop", handleBackgroundImgDrop);
        }
    }, [handleBackgroundImgDragIn, handleBackgroundImgDragOut, handleBackgroundImgDragOver, handleBackgroundImgDrop]);

    useEffect(() => {
        initPcDragEvents();

        return () => resetPcDragEvents();
    }, [initPcDragEvents, resetPcDragEvents]);

    useEffect(() => {
        initMobileDragEvents();

        return () => resetMobileDragEvents();
    }, [initMobileDragEvents, resetMobileDragEvents]);

    useEffect(() => {
        initMainImgDragEvents();

        return () => resetMainImgDragEvents();
    }, [initMainImgDragEvents, resetMainImgDragEvents]);

    useEffect(() => {
        initBackgroundImgDragEvents();

        return () => resetBackgroundImgDragEvents();
    }, [initBackgroundImgDragEvents, resetBackgroundImgDragEvents]);

    const OncheckSubmit = (e) => {

        e.preventDefault();

        const registFile = async (developer, regdate, contentType, files, storeType) => {
            const fd = new FormData();

            fd.append("uploader", developer);
            fd.append("regdate", regdate);
            fd.append("storeType", storeType);

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
                
                    return;
                })

        }


        
        if (
            TitleChangeValue.length === 0 &&
            mainimgfiles.length === 0 &&
            GenreChangeValue.length === 0 ) 
        {
            setGameUploadModalOnOff(true)
            return;
        }
        else if (
            TitleChangeValue.length === 0 ||
            mainimgfiles.length === 0 ||
            GenreChangeValue.length === 0)
        {
            setGameUploadModalOnOff(true)
            return;
        }else if (pcfiles.length === 0 && mobilefiles.length === 0 && URLChangeValue.length === 0)
        {
            setGameUploadModalOnOff(true)
            return;
        }


    

        



        axios.post(`${ip}/Games/game`, {
            title: TitleChangeValue,
            content: ExplanationValue,
            developer: loginMaintain == "true" ? userInfo.nickName : user.nickname,
            url: URLChangeValue,
            genre: GenreChangeValue,
            contentType: contentType,
            depth: 1,
            contact: contact,
        },
            {
                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` },
            })
            .then((res) => {
                /* regenerateAccessTokenOrLogout(res, OncheckSubmit, e) */
                return res.data;
            })
            .then((data) => {
                const developer = data.developer;
                const regdate = data.regdate;

                if (pcfiles.length == 0 && mobilefiles.length == 0 && mainimgfiles.length == 0 && backgroundimgfiles.length == 0) {
                    dispatch(point(user.point + 5));
                    navigate('/Game/' + developer + '/' + regdate+'/'+contentType)
                    return;
                }

                else if (!(pcfiles.length == 0 && mobilefiles.length == 0 && mainimgfiles.length == 0 && backgroundimgfiles.length == 0)) {
                    if(pcfiles.length==1){
                        registFile(developer, regdate, contentType, pcfiles, "pcGame");
                    }
                    
                    if(mobilefiles.length==1){
                        registFile(developer, regdate, contentType, mobilefiles, "mobileGame");
                    }

                    if(mainimgfiles.length==1){
                        registFile(developer, regdate, contentType, mainimgfiles, "gameImage");
                    }

                    if(backgroundimgfiles.length==1){
                        registFile(developer, regdate, contentType, backgroundimgfiles, "gameBanner");
                    }
                    
                }

                dispatch(point(user.point + 10));
                navigate('/Game/' + developer + '/' + regdate+'/'+contentType);
                return;




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

    const handleEditer = (content, delta, source, editor) => {
        const Length = editor.getLength();
        const Html = editor.getHTML();
        const WordCount = Length - 1;
        const MAX = 2000;
        setWordCountValue(WordCount);
        setExplanationValue(Html);

        if (MAX < Length) {
            quill.current.editor.deleteText(MAX, Length);
        }
    }

    const [WindowLength, setWindowLength] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowLength(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    })

    const ScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <WriterInputBox>

            {GameUploadPcFileModalOnOff ? <GameUploadPcFileModal

                setGameUploadPcFileModalOnOff={setGameUploadPcFileModalOnOff}
                GameUploadPcFileModalOnOff={GameUploadPcFileModalOnOff}

                PcExtensionCheck={PcExtensionCheck}
                PcExtensionList={PcExtensionAllList}

                pcfileSize={pcfileSize}

                pcfiles={pcfiles}

                MaxSize={FileMaxSize}

            /> : <></>}

            {GameUploadMobileFileModalOnOff ? <GameUploadMobileFileModal

                setGameUploadMobileFileModalOnOff={setGameUploadMobileFileModalOnOff}
                GameUploadMobileFileModalOnOff={GameUploadMobileFileModalOnOff}

                MobileExtensionCheck={MobileExtensionCheck}
                MobileExtensionList={MobileExtensionAllList}

                mobilefileSize={mobilefileSize}

                mobilefiles={mobilefiles}

                MaxSize={FileMaxSize}

            /> : <></>}

            {GameUploadBackgroundModalOnOff ? <GameUploadBackgroundModal

                setGameUploadBackgroundModalOnOff={setGameUploadBackgroundModalOnOff}
                GameUploadBackgroundModalOnOff={GameUploadBackgroundModalOnOff}

                BackgroundImgExtensionCheck={BackgroundImgExtensionCheck}
                BackgroundImgExtensionList={BackgroundImgExtensionAllList}

                backgroundimgSize={backgroundimgSize}

                backgroundimgfiles={backgroundimgfiles}

                MaxSize={FileMaxSize}

            /> : <></>}

            {GameUploadMainModalOnOff ? <GameUploadMainModal

                setGameUploadMainModalOnOff={setGameUploadMainModalOnOff}
                GameUploadMainModalOnOff={GameUploadMainModalOnOff}

                MainImgExtensionCheck={MainImgExtensionCheck}
                MainImgExtensionList={MainImgExtensionAllList}

                mainimgSize={mainimgSize}

                mainimgfiles={mainimgfiles}

                MaxSize={FileMaxSize}

            /> : <></>}

            {GameUploadModalOnOff ? <GameUploadModal

                setGameUploadModalOnOff={setGameUploadModalOnOff}
                GameUploadModalOnOff={GameUploadModalOnOff}

                TitleChangeValue = {TitleChangeValue}
                ExplanationValue = {ExplanationValue}
                pcfiles = {pcfiles}
                mobilefiles = {mobilefiles}
                URLChangeValue = {URLChangeValue}
                mainimgfiles = {mainimgfiles}
                backgroundimgfiles = {backgroundimgfiles}
                GenreChangeValue = {GenreChangeValue}

            /> : <></>}

            <WriterInformationTextAllBox>
                <WriterInformation><WriterInformationText>게임 업로드 및 출시</WriterInformationText></WriterInformation>
            </WriterInformationTextAllBox>

            <WriteBoardSubmit onSubmit={OncheckSubmit}>

                <TitleBox>
                    <TagTextBox>
                        <TagText>게임 제목</TagText>
                        <SubText>(필수)</SubText>
                    </TagTextBox>
                    <WriterInput placeholder='게임 제목을 입력해 주세요!' maxLength={50} onChange={TitleChange} value={TitleChangeValue} />
                </TitleBox>

                <GenreBox>
                    <TagTextBox>
                        <TagText>장르</TagText>
                        <SubText>(필수)</SubText>
                    </TagTextBox>
                    <WriterInput placeholder='장르를 입력해 주세요!' maxLength={50} onChange={GenreChange} value={GenreChangeValue} />
                </GenreBox>

                <ContactBox>
                    <TagTextBox>
                        <TagText>개발자 연락처</TagText>
                        <SubText>이메일, 전화번호 혹은 홈페이지 주소 등</SubText>
                    </TagTextBox>
                    <WriterInput placeholder='비워둘 시 미등록으로 게재 됩니다.' maxLength={50} onChange={ContactChange} value={contact} />
                </ContactBox>

                <MainImgBox>

                    <TagTextBox>
                        <TagText>메인 이미지</TagText>
                        <SubText>16 : 9 사이즈의 미리보기 이미지 (필수)</SubText>
                    </TagTextBox>

                    <FileUploadBox ref={MainImgDragRef} checkFile={isMainImgDragging}>
                        <FileBtnBox>
                            <FileUploadLabel checkFile={isMobileDragging} htmlFor='MainImgUpload'>
                                <FileUpload
                                    id='MainImgUpload'
                                    type="file"
                                    multiple="multiple"
                                    onChange={(e) => { onMainImgChangeFiles(e); e.target.value = ""; }}
                                />
                                <FileUploadText checkFile={isMainImgDragging}><AiFillFileAdd /></FileUploadText>
                            </FileUploadLabel>
                        </FileBtnBox>
                        <FileList Files={mainimgfiles}>
                            {mainimgfiles.length > 0 &&
                                mainimgfiles.map(file => {
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
                                                        (name.includes("jpg") ? JPG :
                                                            (name.includes("png") ? PNG :
                                                                ""))
                                                    ]} />
                                            </>
                                            <FileName>{name}</FileName>
                                            <FileDelete onClick={() => handleFilterMainImgFile(id)}>
                                                X
                                                            </FileDelete>
                                        </FileNumber>
                                    );
                                })
                            }
                        </FileList>
                    </FileUploadBox>

                    {mainimgfiles.length > 0 &&
                        <MainImgViewAllBox>
                            <MainImgView>
                                <SlideBox>
                                    <ImgBox src={MainImgURL} />
                                </SlideBox>
                            </MainImgView>
                        </MainImgViewAllBox>
                    }

                </MainImgBox>

                <BackgroundImgBox>
                    <TagTextBox>
                        <TagText>커버 이미지</TagText>
                        <SubText>16 : 9 사이즈의 배경 이미지</SubText>
                    </TagTextBox>
                    <FileUploadBox ref={BackgroundImgDragRef} checkFile={isBackgroungImgDragging}>
                        <FileBtnBox>
                            <FileUploadLabel checkFile={isBackgroungImgDragging} htmlFor='BackgroundImgUpload'>
                                <FileUpload
                                    id='BackgroundImgUpload'
                                    type="file"
                                    multiple="multiple"
                                    onChange={(e) => { onBackgroundImgChangeFiles(e); e.target.value = ""; }}
                                />
                                <FileUploadText checkFile={isBackgroungImgDragging}><AiFillFileAdd /></FileUploadText>
                            </FileUploadLabel>
                        </FileBtnBox>
                        <FileList Files={backgroundimgfiles}>
                            {backgroundimgfiles.length > 0 &&
                                backgroundimgfiles.map(file => {
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
                                                        (name.includes("jpg") ? JPG :
                                                            (name.includes("png") ? PNG :
                                                                ""))
                                                    ]} />
                                            </>
                                            <FileName>{name}</FileName>
                                            <FileDelete onClick={() => handleFilterBackgroundImgFile(id)}>
                                                X
                                            </FileDelete>
                                        </FileNumber>
                                    );
                                })
                            }
                        </FileList>
                    </FileUploadBox>

                    {backgroundimgfiles.length > 0 &&
                        <BackgroundImgViewAllBox>
                            <BackgroundImgViewBox>
                                <BackgroundBox width={WindowLength}>
                                    <ImgBox src={BackgroundImgURL} />
                                </BackgroundBox>
                            </BackgroundImgViewBox>
                        </BackgroundImgViewAllBox>
                    }

                </BackgroundImgBox>

                <ExplanationBox>
                    <TagTextBox>
                        <TagText>게임 설명</TagText>
                        <SubText>{WordCountValue} / 2000자</SubText>
                    </TagTextBox>
                    <EditerBox>
                        <Editer
                            ref={quill}
                            placeholder="당신의 게임을 자유롭게 설명하세요!"
                            value={ExplanationValue}
                            onChange={handleEditer}
                            modules={modules}
                            formats={formats}
                        ></Editer>
                    </EditerBox>
                </ExplanationBox>

                <PcBox>
                    <TagTextBox>
                        <TagText>PC</TagText>
                        <SubText>EXE / ZIP 파일</SubText>
                    </TagTextBox>
                    <FileUploadBox ref={PcDragRef} checkFile={isPcDragging}>
                        <FileBtnBox>
                            <FileUploadLabel checkFile={isPcDragging} htmlFor='PcfileUpload'>
                                <FileUpload
                                    id='PcfileUpload'
                                    type="file"
                                    multiple="multiple"
                                    onChange={(e) => { onPcChangeFiles(e); e.target.value = ""; }}
                                />
                                <FileUploadText checkFile={isPcDragging}><AiFillFileAdd /></FileUploadText>
                            </FileUploadLabel>
                        </FileBtnBox>
                        <FileList Files={pcfiles}>
                            {pcfiles.length > 0 &&
                                pcfiles.map(file => {
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
                                                        (name.includes("jpg") ? JPG :
                                                            (name.includes("png") ? PNG :
                                                                (name.includes("zip") ? ZIP :
                                                                    "")))
                                                    ]} />
                                            </>
                                            <FileName>{name}</FileName>
                                            <FileDelete onClick={() => handleFilterPcFile(id)}>
                                                X
                                        </FileDelete>
                                        </FileNumber>
                                    );
                                })
                            }
                        </FileList>
                    </FileUploadBox>
                </PcBox>

                <MobileBox>
                    <TagTextBox>
                        <TagText>모바일</TagText>
                        <SubText>APK 파일 / 구글 플레이스토어 URL이 있는 경우 건너뛰기</SubText>
                    </TagTextBox>
                    <FileUploadBox ref={MobileDragRef} checkFile={isMobileDragging}>
                        <FileBtnBox>
                            <FileUploadLabel checkFile={isMobileDragging} htmlFor='MobilefileUpload'>
                                <FileUpload
                                    id='MobilefileUpload'
                                    type="file"
                                    multiple="multiple"
                                    onChange={(e) => { onMobileChangeFiles(e); e.target.value = ""; }}
                                />
                                <FileUploadText checkFile={isMobileDragging}><AiFillFileAdd /></FileUploadText>
                            </FileUploadLabel>
                        </FileBtnBox>
                        <FileList Files={mobilefiles}>
                            {mobilefiles.length > 0 &&
                                mobilefiles.map(file => {
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
                                                        (name.includes("jpg") ? JPG :
                                                            (name.includes("png") ? PNG :
                                                                (name.includes("zip") ? ZIP :
                                                                    "")))
                                                    ]} />
                                            </>
                                            <FileName>{name}</FileName>
                                            <FileDelete onClick={() => handleFilterMobileFile(id)}>
                                                X
                                        </FileDelete>
                                        </FileNumber>
                                    );
                                })
                            }
                        </FileList>
                    </FileUploadBox>

                    <TagTextBox>
                        <TagText>구글 플레이스토어 링크</TagText>
                        <SubText>생략 가능</SubText>
                    </TagTextBox>

                    <WriterInput placeholder='URL를 입력해 주세요!' maxLength={100} onChange={URLChange} value={URLChangeValue} />
                </MobileBox>



                <SubmitBtnBox>
                    <Link to="/" onClick={() => ScrollTop()}><CancelBtn type="button">취소</CancelBtn></Link>
                    <SubmitBtn type='submit'>등록</SubmitBtn>
                </SubmitBtnBox>

            </WriteBoardSubmit>
        </WriterInputBox>
    );
}

export default GameUploadPage;

const MainImgViewAllBox = styled.div
    `


`

const BackgroundImgViewAllBox = styled.div
    `

`

const MainImgView = styled.div
    `
    display: flex;
    justify-content: center;
    padding: 20px;
    margin: 0px 20px 30px 20px;
    border-radius: 20px;
    border: none;
`

const BackgroundImgViewBox = styled(MainImgView)
    `

`

const ImgBox = styled.img
    `
    width: 100%;
    height: 100%;
`

const AllBox = styled.div
    `
    position: absolute;
    display: none;
    flex-direction: column;
    justify-content: end;
    background: rgba(0,0,0,0.3);
    top: 0%;
    height: 74.7%;
    left: 0%;
    border-radius: 8px;
    width: 100%;
    overflow: hidden;
     @media (min-width:250px) and (max-width:560px)
    {
        width: 100%;
    }
`

const SlideBox = styled.div
    `
    border-radius: 10px;
    overflow: hidden;
    transition: border 0.5s;
    width: 407px;
    height: 229px;
`

const BackgroundBox = styled(SlideBox)
    `
    width: 1536px;
    height: ${props => props.width >= 1280 ? "667px" : "46.7vw"};
`

const BackgroundImgView = styled.div
    `

`

const TitleBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const GenreBox = styled(TitleBox)
    `

`

const ContactBox = styled(TitleBox)
    `

`

const ExplanationBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const PcBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const MobileBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const MainImgBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const BackgroundImgBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

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
        min-height: 300px;
        font-size: 20px;
        background: ${props => props.theme.backgroundColor};
        transition: background 0.5s;
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

const SubText = styled(TagText)
    `
    font-size: 16px;
    margin: 0px 0px 2px 15px;
`

const TagTextBox = styled.div
    `
    display: flex;
    text-align: center;
    justify-content: start;
    align-items: end;
    margin: 20px 20px 13px 20px;
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
    transition: background 0.5s;
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
    transition: background 0.5s;
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
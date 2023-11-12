import { styled, keyframes } from "styled-components";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import { toggle } from "../../Recoil/ArticleReset/Toggle";
import { toggle2 } from "../../Recoil/ArticleReset/Toggle";
import { Slide } from "../Game";
import SingleReply from "../Reply/SingleReply";
import ReportModal from "../Article/ReportModal";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import dayjs from "dayjs";
import axios from "axios";
import DOMPurify from "dompurify";
import { clearLoginState, accessToken, point } from "../../Redux/User";
import ReplyPagination from "../Reply/ReplyPagination";
import ReplyDeleteModal from "../Reply/ReplyDeleteModal";
import NotPage from "./NotPage";
import GameReplyModal from "./GameReplyModal";
import { ArrowBox } from "../Sign/Signinput";
import DownloadImgBtn from "../../Item/img/Button/Download.png";
import MobileImgBtn from "../../Item/img/Button/MobileDownload.png";
import LikeImgBtn from "../../Item/img/Button/Like.png";
import LikeImgFillBtn from "../../Item/img/Button/FillLike.png";
import PlayStore from "../../Item/img/Button/PlayStore.png";
import ArticleReplyModal from "../Article/ArticleReplyModal";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

const Game = () => {
    const { developer } = useParams();
    const { regdate } = useParams();
    const { contentType } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [updatedate, setUpdatedate] = useState("");
    const [visitcnt, setVisitcnt] = useState(0);
    const [PCGameCount, setPCGameCount] = useState(0);
    const [MobileGameCount, setMobileGameCount] = useState(0);
    const [ImgCount, setImgCount] = useState(0);
    const [BannerCount, setBannerCount] = useState(0);
    const [PCGame, setPCGame] = useState({});
    const [mobileGame, setMobileGame] = useState({});
    const [mainImg, setMainImg] = useState({});
    const [banner, setBanner] = useState({});
    const [role, setRole] = useState("");
    const [likecount, setLikecount] = useState(0);
    const [contact, setContact] = useState("");
    const [type, setType] = useState("");
    const [officialDevelopers, setOfficialDevelopers] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let userInfo = localStorage.getItem("userInfo");
    const ip = localStorage.getItem("ip");
    const loginMaintain = localStorage.getItem("loginMaintain");
    userInfo = JSON.parse(userInfo);
    const user = useSelector((state) => state.user);

    const [toggleState, setToggleState] = useRecoilState(toggle);
    const [toggleState2, setToggleState2] = useRecoilState(toggle2);


    const [genre, setGenre] = useState("");
    const [URL, setURL] = useState("");
    const [Fitter, setFitter] = useState("과거순");
    const [GameInformaion, setGameInformation] = useState(Slide)
    const [deleteMode, setDeleteMode] = useState(false);
    const [ReplyDeleteMode, setReplyDeleteMode] = useState(false);
    const [replyChangeValue, setReplyChangeValue] = useState('<p><br></p>');
    const [replyChangeValue2, setReplyChangeValue2] = useState('<p><br></p>');
    const [onReplyBtn, setOnReplyBtn] = useState(false);
    const [reCommentCount, setReCommentCount] = useState(0);
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);
    const [ModalReplyDeleteRegdate, setModalReplyDeleteRegdate] = useState("");
    const [ModalReplyDeleteReplyer, setModalReplyDeleteReplyer] = useState("");
    const [ModalReplyDeleteSetToggleState, setModalReplyDeleteSetToggleState] = useState("");
    const [ModalReplyCommentOnOff, setModalReplyCommentOnOff] = useState(false);
    const [ModalReplyDeleteToggleState, setModalReplyDeleteToggleState] = useState("");
    const [ModalReplyDeleteId, setModalReplyDeleteId] = useState("");
    const [FitterDropdown, setFitterDropdown] = useState(false);
    const [Comments, setComments] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);

    const [writerRole, setWriterRole] = useState("");


    const [reportMode, setReportMode] = useState(false);





    const offset = (page - 1) * limit;
    const CommentSize = Comments.slice(offset, offset + limit);
    const FillterRef = useRef("");

    let likeMode = useRef(false);
    let totalCommentCount = useRef(0);

    const [selectedReportWriter, setSelectedReportWriter] = useState("");
    const [selectedReportRegdate, setSelectedReportRegdate] = useState("");
    const [selectedReportContentType, setSelectedReportContentType] = useState("");
    const [selectedReportDepth, setSelectedReportDepth] = useState("");

    const [ModalFreeArticleReplyCommentOnOff, setModalFreeArticleReplyCommentOnOff] = useState(false);

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

    useEffect(() => {


        const getRole = (user) => {
            axios.get(`${ip}/Users/role?nickname=${user}`, {

            },
                {

                })
                .then((res) => {
                    return res.data;
                })
                .then(data => {
                    setRole(data);
                })

        }


        const getLikers = (developer, regdate, contentType) => {

            axios.get(`${ip}/Likes/likes?master=${developer}&regdate=${regdate}&contentType=${contentType}&depth=1`, {

            },
                {

                })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    setLikecount(data.length);
                    if (loginMaintain == "true") {
                        if (userInfo != null) {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i] == userInfo.nickName) {
                                    likeMode.current = true;
                                    break;
                                }
                                else {
                                    likeMode.current = false;
                                }
                            }
                        }
                    }
                    else if (loginMaintain == "false") {
                        if (user.nickname != null) {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i] == user.nickname) {
                                    likeMode.current = true;
                                    break;
                                }
                                else {
                                    likeMode.current = false;
                                }
                            }
                        }
                    }
                    else if (loginMaintain == null) {
                        likeMode.current = false;
                    }
                })

        }

        const getReCommentCount = async (developer, regdate) => {
            await axios.get(`${ip}/Comments/count?writer=${developer}&regdate=${regdate}`, {

            },
                {

                })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    totalCommentCount.current = totalCommentCount.current + data;
                })
        }

        const getComments = async (developer, regdate, contentType) => {

            await axios.get(`${ip}/Comments/comments?original_author=${developer}&original_regdate=${regdate}&contentType=${contentType}&depth=2`, {

            },
                {

                })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    totalCommentCount.current = data.length;
                    setComments(data);
                    getReCommentCount(developer, regdate);
                });

        }

        const getFileList = async (developer, regdate, contentType, storeType) => {
            await axios.get(`${ip}/Files/files/${developer}/${regdate}/${contentType}/${storeType}/1`, {

            }, {

            })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    if (storeType == "pcGame") {
                        setPCGame(data[0]);
                    }
                    else if (storeType == "mobileGame") {
                        setMobileGame(data[0]);
                    }

                    else if (storeType == "gameImage") {
                        setMainImg(data[0]);
                    }
                    else if (storeType == "gameBanner") {
                        setBanner(data[0]);
                    }
                });
        }

        axios.get(`${ip}/Games/game?viewer=${loginMaintain == "true" ? userInfo.nickName : user.login_state == "allok" ? user.nickname : ""}&developer=${developer}&regdate=${regdate}&contentType=${contentType}`, {

        },
            {

            })
            .then(res => res.data)
            .then(data => {
                console.log("모바일 게임 다운로드 개수--------------------------------------"+data.mobileGameCount);
                console.log("PC 게임 다운로드 개수--------------------------------------"+data.pcGameCount);
                setTitle(data.title);
                setContent(data.content);
                setUpdatedate(data.updatedate);
                setVisitcnt(data.visitcnt);  
                setPCGameCount(data.pcGameCount);
                setMobileGameCount(data.mobileGameCount);
                setImgCount(data.imgCount);
                setBannerCount(data.bannerCount);
                setURL(data.url);
                setContact(data.contact); 
                setGenre(data.genre);

                getRole(data.developer);
                getComments(data.developer, data.regdate, data.contentType, data.depth);
                getLikers(data.developer, data.regdate, data.contentType, data.depth);

                if (data.pcGameCount > 0) {
                    getFileList(data.developer, data.regdate, data.contentType, "pcGame");
                }

                if (data.mobileGameCount > 0) {
                    getFileList(data.developer, data.regdate, data.contentType, "mobileGame");
                }

                if (data.imgCount > 0) {
                    getFileList(data.developer, data.regdate, data.contentType, "gameImage");
                }

                if (data.bannerCount > 0) {
                    getFileList(data.developer, data.regdate, data.contentType, "gameBanner");
                }

                if (contentType==="official") {
                    setType("공식");
                }
                else if (contentType==="indie") {
                    setType("인디");
                }


            })

    }, [toggleState, toggleState2]);



    const addLike = async (e) => {

        await axios.post(`${ip}/Likes/like`, {
            liker: loginMaintain == "true" ? userInfo.nickName : user.nickname,
            master: developer,
            regdate: regdate,
            depth: 1,
            contentType: contentType,
        },
            {
                headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
            })
            .then(res => {
                /* regenerateAccessTokenOrLogout(res, addLike, e); */
                return res.data;
            })
            .then(data => {
                setLikecount(data.length);
                likeMode.current = true;
            })
    }




    const reduceLike = async (e) => {
        if (likecount > 0) {
            await axios.delete(`${ip}/Likes/like/${loginMaintain == "true" ? userInfo.nickName : user.nickname}/${developer}/${regdate}/${contentType}/1`,
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` }
                })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    setLikecount(data.length);
                    likeMode.current = false;
                })

        }
        else return;
    }



    const addComment = (data, Comments) => {
        if (Comments.length > 0) {
            const lastCmtIndex = Comments.length - 1;
            const addedCmtId = Comments[lastCmtIndex].id + 1;
            const newComment = {
                id: addedCmtId,
                original_author: developer,
                original_regdate: regdate,
                author: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                contentType: contentType,
                content: replyChangeValue,
                regdate: data.regdate,
                updatedate: data.updatedate,
            };
            setComments([...Comments, newComment]);
            setReplyChangeValue("<p><br></p>");
        }
        else if (Comments.length === 0) {
            const addedCmtId = 1;
            const newComment = {
                id: addedCmtId,
                original_author: developer,
                original_regdate: regdate,
                author: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content: replyChangeValue,
                regdate: data.regdate,
                updatedate: data.updatedate,
                contentType: contentType,

            };
            setComments([...Comments, newComment]);
            setReplyChangeValue("<p><br></p>");
        }

    };

    const addComment2 = (data, Comments) => {
        if (Comments.length > 0) {
            const lastCmtIndex = Comments.length - 1;
            const addedCmtId = Comments[lastCmtIndex].id + 1;
            const newComment = {
                id: addedCmtId,
                original_author: developer,
                original_regdate: regdate,
                author: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content: replyChangeValue2,
                regdate: data.regdate,
                updatedate: data.updatedate,
                contentType: contentType,
            };
            setComments([...Comments, newComment]);
            setReplyChangeValue2('<p><br></p>');
        }
        else if (Comments.length === 0) {
            const addedCmtId = 1;
            const newComment = {
                id: addedCmtId,
                original_author: developer,
                original_regdate: regdate,
                author: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content: replyChangeValue2,
                regdate: data.regdate,
                updatedate: data.updatedate,
                contentType: contentType,
            };
            setComments([...Comments, newComment]);
            setReplyChangeValue2('<p><br></p>');
        }
    }

    const editComment = (commentId, editValue) => {
        let newComments = Comments.map((item) => {
            if (item.id === commentId) {
                item.content = editValue;
            }
            return item;
        });

        setComments(newComments);
    };

    const deleteComment = (commentId) => {
        let newComments = Comments.filter(item => item.id !== commentId);
        setComments(newComments);
        setToggleState(!toggleState);
    }


    const registerReply = async (e) => {
        e.preventDefault();
        if (replyChangeValue !== '<p><br></p>') {
            await axios.post(`${ip}/Comments/comment`, {
                original_author: developer,
                original_regdate: regdate,
                author: loginMaintain == "true" ? userInfo.nickName : user.nickname,
                content: replyChangeValue,
                contentType: contentType,
                depth: 2,
            },
                {
                    headers: { Authorization: loginMaintain == "true" ? `Bearer ${userInfo.accessToken}` : `Bearer ${user.access_token}` },
                })
                .then((res) => {
                    /* regenerateAccessTokenOrLogout(res, registerReply, e); */
                    return res.data;
                })
                .then((data) => {
                    addComment(data, Comments);
                    setToggleState(!toggleState);
                    setReplyChangeValue("<p><br></p>");
                    dispatch(point(user.point + 5));

                    return;

                });
        }
        else if (replyChangeValue === '<p><br></p>' && replyChangeValue.length === 11) {
            setModalFreeArticleReplyCommentOnOff(!ModalFreeArticleReplyCommentOnOff);
            return;
        }
    }


    const setReplyValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        if (innerText === "댓글순") {
            const FillerState = Comments.sort((a, b) => b.recomment_count - a.recomment_count);
            setComments(FillerState);
            setPage(1);
        }
    }

    const setCurrentValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        if (innerText === "최신순") {
            const FillerState = Comments.sort((a, b) => new Date(b.regdate) - new Date(a.regdate));
            setComments(FillerState);
            setPage(1);
        }
    }

    const setPastValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        if (innerText === "과거순") {
            const FillerState = Comments.sort((a, b) => new Date(a.regdate) - new Date(b.regdate));
            setComments(FillerState);
            setPage(1);
        }
    }

    const setLikeValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        if (innerText === "추천순") {
            const FillerState = Comments.sort((a, b) => b.likecount - a.likecount);
            setComments(FillerState);
            setPage(1);
        }
    }

    const ScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }


    useEffect(() => {
        function handleOuside(e) {
            if (FillterRef.current && !FillterRef.current.contains(e.target)) {
                setFitterDropdown(false);
            };
        };

        if (!FitterDropdown) {
            document.addEventListener("mousedown", handleOuside);
        };
        return () => {
            document.removeEventListener("mousedown", handleOuside);
        };
    }, [FillterRef]);

    useEffect(() => {
        if (Comments.length > 0 && CommentSize.length === 0) {
            setPage(page - 1);
        }
    }, [CommentSize.length, Comments.length]);

    return (
        <GameViewBackground>
            <ReportModal
                ReportMode={reportMode}
                setReportMode={setReportMode}
                master={selectedReportWriter}
                regdate={selectedReportRegdate}
                contentType={selectedReportContentType}
                depth={selectedReportDepth}
            />

            {banner == {} ? <></> : <BackgroundEffect />}
            {banner == {} ? <DefaultBackground /> : <GameViewBackgroundImg src={`${ip}/Files/file/${banner.id}/${banner.uploader}/${banner.regdate}/${banner.contentType}/${banner.storeType}/1`} />}

            <GameViewAllBox>
                <GameTitleAllBox>
                    <GameTitleTextBox>
                        <GameText> {type} 게임</GameText>
                        <GameTitleText>{title}</GameTitleText>
                    </GameTitleTextBox>
                    {/* <Link
                    to={`/GameUpdatePage/${contentType}`} state={{ developer: developer, regdate: regdate, title: title, content: content, genre: genre, URL: URL, PCGame: PCGame, mobileGame: mobileGame, mainImg: mainImg, banner: banner}}
                    style={{
                        display: loginMaintain == null ? "none" : loginMaintain == "true" ?
                            (userInfo == null ?
                                "none" : (userInfo.loginState === "allok" ?
                                    (userInfo.nickName == developer ? "block" : "none") : "none")) :
                            (user.login_state === "allok" ?
                                (user.nickname == developer ?
                                    "block" : "none") : "none"),
                        color: "white",
                        fontSize: "21px",
                        cursor: "pointer",
                        }}>
                    수정
                    </Link> */}
                    {/* <Delete
                        LoginMaintain={loginMaintain}
                        User={user.login_state}
                        UserInfo={userInfo}
                        UserInfoState={userInfo == null ?
                            null : userInfo.loginState}
                        UserInfoNickname={userInfo == null ?
                            (user.login_state === "allok" ?
                                user.nickname : null) : userInfo.nickName}
                        UserInfoRole={userInfo == null ?
                            (user.login_state === "allok" ?
                                user.role : null) : userInfo.role}
                        onClick={() => setDeleteMode(!deleteMode)}
                    >삭제</Delete> */}
                    <BackButton onClick={() => navigate(-1)}>
                        뒤로가기
                    </BackButton>
                </GameTitleAllBox>

                

                <GameInformaionAllBox>
                    <GameAllBox>
                        <GameInformaionImgBox>
                            <GameInformaionImg src={`${ip}/Files/file/${mainImg.id}/${mainImg.uploader}/${mainImg.regdate}/${mainImg.contentType}/${mainImg.storeType}/1`} />
                        </GameInformaionImgBox>

                        <GameIntroduceBox>
                            <GameExplanationText>게임 설명</GameExplanationText>
                            <GameExplanation>
                                <Information dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                            </GameExplanation>
                        </GameIntroduceBox>

                        <SingleReplyBox>
                            <ReplyFillAllBox>
                                <ReplyCounterAllBox>
                                    {Comments.length > 0 ?
                                        <ReplyCountBox>
                                            총 {totalCommentCount.current}개 댓글
                                        </ReplyCountBox> : ""}
                                </ReplyCounterAllBox>

                                <FitterSelectAllBox ref={FillterRef} onClick={() => setFitterDropdown(!FitterDropdown)}>
                                    <FitterSelectBox show={FitterDropdown}>
                                        <FitterSelectList onClick={(e) => setCurrentValue(e)}>최신순</FitterSelectList>
                                        <FitterSelectList onClick={(e) => setPastValue(e)}>과거순</FitterSelectList>
                                        <FitterSelectList onClick={(e) => setLikeValue(e)}>추천순</FitterSelectList>
                                        <FitterSelectList onClick={(e) => setReplyValue(e)}>댓글순</FitterSelectList>
                                    </FitterSelectBox>
                                    <FitterSelectValue><FitterSelectText>{Fitter}</FitterSelectText></FitterSelectValue>
                                    <FitterArrowBox direction={FitterDropdown}>{FitterDropdown ? "▲" : "▼"}</FitterArrowBox>
                                </FitterSelectAllBox>


                            </ReplyFillAllBox>

                            <ReplyDeleteModal
                                setReplyDeleteMode={setReplyDeleteMode}
                                ReplyDeleteMode={ReplyDeleteMode}
                                loginMaintain={loginMaintain}
                                userInfo={userInfo}
                                user={user}
                                deleteComment={deleteComment}
                                regdate={ModalReplyDeleteRegdate}
                                replyer={ModalReplyDeleteReplyer}
                                setToggleState={setModalReplyDeleteSetToggleState}
                                toggleState={ModalReplyDeleteToggleState}
                                id={ModalReplyDeleteId}
                                contentType={contentType}
                            />

                            <CommentBox>
                                {Comments.length === 0 && <NotPage />}
                                {Comments.length > 0 &&
                                    Comments.slice(offset, offset + limit).map(Comment => {
                                        const commentId = Comment.id;

                                        return (
                                            <SingleReply
                                                key={commentId}
                                                Comment={Comment}
                                                reCommentCount={reCommentCount}
                                                isEditing={commentId === selectedCommentIndex ? true : false}
                                                setReCommentCount={setReCommentCount}
                                                setSelectedCommentIndex={setSelectedCommentIndex}
                                                addComment={addComment}
                                                editComment={editComment}
                                                deleteComment={deleteComment}

                                                setModalReplyDeleteRegdate={setModalReplyDeleteRegdate}
                                                setModalReplyDeleteReplyer={setModalReplyDeleteReplyer}

                                                setModalReplyDeleteSetToggleState={setModalReplyDeleteSetToggleState}
                                                setModalReplyDeleteToggleState={setModalReplyDeleteToggleState}

                                                setModalReplyDeleteId={setModalReplyDeleteId}

                                                reportMode={reportMode}
                                                setReportMode={setReportMode}
                                                setSelectedReportWriter={setSelectedReportWriter}
                                                setSelectedReportRegdate={setSelectedReportRegdate}
                                                setSelectedReportContentType={setSelectedReportContentType}
                                                setSelectedReportDepth={setSelectedReportDepth}

                                                setReplyDeleteMode={setReplyDeleteMode}
                                                ReplyDeleteMode={ReplyDeleteMode}

                                            />
                                        );
                                    })
                                }
                                {Comments.length > 0 &&
                                    <ReplyPagination
                                        total={Comments.length}
                                        limit={limit}
                                        page={page}
                                        setPage={setPage}
                                        offset={offset}
                                    />
                                }

                                {ModalReplyCommentOnOff ? <GameReplyModal
                                    setModalReplyCommentOnOff={setModalReplyCommentOnOff}
                                    ModalReplyCommentOnOff={ModalReplyCommentOnOff}
                                /> : <></>}

                                {ModalFreeArticleReplyCommentOnOff ? <ArticleReplyModal
                                    setModalFreeArticleReplyCommentOnOff={setModalFreeArticleReplyCommentOnOff}
                                    ModalFreeArticleReplyCommentOnOff={ModalFreeArticleReplyCommentOnOff}
                                /> : <></>}

                                <CommentForm
                                    LoginMaintain={loginMaintain}
                                    UserInfo={userInfo} User={userInfo == null ?
                                        null : userInfo.loginState}
                                    UserCheck={user.login_state}
                                    UserNicknameCheck={user.nickname}
                                    UserNickname={userInfo == null ?
                                        null : userInfo.nickName}
                                    Writer={developer}
                                    onSubmit={registerReply}>
                                    <CommentArea>
                                        <CommentProfile>
                                            <CommentUserProfile src={loginMaintain == "true" ? `${ip}/Users/profileImg/${userInfo.nickName}` : `${ip}/Users/profileImg/${user.nickname}`} />
                                        </CommentProfile>
                                        <CommentInputBox>
                                            <Editer
                                                placeholder="여러분의 참신한 생각이 궁금해요. 댓글을 입력해 주세요!"
                                                value={replyChangeValue}
                                                onChange={(content, delta, source, editor) => setReplyChangeValue(editor.getHTML())}
                                                modules={modules}
                                                formats={formats}>
                                            </Editer>
                                        </CommentInputBox>
                                    </CommentArea>

                                    <CommentBtnBox onClick={() => ScrollTop()}>
                                        <CommentBtn>댓글 쓰기</CommentBtn>
                                    </CommentBtnBox>
                                </CommentForm>

                            </CommentBox>
                        </SingleReplyBox>
                    </GameAllBox>

                    <GameInformaionBox>
                        <GameInformaionTextBox>

                            <GameIntroduceSubTextBox>
                                <GameIntroduceTextBox>
                                    <GameIntroduceText>게임정보</GameIntroduceText>
                                </GameIntroduceTextBox>
                                <GameIntroduceSubTextAllBox>
                                    <GameIntroduceSubText>
                                        장르 : {genre}
                                    </GameIntroduceSubText>
                                    <GameIntroduceSubText>
                                        창작자 : {developer}
                                    </GameIntroduceSubText>

                                    <GameIntroduceSubText>
                                        출시일 : {dayjs(GameInformaion[0].regdate).format("YY.MM.DD")}
                                    </GameIntroduceSubText>
                                    
                                    <GameIntroduceSubText>
                                        추천수 : {likecount}
                                    </GameIntroduceSubText>

                                    <LikeCheckBtn
                                        LoginMaintain={loginMaintain}
                                        UserInfo={userInfo == null ? null : userInfo.loginState}
                                        User={user.login_state}
                                        onClick={() => { likeMode.current === false ? addLike() : reduceLike() }}>
                                        {likeMode.current === false ? <LikeImg src={LikeImgBtn} /> : <LikeImg src={LikeImgFillBtn} />}
                                    </LikeCheckBtn>

                                </GameIntroduceSubTextAllBox>

                                <ButtonAllBox>

                                    {PCGameCount === 0 ? <></> :
                                        <DownloadBtn>
                                            <DownloadLink href={`${ip}/Files/file/${PCGame.id}/${PCGame.uploader}/${PCGame.regdate}/${PCGame.contentType}/${PCGame.storeType}/${PCGame.depth}`}>
                                                <DownloadImg src={DownloadImgBtn} />
                                            </DownloadLink>
                                        </DownloadBtn>}


                                    {MobileGameCount === 0 ? <></> :
                                        <MoblieBtn>
                                            <DownloadLink href={`${ip}/Files/file/${mobileGame.id}/${mobileGame.uploader}/${mobileGame.regdate}/${mobileGame.contentType}/${mobileGame.storeType}/${mobileGame.depth}`}>
                                                <MobileImg src={MobileImgBtn} />
                                            </DownloadLink>
                                        </MoblieBtn>}


                                    {URL === "" ? <></> :
                                        <PlayStorekBtn>
                                            <DownloadLink href={URL}>
                                                <PlayStoreImg src={PlayStore} />
                                            </DownloadLink>
                                        </PlayStorekBtn>}

                                </ButtonAllBox>
                            </GameIntroduceSubTextBox>

                        </GameInformaionTextBox>

                        <DeveloperInformationBox>
                            <DeveloperInformationText>개발자 연락처</DeveloperInformationText>
                            <DeveloperInformationTextBox>
                                <DeveloperText>
                                    업로더 : {developer}
                                </DeveloperText>
                                <DeveloperText>
                                    contact : {contact==null ? "미등록" : contact}
                                </DeveloperText>
                            </DeveloperInformationTextBox>
                        </DeveloperInformationBox>

                    </GameInformaionBox>
                </GameInformaionAllBox>

            </GameViewAllBox >
        </GameViewBackground >
    );
}

export default Game;

const DefaultBackground = styled.div
    `
    width: 100%;
    height: 50vw;
`

const Editer = styled(ReactQuill)
    `
    display: flex;
    flex-direction: column;

    .ql-editor.ql-blank::before{
        color: white;
    }

    .ql-editor ol, .ql-editor ul
    {
        color: white;
    }

    .ql-editor
    {
        margin: 0px -2px -2px 0px;
        min-height: 140px;
        font-size: 20px;
    }

    .ql-editor p
    {
        color: white;
    }

    .ql-snow .ql-picker.ql-expanded .ql-picker-options
    {
        display: block;
        margin-top: -133px;
        top: 100%;
        z-index: 1;
    }

    .ql-editor::-webkit-scrollbar 
    {
        display: none;
    }

    .ql-container::-webkit-scrollbar{
        background: gray;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
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
        order: 2;
    }

    .ql-toolbar.ql-snow{
        background: white;
        border: none;
        span:nth-child(2){
            .ql-picker-options{
                margin: -170px 0px 0px 0px;
            }
        }
    }
    }

    .ql-snow .ql-picker.ql-expanded .ql-picker-options {
        display: block;
        margin: -135px 0px 0px 0px;
        top: 100%;
        z-index: 1;
    }

    #ql-picker-options-0 {
        margin-top: -171px;
        top: 100%;
        z-index: 1;
    }

    .ql-tooltip.ql-editing
    {
        left: 0% !important;
        top: 86% !important;
    }

`

const CommentForm = styled.form
    `
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.User === "allok" ? "block" : "none")) :
        (props.UserCheck === "allok" ? "block" : "none")};
`

const CommentArea = styled.div
    `
    display: grid;
    grid-template-columns: 0fr 3fr ;
    margin: 60px 0px 15px 0px;
`

const CommentProfile = styled.div
    `
    margin: -20px 22px 0px 0px;
`

const CommentBtn = styled.button
    `
    background: #55AAFF;
    outline: none;
    width: 100px;
    border-radius: 10px;
    margin: 10px 0px 0px 0px;
    font-size: 19px;
    border: none;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
`

const CommentBtnBox = styled.div
    `
    display: flex;
    justify-content: end;
`

const CommentInputBox = styled.div
    `
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 2fr;
    border: solid 3px white;
    border-radius: 10px;
    overflow: hidden;
`

const CommentUserProfile = styled.img
    `
    width: 43px;
    height: 43px;
    border: none;
    border-radius: 30px;
    margin: 21px 0px 0px 0px;
`

const SingleReplyBox = styled.div
    `
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: rgba(41,41,41,1.7);
    border-radius: 8px;
    padding: 33px;
    margin: 20px 0px 0px 0px;
`

const ReplyFillAllBox = styled.div
    `
    display: flex;
    justify-content: space-between;
    border-bottom: solid 2px white;
    padding: 0px 0px 30px 0px;
`

const ReplyCounterAllBox = styled.div
    `

`

const ReplyCountBox = styled.div
    `
    display: flex;
    font-size: 20px;
    color: white;
`

const FitterSelectAllBox = styled.div
    `
    width: 100px;
    height: 21px;
    border: solid 2px #007aff;
    cursor: pointer;
    background: #dee2e6;
    border-radius: 10px;
    margin: -11px 9px 0px 11px;
    height: 39px;
    -webkit-tap-highlight-color:transparent;
    @media (min-width:250px) and (max-width:607px)
    {
        margin: 0px 7px -12px 7px;
    }
`

const FillterSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 104px;
    }
`

const FitterSelectBox = styled.ul
    `
    position: absolute;
    display: ${props => props.show ? "block" : "none"};
    list-style: none; 
    margin: 44px 0px 0px -2px;
    border: solid 2px ${props => props.theme.borderColor};
    background: #dee2e6;
    width: 100px;
    height: 104px;
    padding: 0px;
    overflow: hidden;
    text-align: center;
    border-radius: 5px;
    animation: ${FillterSlideDown} 0.5s;
`

const FitterSelectList = styled.li
    `
    color: black;
    padding: 4px 0px 4px 0px;
    &:hover
    {
        background-color: ${(props) => props.theme.DropDownListColor};
    }
`

const FitterSelectValue = styled.div
    `
    position: absolute;
    margin: 11px 0px 11px 20px;
    white-space: nowrap;
`

const FitterSelectText = styled.span
    `
    color: black;
    font-weight: bold;
`

const FitterArrowBox = styled(ArrowBox)
    `
    color: #007aff;
    margin: ${props => props.direction ? "9px 0px 11px 75px" : "11px 0px 11px 75px"};
`

const CommentBox = styled.div
    `
    
`

const GameIntroduceBox = styled.div
    `
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: rgba(41,41,41,1.7);
    border-radius: 8px;
    padding: 33px;
    margin: 20px 0px 0px 0px;
    min-height: 300px;
`

const GameExplanationText = styled.span
    `
    color: white;
    font-size: 30px;
    font-weight: bold;
`

const GameExplanation = styled.p
    `
    color: white;
    font-size: 20px;
    font-weight: bold;
`
const Information = styled.div
    `
    font-size: 24px;
`

const GameAllBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const DeveloperInformationBox = styled.div
    `
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: rgba(41,41,41,1.7);
    border-radius: 8px;
    padding: 20px 33px 20px 33px;
    margin: 20px 0px 0px 0px;
`

const DeveloperInformationText = styled.span
    `
    color: white;
    font-size: 30px;
    font-weight: bold;
`

const DeveloperText = styled(DeveloperInformationText)
    `
    color: white;
    font-size: 15px;
    font-weight: bold;
    word-break: break-all;
    &:not(:first-child){
        margin: 10px 0px 0px 0px;
    }
`

const DeveloperInformationTextBox = styled.div
    `
    display: flex;
    flex-direction: column;
    margin: 20px 0px 0px 0px;
`

const GameIntroduceSubTextAllBox = styled.div
    `
    margin: 50px 0px 50px 0px;
    display: flex;
    flex-direction: column;
    color: white;
    font-size: 19px;
`

const LikeBtn = styled.div
    `
    display: ${props => props.LoginMaintain == null ? "none" : (props.LoginMaintain == "true" ? (props.UserInfo === "allok" ? "block" : "none") : (props.User === "allok" ? "block" : "none"))};
`
const DownloadBtn = styled.div
    `
    display: flex;
    box-sizing: border-box;
    &:not(:last-child){
        margin: 0px 0px 20px 0px;
    }
`

const LikeCheckBtn = styled(DownloadBtn)
    `
    display: ${props => props.LoginMaintain == null ? "none" : (props.LoginMaintain == "true" ? (props.UserInfo === "allok" ? "flex" : "none") : (props.User === "allok" ? "flex" : "none"))};
    cursor: pointer;
`

const PlayStorekBtn = styled(DownloadBtn)
    `

`

const DownloadImg = styled.img
    `
    width: 100%;
    height: 100%;
`

const LikeImg = styled(DownloadImg)
    `

`
const MobileImg = styled(DownloadImg)
    `

`
const PlayStoreImg = styled(DownloadImg)
    `

`

const MoblieBtn = styled(DownloadBtn)
    `
    margin: 0px 0px 0px 0px;
`

const DownloadLink = styled.a
    `
    text-decoration: none;
`

const ButtonAllBox = styled.div
    `
`

const GameIntroduceTextBox = styled.div
    `

`

const GameIntroduceSubTextBox = styled.div
    `
`

const GameIntroduceSubText = styled.span
    `
    &:not(:last-child)
    {
        margin: 0px 0px 20px 0px;
    }
`

const GameIntroduceText = styled.span
    `
    color: white;
    font-size: 30px;
    font-weight: bold;
`

const GameInformaionAllBox = styled.div
    `
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 40px;
`

const GameInformaionImg = styled.img
    `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

const GameInformaionImgBox = styled.div
    `
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.1%;
    overflow: hidden;
    border-radius: 8px;
`

const GameInformaionBox = styled.div
    `
`

const GameInformaionTextBox = styled.div
    `
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: rgba(41,41,41,1.7);
    border-radius: 8px;
    padding: 33px;
`

const GameTitleAllBox = styled.div
    `
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const BackButton = styled.div
    `
    cursor: pointer;
    display: flex;
    width: 140px;
    height: 50px;
    border-radius: 8px;
    background: transparent;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 26px;
    color: white;
`

const GameTitleTextBox = styled.div
    `
    display: flex;
    flex-direction: column;
    margin: 0px 0px 20px 0px;
`


const Delete = styled.div
`
    display: ${props => props.LoginMaintain == null ? "none" : props.LoginMaintain == "true" ? (props.UserInfo == null ? "none" : (props.UserInfoState === "allok" ? (props.UserInfoNickname == props.Writer || props.UserInfoRole == "ADMIN" ? "block" : "none") : "none")) :
        (props.User === "allok" ? (props.UserInfoNickname == props.Writer || props.UserInfoRole == "ADMIN" ? "block" : "none") : "none")};
    cursor : pointer;
    color : white;
    font-size: 21px;
`



const GameTitleText = styled.span
    `
    color: white;
    font-size: 30px;
    font-weight: bold;
`

const GameText = styled(GameTitleText)
    `
    font-size: 18px;
    font-weight: bold;
    margin: 0px 0px 10px 0px;
`

const GameViewAllBox = styled.div
    `
    max-width: 1280px;
    margin: -38vw auto 0 auto;
    position: relative;
    z-index: 2;
    padding: 20px 20px 300px 20px;
`

const GameViewBackground = styled.div
    `
    background: rgba(25,25,25,1);
`

const GameViewBackgroundImg = styled.img
    `
    width: 100%;
    height: 100%;
`

const BackgroundEffect = styled.div
    `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 56vw;
    background-image: linear-gradient(to top, rgba(25,25,25,1), transparent);
}
`
import { styled, keyframes } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { SearchInputBox, SearchInput, SearchInputIconBox, SearchButton } from "../Header/TopNavBar";
import { ArrowBox } from "../Sign/Signinput";
import { HiOutlineSearch } from "react-icons/hi";
import { AiFillCheckCircle } from "react-icons/ai";
import Pagination from "./Pagination";
import { useRecoilState } from "recoil";
import { firstReset } from "../../Recoil/Darkmode/Darkmode";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotPage from "../Error/NotPage";
import { BiLogoDevTo } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";
import WriterProfile from "./WriterProfile";
import { AiOutlineEye } from "react-icons/ai";
import { BsHandThumbsUp } from "react-icons/bs";
import DOMPurify from "dompurify";

const Board = () => {
    const { contentType } = useParams();
    const [posts, setPosts] = useState([]);
    const [Search, setSearch] = useState("");
    const [SearchFillText, setSearchFillText] = useState("제목");
    const [Fitter, setFitter] = useState("최신순");
    const [LimtText, setLimtText] = useState("10개");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [boardType, setBoardType] = useState("");
    const offset = (page - 1) * limit;
    const [FitterDropdown, setFitterDropdown] = useState(false);
    const [LimitDropdown, setLimitDropdown] = useState(false);
    const [SearchFillDropdown, setSearchFillDropdown] = useState(false);
    const [FirstReset, setFirstReset] = useRecoilState(firstReset);
    const FillterRef = useRef("");
    const LimitRef = useRef("");
    const SearchFillRef = useRef("");
    const ip = localStorage.getItem("ip");
    const user = useSelector(state => state.user);
    const loginMaintain = localStorage.getItem("loginMaintain");
    const [SearchList, setSearchList] = useState([]);
    const PostsSize = posts.slice(offset, offset + limit);
    const [FillterState, setFillerState] = useState("title");
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);


    useEffect(() => {
        function handleOuside(e) {
            if (SearchFillRef.current && !SearchFillRef.current.contains(e.target)) {
                setSearchFillDropdown(false);
            };
        };

        if (!SearchFillDropdown) {
            document.addEventListener("mousedown", handleOuside);
        };
        return () => {
            document.removeEventListener("mousedown", handleOuside);
        };
    }, [SearchFillRef]);

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
        function handleOuside(e) {
            if (LimitRef.current && !LimitRef.current.contains(e.target)) {
                setLimitDropdown(false);
            };
        };

        if (!LimitDropdown) {
            document.addEventListener("mousedown", handleOuside);
        };
        return () => {
            document.removeEventListener("mousedown", handleOuside);
        };
    }, [LimitRef]);

    const OnSearch = (e) => {
        const currentSearch = e.target.value;
        setSearch(currentSearch);
    }

    const setCurrentValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        const FillerState = SearchList.sort((a, b) => new Date(b.regdate) - new Date(a.regdate));
        setSearchList(FillerState);
        setPage(1);
    }

    const setPastValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        const FillerState = SearchList.sort((a, b) => new Date(a.regdate) - new Date(b.regdate));
        setSearchList(FillerState);
        setPage(1);
    }

    const setLikeValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        const FillerState = SearchList.sort((a, b) => b.likecount - a.likecount);
        setSearchList(FillerState);
        setPage(1);
    }

    const setViewValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        const FillerState = SearchList.sort((a, b) => b.visitcnt - a.visitcnt);
        setSearchList(FillerState);
        setPage(1);
    }

    const setReplyValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        const FillerState = SearchList.sort((a, b) => b.reply_count - a.reply_count);
        setSearchList(FillerState);
        setPage(1);
    }


    const setTitleValue = (e) => {
        const { innerText } = e.target;
        setSearchFillText(innerText);
    }

    const setWriterValue = (e) => {
        const { innerText } = e.target;
        setSearchFillText(innerText);
    }

    const setContentValue = (e) => {
        const { innerText } = e.target;
        setSearchFillText(innerText);
    }

    const setLimitValue = (e) => {
        const { innerText } = e.target;
        const Limit = e.target.value;
        setLimtText(innerText);
        setLimit(Limit);
        setPage(1);
        setFirstReset(false);
    }

    useEffect(() => {
        if (posts.length > 0 && PostsSize.length === 0) {
            setPage(page - 1);
        }
    }, [PostsSize.length, posts.length]);

    useEffect(() => {
        axios.get(`${ip}/Articles/articles?contentType=${contentType}`, {

        },
            {

            })
            .then(res => res.data
            )
            .then(data => {
                console.log(data);
                setPosts(data);
                setSearchList(data);
            })

            if(contentType=="free"){
                setBoardType("자유게시판");
             }
             else if(contentType=="question"){
                 setBoardType("질문게시판");
             }
             else if(contentType=="notice"){
                 setBoardType("공지사항");
             }
             else if(contentType=="strategy"){
                 setBoardType("공략게시판");
             }

    }, [contentType]);



    const SearchSubmit = (e) => {
        e.preventDefault();

        if (Search === "") {
            axios.get(`${ip}/Articles/articles?contentType=${contentType}`, {

            },
                {

                })
                .then(res => res.data
                )
                .then(data => {
                    console.log(data);
                    setPosts(data);
                    setSearchList(posts);
                    setPage(1);
                })
        } else {
            const SearchResult = posts.filter((board) =>
                SearchFillText === "제목" ?
                    board.title.toUpperCase().includes(Search.toUpperCase()) :
                    SearchFillText === "작성자" ?
                        board.writer.toUpperCase().includes(Search.toUpperCase()) :
                        SearchFillText === "내용" ?
                            board.content.toUpperCase().includes(Search.toUpperCase()) :
                            board.title.toUpperCase().includes(Search.toUpperCase())
            );

            setSearchList(SearchResult);
            setSearch("");
            setPage(1);
        }
    }

    return (
        <FreeBoardBox>
            <InformationAllBox>
                <FreeBoardInformation>
                    <FreeBoardInformationText>{boardType}</FreeBoardInformationText>
                </FreeBoardInformation>
            </InformationAllBox>
            <SearchBox>
                <SearchAllBox>
                    <SearchForm onSubmit={(e) => SearchSubmit(e)}>
                        <FreeBoardSearchInputBox>
                            <FreeBoardSearchInput placeholder="게시물을 검색해 주세요!" value={Search} onChange={OnSearch} />
                            <FreeBoardSearchIconBox>
                                <FreeBoardSearchBtn><HiOutlineSearch /></FreeBoardSearchBtn>
                            </FreeBoardSearchIconBox>
                        </FreeBoardSearchInputBox>
                    </SearchForm>
                    <SearchFillSelectAllBox ref={SearchFillRef} onClick={() => setSearchFillDropdown(!SearchFillDropdown)}>
                        <SearchFillSelectBox show={SearchFillDropdown}>
                            <FitterSelectList onClick={(e) => setTitleValue(e)}>제목</FitterSelectList>
                            <FitterSelectList onClick={(e) => setWriterValue(e)}>작성자</FitterSelectList>
                            <FitterSelectList onClick={(e) => setContentValue(e)}>내용</FitterSelectList>
                        </SearchFillSelectBox>
                        <SearchFillValue writerText={SearchFillText}><FitterSelectText>{SearchFillText}</FitterSelectText></SearchFillValue>
                        <SearchFillArrowBox direction={SearchFillDropdown}>{SearchFillDropdown ? "▲" : "▼"}</SearchFillArrowBox>
                    </SearchFillSelectAllBox>
                </SearchAllBox>
                <FitterBox>


                    <FitterSelectAllBox ref={FillterRef} onClick={() => setFitterDropdown(!FitterDropdown)}>
                        <FitterSelectBox show={FitterDropdown}>
                            <FitterSelectList onClick={(e) => setCurrentValue(e)}>최신순</FitterSelectList>
                            <FitterSelectList onClick={(e) => setPastValue(e)}>과거순</FitterSelectList>
                            <FitterSelectList onClick={(e) => setReplyValue(e)}>댓글순</FitterSelectList>
                            <FitterSelectList onClick={(e) => setViewValue(e)}>조회순</FitterSelectList>
                            <FitterSelectList onClick={(e) => setLikeValue(e)}>추천순</FitterSelectList>
                        </FitterSelectBox>
                        <FitterSelectValue><FitterSelectText>{Fitter}</FitterSelectText></FitterSelectValue>
                        <FitterArrowBox direction={FitterDropdown}>{FitterDropdown ? "▲" : "▼"}</FitterArrowBox>
                    </FitterSelectAllBox>

                    <LimitSelectAllBox ref={LimitRef} onClick={() => setLimitDropdown(!LimitDropdown)}>
                        <LimmitSelectBox show={LimitDropdown}>
                            <LimitSelectList value={10} onClick={setLimitValue}>10개</LimitSelectList>
                            <LimitSelectList value={20} onClick={setLimitValue}>20개</LimitSelectList>
                            <LimitSelectList value={50} onClick={setLimitValue}>50개</LimitSelectList>
                        </LimmitSelectBox>
                        <LimitSelectValue><FitterSelectText>{LimtText}</FitterSelectText></LimitSelectValue>
                        <LimitArrowBox direction={LimitDropdown}>{LimitDropdown ? "▲" : "▼"}</LimitArrowBox>
                    </LimitSelectAllBox>

                    <WriteBtn 
                        contentType={contentType}
                        user={user} 
                    >
                        {loginMaintain == null ? 
                            <Link to='/Login'>
                                <WriteBtnText>글쓰기</WriteBtnText>
                            </Link> : 
                            loginMaintain == "true" ? 
                            userInfo == null ? 
                            <Link to='/Login'>
                                <WriteBtnText>글쓰기</WriteBtnText>
                            </Link> :
                        (userInfo.loginState === "allok" ? <Link to={`/WriteBoard/${contentType}`}><WriteBtnText>글쓰기</WriteBtnText></Link> : <Link to='/Login'><WriteBtnText>글쓰기</WriteBtnText></Link>) : (user.login_state === "allok" ? <Link to={`/WriteBoard/${contentType}`}><WriteBtnText>글쓰기</WriteBtnText></Link> : <Link to='/Login'><WriteBtnText>글쓰기</WriteBtnText></Link>)}
                    </WriteBtn>
                </FitterBox>
            </SearchBox>

            <BoardBox>
                {SearchList.length === 0 && <NotPage />}
                <BoardContentAllBox>
                    {SearchList.length !== 0 && SearchList.slice(offset, offset + limit).map(({ id, seq, title, writer, role, regdate, updatedate, visitcnt, reply_count, likecount, content, contentType, depth }) => (
                        <BoardContentBox key={id}>
                            <ReplyCountAllBox>
                                <ReplyCountBox>
                                    <ReplyCountText>답변</ReplyCountText>
                                    {reply_count}
                                </ReplyCountBox>
                            </ReplyCountAllBox>

                            <FreeBoardViewAllBox>
                                <ProfileAllBox>
                                    <WriterProfile writer={writer} />
                                    <ProfileBox>
                                        <UpdateBox>
                                            <BoardContentWriter>{writer}</BoardContentWriter>
                                            <CorrectionIcon writerRole={role}>
                                                <BiLogoDevTo />
                                            </CorrectionIcon>

                                            {regdate == updatedate ? "" :
                                                <CorrectionTextBox>
                                                    <CorrectionTextBoxIcon>
                                                        <AiFillCheckCircle />
                                                    </CorrectionTextBoxIcon>
                                                    <CorrectionText>
                                                        수정됨
                                                    </CorrectionText>
                                                </CorrectionTextBox>}
                                        </UpdateBox>
                                        <BoardContentViewtime>{dayjs(regdate).format("YY.MM.DD")}</BoardContentViewtime>
                                    </ProfileBox>
                                </ProfileAllBox>

                                <BoardTitleContentAllBox>
                                    <BoardContentTitle><Link to={`/Article/${writer}/${regdate}/${contentType}`}>{title}</Link></BoardContentTitle>
                                    <BoardCotent>
                                        <Link to={`/Article/${writer}/${regdate}/${contentType}`}><BoardCotentText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} /></Link>
                                    </BoardCotent>
                                </BoardTitleContentAllBox>
                                <ViewlikeAllBox>
                                    <ViewIcon><AiOutlineEye /></ViewIcon>
                                    <BoardContentCounter>{visitcnt}</BoardContentCounter>
                                    <LikeIcon><BsHandThumbsUp /></LikeIcon>
                                    <BoardlikeContentCounter>{likecount}</BoardlikeContentCounter>
                                </ViewlikeAllBox>

                            </FreeBoardViewAllBox>

                        </BoardContentBox>))}
                </BoardContentAllBox>
            </BoardBox>

            {SearchList.length > 0 &&
                <PageNationBox>
                    <Pagination
                        total={SearchList.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                        offset={offset}
                    />
                </PageNationBox>
            }

        </FreeBoardBox>
    );
}

export default Board;

const BoardTitleContentAllBox = styled.div
    `

`

const ProfileBox = styled.div
    `
`

const UpdateBox = styled.div
    `
    display: flex;
`

const ViewIcon = styled.i
    `
    font-size: 22px;
    display: flex;
`

const LikeIcon = styled(ViewIcon)
    `
    font-size: 18px;
    margin: 0px 0px 0px 6px;
`

const ViewlikeAllBox = styled.div
    `
    display: flex;
    justify-content: end;
    margin: 30px 0px 0px 0px;
`

const ProfileAllBox = styled.div
    `
    display: flex;
`

const FreeBoardViewAllBox = styled.div
    `
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ReplyCountAllBox = styled.div
    `

`

const ReplyCountText = styled.span
    `
    margin: 0px 0px 7px 0px;
`

const ReplyCountBox = styled.div
    `
    width: 64px;
    height: 73px;
    border: solid 2px ${props => props.theme.textColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 6px;
`

const WriteBtnText = styled.span
    `
    white-space: nowrap;
    -webkit-tap-highlight-color:transparent;
    -webkit-user-select: none;
`

const WriteBtn = styled.div
    `
    display: ${props => props.contentType!="notice" ? "flex": props.contentType=="notice" ? props.user.role=="ADMIN" ? "flex" : "none" : "flex"};
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 23px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    background: #6A9DDA;
    color: white;
    overflow: hidden;
    padding: 10px;
    font-weight: bold;
    -webkit-tap-highlight-color: transparent;
    &:hover
    {
        ${WriteBtnText}{
            background: rgba(0,0,0,0.2);
            padding: 30px;
        }
    }

    a
    {
            text-decoration: none;
            color: black;
    }
`

const SearchAllBox = styled.div
    `
    display: flex;
    margin: 0px 0px 0px 0px;
    align-items: center;

    @media (min-width:250px) and (max-width:607px)
    {
        display: flex;
        justify-content: center;
        margin: -28px 0px 24px 0px;
    }
`

const SearchForm = styled.form
    `
    margin: 0px 10px 0px 0px;
`

const BoardContentNumber = styled.div
    `
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 0px 10px 0px 10px;
    
`

const BoardCotent = styled(BoardContentNumber)
    `
    margin: 0px 0px 0px 0px;
    font-size: 14px;
    a{
        text-decoration: none;
    }
`

const BoardCotentText = styled.div
    `
    text-align: start;
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    cursor: pointer;
    p, span{
        color: ${props => props.theme.BoardTextView} !important;
        background-color: ${props => props.theme.backgroundColor} !important;
        transition: background-color 0.5s;
    }

    &:hover{
        p,span{
            color: #0090F9 !important;
        }
    }

`

const BoardContentTitle = styled(BoardContentNumber)
    `
    margin: 15px 0px 6px 0px;

    a{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-decoration: none;
        font-size: 20px;
        color: ${props => props.theme.textColor};

        &:hover
        {
            color: #0090F9;
        }
    }
`
const BoardContentViewtime = styled(BoardContentNumber)
    `
    font-size: 15px;
`
const BoardContentWriter = styled(BoardContentNumber)
    `
    font-size: 20px;
    margin: 0px 0px 6px 10px;
    cursor: pointer;
`

const CorrectionIcon = styled.i
    `
    display: ${props => props.writerRole === "DEVELOPER" ? "block" : "none"};
    svg
    {
        font-size: 25px;
        margin: 0px 0px 1px 0px;
    }
`

const CorrectionTextBox = styled.div
    `
    display: flex;
    margin: 7.2px 0px 0px 0px;
`
const CorrectionTextBoxIcon = styled.i
    `
    svg
    {
        margin: 0px 1px 0px 3px;
    }
`
const CorrectionText = styled.span
    `
    font-size: 13.5px;
`

const BoardContentCounter = styled(BoardContentNumber)
    `
    margin: 0px 0px 0px 5px;
}
`

const BoardlikeContentCounter = styled(BoardContentNumber)
    `
    margin: 0px 0px 0px 5px;
`

const BoardContentAllBox = styled.div
    `

`

const BoardContentBox = styled.div
    `
        display: flex;
        column-gap: 20px;
        text-align: center;
        padding: 20px 10px 20px 10px;
        color: ${(props) => props.theme.BoardTitle};
        font-weight: bold;
        &:not(:last-child)
        {
            border-bottom: solid 2px ${(props) => props.theme.textColor};
        }
`

const FitterSelectAllBox = styled.div
    `
    width: 100px;
    height: 21px;
    border: solid 2px ${(props) => props.theme.borderColor};
    cursor: pointer;
    background: #dee2e6;
    border-radius: 10px;
    margin: 0px 9px 0px 0px;
    height: 39px;
    -webkit-tap-highlight-color:transparent;
    @media (min-width:250px) and (max-width:607px)
    {
        margin: 0px 7px -12px 7px;
    }
`

const SearchFillSelectAllBox = styled(FitterSelectAllBox)
    `
    width: 83px;
    margin: 0px 9px 0px 0px;
`

const LimitSelectAllBox = styled(FitterSelectAllBox)
    `
    margin: 0px 9px 0px 0px;
`

const FitterArrowBox = styled(ArrowBox)
    `
    margin: ${props => props.direction ? "9px 0px 11px 75px" : "11px 0px 11px 75px"};
`

const SearchFillArrowBox = styled(ArrowBox)
    `
    margin: ${props => props.direction ? "9px 0px 11px 63px" : "11px 0px 11px 63px"};
`

const LimitArrowBox = styled(ArrowBox)
    `
    margin: ${props => props.direction ? "9px 0px 11px 75px" : "11px 0px 11px 75px"};
`

const FillterSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 120px;
    }
`

const SearchFillSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 72px;
    }
`

const LimitSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 72px;
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
    padding: 0px;
    height: 120px;
    overflow: hidden;
    text-align: center;
    border-radius: 5px;
    animation: ${FillterSlideDown} 0.5s;
`

const SearchFillSelectBox = styled(FitterSelectBox)
    `
    width: 83px;
    height: 72px;
    animation: ${SearchFillSlideDown} 0.5s;
`

const LimmitSelectBox = styled(FitterSelectBox)
    `
    height: 72px;
    animation: ${LimitSlideDown} 0.5s;
`

const FitterSelectText = styled.span
    `
    color: black;
    font-weight: bold;
`

const FitterSelectValue = styled.div
    `
    position: absolute;
    margin: 11px 0px 11px 20px;
    white-space: nowrap;
`

const SearchFillValue = styled(FitterSelectValue)
    `
    margin: ${props => props.writerText === "작성자" ? "11px 0px 11px 14px" : "11px 0px 11px 20px"};
`

const LimitSelectValue = styled(FitterSelectValue)
    `
    margin: 11px 0px 11px 25px;
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

const LimitSelectList = styled(FitterSelectList)
    `
`

const FreeBoardSearchInputBox = styled(SearchInputBox)
    `
    display: flex;
    border: none;
    height: 39px;
    width: 227px;
`

const FreeBoardSearchInput = styled(SearchInput)
    `
    display: block;
    margin: 0px 0px 0px 0px;
    padding: 0px 8px 0px 12px;
    height: 39px;
    font-size: 18px;
`

const FreeBoardSearchIconBox = styled(SearchInputIconBox)
    `
    display: block;
    margin: 0px 0px 0px 0px;
    height: 39px;
`

const FreeBoardSearchBtn = styled(SearchButton)
    `
    display: block;
    color: ${props => props.theme.textColor};
    padding: 5px 8px 0px 0px;
`

const FreeBoardInformation = styled.div
    `
    width: 191px;
    padding: 10px;
    text-align: center;
    border-radius: 20px;
    border: solid 2px ${props => props.theme.textColor};
    margin: 0px 0px 20px 0px;
`

const InformationAllBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const FreeBoardInformationText = styled.span
    `
    font-weight: bold;
    font-size: 20px;
    color: ${props => props.theme.textColor};
`

const FreeBoardBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const BoardBox = styled.div
    `
    display: flex;
    margin: 10px 0px 10px 0px;
    flex-direction: column;
    border-bottom: solid 2px ${(props) => props.theme.BoardTitle};

`

const FitterBox = styled.div
    `
    display: flex;
    justify-content: right;
    
    @media (min-width:250px) and (max-width:607px)
    {
        margin: 15px 0px 0px 0px;
    }
`

const SearchBox = styled.div
    `
    display: flex;
    justify-content: space-between;
    border-bottom: solid 2px ${(props) => props.theme.BoardTitle};
    padding: 20px 15px 20px 15px;

    @media (min-width:250px) and (max-width:607px)
    {
        flex-direction: column;
    }
`

const PageNationBox = styled.div
    `
    margin: 20px 0px 0px 0px;
`
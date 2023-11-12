import { styled, keyframes } from "styled-components";
import { useState, useRef, useEffect, useMemo } from "react";
import { SearchInputBox, SearchInput, SearchInputIconBox, SearchButton } from "../Header/TopNavBar";
import { ArrowBox } from "../Sign/Signinput";
import { HiOutlineSearch } from "react-icons/hi";
import Pagination from "./Pagination";
import DOMPurify from "dompurify";
import { useRecoilState } from "recoil";
import { firstReset } from "../../Recoil/Darkmode/Darkmode";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotPage from "./NotPage";
import { useSelector } from "react-redux";

import IndieGameMainImg from "./IndieGameMainImg";
import axios from "axios";

const IndieGamePage = () => {
    const { contentType } = useParams();
    const [posts, setPosts] = useState([]);
    const [Search, setSearch] = useState("");
    const [SearchFillText, setSearchFillText] = useState("제목");
    const [Fitter, setFitter] = useState("최신순");
    const [LimtText, setLimtText] = useState("10개");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
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

    useEffect(() => {
        axios.get(`${ip}/Games/games?contentType=${contentType}`, {

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
    }, []);

    const SearchSubmit = (e) => {
        e.preventDefault();
        if (Search === "") {
            axios.get(`${ip}/Games/games?contentType=${contentType}`, {

            },
                {

                })
                .then(res => res.data
                )
                .then(data => {
                    console.log(data);
                    setPosts(data);
                    setSearchList(data);
                    setPage(1);
                })
        } else {
            const SearchResult = posts.filter((board) =>
            SearchFillText === "제목" ?
                board.title.toUpperCase().includes(Search.toUpperCase()) :
                SearchFillText === "개발자" ?
                    board.developer.toUpperCase().includes(Search.toUpperCase()) :
                    SearchFillText === "내용" ?
                        board.content.toUpperCase().includes(Search.toUpperCase()) :
                        board.title.toUpperCase().includes(Search.toUpperCase())
            );
            setSearchList(SearchResult);
            setSearch("");
            setPage(1);
        }
    }

    useEffect(() => {
        if (posts.length > 0 && PostsSize.length === 0) {
            setPage(page - 1);
        }
    }, [PostsSize.length, posts.length]);


    

    const OnSearch = (e) => {
        const currentSearch = e.target.value;
        setSearch(currentSearch);
    }

    const setCurrentValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        const FillerState = SearchList.sort((a, b) => new Date(b.regdate) - new Date(a.regdate));
        setSearchList(FillerState);
    }

    const setPastValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        const FillerState = SearchList.sort((a, b) => new Date(a.regdate) - new Date(b.regdate));
        setSearchList(FillerState);
    }

    const setLikeValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        const FillerState = SearchList.sort((a, b) => b.likecount - a.likecount);
        setSearchList(FillerState);
    }

    const setTitleValue = (e) => {
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

    const ScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <FreeBoardBox>
            <InformationAllBox>
                <FreeBoardInformation>
                    <FreeBoardInformationText>인디 게임</FreeBoardInformationText>
                </FreeBoardInformation>
            </InformationAllBox>
            <SearchBox>
                <SearchAllBox>
                    <SearchForm onSubmit={(e) => SearchSubmit(e)}>
                        <FreeBoardSearchInputBox>
                            <FreeBoardSearchInput placeholder="게임을 검색해 주세요!" value={Search} onChange={OnSearch} />
                            <FreeBoardSearchIconBox>
                                <FreeBoardSearchBtn><HiOutlineSearch /></FreeBoardSearchBtn>
                            </FreeBoardSearchIconBox>
                        </FreeBoardSearchInputBox>
                    </SearchForm>
                    <SearchFillSelectAllBox ref={SearchFillRef} onClick={() => setSearchFillDropdown(!SearchFillDropdown)}>
                        <SearchFillSelectBox show={SearchFillDropdown}>
                            <FitterSelectList onClick={(e) => setTitleValue(e)}>제목</FitterSelectList>
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
                </FitterBox>
            </SearchBox>
            <BoardBox>
                {SearchList.length === 0 && <NotPage />}
                <BoardContentAllBox View={SearchList.length}>
                    {SearchList.length !== 0 && SearchList.slice(offset, offset + limit).map(({ id, seq, title, content, developer, regdate, updatedate, genre, url, visitcnt, reply_count, likecount, pcGameCount, mobileGameCount, contentType, depth}) => (
                       <BoardContentBox key={id}>
                           <Link to={`/Game/${developer}/${regdate}/${contentType}`} onClick={() => ScrollTop()}>
                               <SlideAllBox>
                                   <SlideBox>
                                      <IndieGameMainImg 
                                        uploader={developer} 
                                        regdate={regdate}
                                        contentType={contentType}
                                        storeType="gameImage"
                                        depth={depth}
                                      ></IndieGameMainImg>
                                   </SlideBox>

                                   <AllBox>
                                       <InformaionBoxTextBox>
                                           <TitleBox>{title}</TitleBox>
                                           <InformaionBox dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></InformaionBox>
                                       </InformaionBoxTextBox>
                                   </AllBox>
                               </SlideAllBox>
                           </Link>
                       </BoardContentBox>
                   ))}
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

export default IndieGamePage;

const AllBox = styled.div
    `
    position: absolute;
    display: none;
    flex-direction: column;
    justify-content: end;
    background: rgba(0,0,0,0.3);
    top: 0%;
    height: 100%;
    left: 0%;
    border-radius: 8px;
    width: 100%;
    overflow: hidden;
     @media (min-width:250px) and (max-width:560px)
    {
        width: 100%;
    }
`

const SlideAllBox = styled.div
    `
    position: relative;
    &:hover
    {
        ${AllBox}
        {
            display: flex;
        }
    }
    `

const SlideBox = styled.div
    `
    border-radius: 10px;
    overflow: hidden;
    transition: border 0.5s;
    height: 214px;
`

const ImgBox = styled.img
    `
    width: 100%;
    height: 100%;
`

const InformaionBoxTextBox = styled.div
    `
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: rgba(41,41,41,0.8);
`

const TitleBox = styled.div
    `
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 30px;
    color: white;
    margin: 0px 0px 10px 0px;
`

const InformaionBox = styled.div
    `
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: normal;
    p{
        margin: 0;
        text-decoration: none;
        color: white;
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

const BoardContentAllBox = styled.div
    `
    display: ${ props => props.View === 0 ? "none" : "grid"};
    grid-template-columns: repeat(auto-fill,386px);
    justify-content: center;
    grid-gap: 30px;
`

const BoardContentBox = styled.div
    `
        a{
            text-decoration: none;
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
        height: 72px;
    }
`

const SearchFillSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 48px;
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
    height: 72px;
    padding: 0px;
    overflow: hidden;
    text-align: center;
    border-radius: 5px;
    animation: ${FillterSlideDown} 0.5s;
`

const SearchFillSelectBox = styled(FitterSelectBox)
    `
    width: 83px;
    height: 48px;
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
    font-size: 18px;
    height: 39px;
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
    padding: 30px 30px 30px 30px;
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
    position: relative;
    justify-content: space-between;
    border-bottom: solid 2px ${(props) => props.theme.BoardTitle};
    padding: 20px 15px 20px 15px;
    z-index:1;

    @media (min-width:250px) and (max-width:607px)
    {
        flex-direction: column;
    }
`

const PageNationBox = styled.div
    `
    margin: 20px 0px 0px 0px;
`
import { styled, keyframes } from "styled-components";
import { useState, useRef, useEffect, useMemo } from "react";
import { SearchInputBox, SearchInput, SearchInputIconBox, SearchButton } from "../Header/TopNavBar";
import { ArrowBox } from "../Sign/Signinput";
import { HiOutlineSearch } from "react-icons/hi";
import Pagination from "./Pagination";
import DOMPurify from "dompurify";
import { useRecoilState } from "recoil";
import { firstReset } from "../../Recoil/Darkmode/Darkmode";
import { Link, useNavigate, useParams, useMatch } from "react-router-dom";
import NotPage from "./NotPage";
import { useSelector } from "react-redux";

import CpGdShopMainImg from "./CpGdShopMainImg";
import axios from "axios";

import { Goods } from "../CpGdShop/CpGdData";

const CpGdShopPage = () => {
    const { contentType } = useParams();
    const { View } = useParams();
    const Viewchange = View;

    const [posts, setPosts] = useState(
        View == "Coupon" ?
            Goods.sort((a, b) => new Date(b.regdate) - new Date(a.regdate)).filter((Views) => Views.Goods === "coupon") :
            Goods.sort((a, b) => new Date(b.regdate) - new Date(a.regdate)).filter((Views) => Views.Goods === "Goods")
    );

    const [SearchList, setSearchList] = useState(posts);

    const [Search, setSearch] = useState("");
    const [SearchFillText, setSearchFillText] = useState("상품명");
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
    const PostsSize = posts.slice(offset, offset + limit);

    const [FillterState, setFillerState] = useState("title");
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    useEffect(() => {
        if (Viewchange == "Coupon") {
            setPosts(Goods.sort((a, b) => new Date(b.regdate) - new Date(a.regdate)).filter((Views) => Views.Goods === "coupon"));
            setSearchList(Goods.sort((a, b) => new Date(b.regdate) - new Date(a.regdate)).filter((Views) => Views.Goods === "coupon"));
            setPage(1);
        } else if (Viewchange == "Goods") {
            setPosts(Goods.sort((a, b) => new Date(b.regdate) - new Date(a.regdate)).filter((Views) => Views.Goods === "Goods"));
            setSearchList(Goods.sort((a, b) => new Date(b.regdate) - new Date(a.regdate)).filter((Views) => Views.Goods === "Goods"));
            setPage(1);
        }
    }, [Viewchange]);

    console.log(View);

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


    const SearchSubmit = (e) => {
        e.preventDefault();
        if (Search === "") {
            setPosts(Viewchange == "Coupon" ?
                Goods.sort((a, b) => new Date(b.regdate) - new Date(a.regdate)).filter((Views) => Views.Goods === "coupon") :
                Goods.sort((a, b) => new Date(b.regdate) - new Date(a.regdate)).filter((Views) => Views.Goods === "Goods"))
            setSearchList(posts);
            setPage(1);
        } else {
            const SearchResult = posts.filter((board) =>
                SearchFillText === "상품명" ?
                    board.title.toUpperCase().includes(Search.toUpperCase()) :
                    SearchFillText === "종류" ?
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

    const setPriceUpValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        const FillerState = SearchList.sort((a, b) => b.price - a.price);
        setSearchList(FillerState);
    }

    const setPriceDownValue = (e) => {
        const { innerText } = e.target;
        setFitter(innerText);
        const FillerState = SearchList.sort((a, b) => a.price - b.price);
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
                    <FreeBoardInformationText>{View == "Coupon" ? "쿠폰샵" : "굿즈샵"}</FreeBoardInformationText>
                </FreeBoardInformation>
            </InformationAllBox>
            <SearchBox>
                <SearchAllBox>
                    <SearchForm onSubmit={(e) => SearchSubmit(e)}>
                        <FreeBoardSearchInputBox>
                            <FreeBoardSearchInput placeholder="상품을 검색해 주세요!" value={Search} onChange={OnSearch} />
                            <FreeBoardSearchIconBox>
                                <FreeBoardSearchBtn><HiOutlineSearch /></FreeBoardSearchBtn>
                            </FreeBoardSearchIconBox>
                        </FreeBoardSearchInputBox>
                    </SearchForm>
                    <SearchFillSelectAllBox ref={SearchFillRef} onClick={() => setSearchFillDropdown(!SearchFillDropdown)}>
                        <SearchFillSelectBox show={SearchFillDropdown}>
                            <FitterSelectList onClick={(e) => setTitleValue(e)}>상품명</FitterSelectList>
                            <FitterSelectList onClick={(e) => setContentValue(e)}>종류</FitterSelectList>
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
                            <FitterSelectList onClick={(e) => setPriceUpValue(e)}>가격 ▲</FitterSelectList>
                            <FitterSelectList onClick={(e) => setPriceDownValue(e)}>가격 ▼</FitterSelectList>
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
                    {SearchList.length !== 0 && SearchList.slice(offset, offset + limit).map(({ id, src, title, content, price }) => (
                        <BoardContentBox key={id}>
                            <Link to={`/CpGdShopView/${id}`} onClick={() => ScrollTop()}>
                                <SlideAllBox>
                                    <SlideBox>
                                        <CpGdShopMainImg
                                            src={src}
                                        />
                                    </SlideBox>

                                    <AllBox>
                                        <InformaionBoxTextBox>
                                            <TitleBox>{title}</TitleBox>
                                            <InformaionBox dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></InformaionBox>
                                            <PriceBox>₩{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</PriceBox>
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

export default CpGdShopPage;

const AllBox = styled.div
    `
    display:flex;
    flex-direction: column;
    justify-content: end;
    height: 100%;
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
    `

const SlideBox = styled.div
    `
    border-radius: 10px;
    overflow: hidden;
    transition: border 0.5s;
    height: 260px;
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
    padding: 12px;
    color: ${props => props.theme.textColor};
`

const TitleBox = styled.div
    `
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 23px;
    font-weight: bold;
    margin: 0px 0px 5px 0px;
`

const PriceBox = styled.div
`
    font-weight: bold;
    font-size: 19px;
`

const InformaionBox = styled.div
    `
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: normal;
    margin: 0px 0px 5px 0px;
    p{
        margin: 0;
        text-decoration: none;
        color: white;
    }
`

const SearchAllBox = styled.div
    `
    display: flex;
    align-items: center;
    margin: 0px 0px 0px 0px;

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
    display: ${props => props.View === 0 ? "none" : "grid"};
    grid-template-columns: repeat(auto-fill,260px);
    grid-gap: 60px;
    justify-content: center;
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
        height: 120px;
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
    height: 120px;
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
    margin: ${props => props.writerText === "상품명" ? "11px 0px 11px 14px" : "11px 0px 11px 20px"};
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
import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { CgMenuGridR } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import Darkmode from "../../Recoil/Darkmode/DarkmodeChangeBtn";
import { AiOutlineShopping } from "react-icons/ai";
import { clearLoginState } from "../../Redux/User";
import { Outlet } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import SwiperCore, { FreeMode, Navigation, Pagination, EffectCoverflow } from "swiper";
import LogoLight from "../../Item/img/LOGO/8bitLight.png";
import { Slide } from "../Game";

import User from "../../Item/img/MySlide/user.png";
import Bell from "../../Item/img/MySlide/bell.png";
import Coding from "../../Item/img/MySlide/coding.png";
import Shop from "../../Item/img/MySlide/store.png";
import Update from "../../Item/img/MySlide/update.png";
import Logout from "../../Item/img/MySlide/logout.png";

import Upload from "../../Item/img/BoardSlide/upload.png";
import Essay from "../../Item/img/BoardSlide/essay.png";
import Discussion from "../../Item/img/BoardSlide/discussion.png";
import Strategy from "../../Item/img/BoardSlide/strategy.png";
import Rating from "../../Item/img/BoardSlide/rating.png";
import Console from "../../Item/img/BoardSlide/console.png";
import Digital from "../../Item/img/BoardSlide/digital.png";

import axios from 'axios';
import Store from "../../Redux/Store";
import { contextType } from "react-quill";


SwiperCore.use([Navigation, Pagination, EffectCoverflow]);


const HeaderBox = () => {
    const [Search, setSearch] = useState("");
    const [ProfileMenuShow, setProfileMenuShow] = useState(false);
    const [ProfileClickCheck, setProfileClickCheck] = useState(false);
    const [isGameTabCheck, setIsGameTabCheck] = useState(false);
    const [isShopTabCheck, setIsShopTabCheck] = useState(false);
    const [isComunityTabCheck, setIsComunityTabCheck] = useState(false);
    const [isSupprotTabCheck, setIsSupprotTabCheck] = useState(false);
    const [isGameIconCheck, setIsGameIconCheck] = useState(true);
    const [isShopIconCheck, setIsShopIconCheck] = useState(false);
    const [isComunityIconCheck, setIsComunityIconCheck] = useState(false);
    const [isSupprotIconCheck, setIsSupprotIconCheck] = useState(false);
    const [isProfileLogoutCheck, setIsProfileLogoutCheck] = useState(false);
    const [isDefaultProfileScene, setIsDefaultProfileScene] = useState(false);
    const [isDefaultFastScene, setIsDefaultFastScene] = useState(false);
    const [isDefaultWriteScene, setDefaultWriteScene] = useState(false);
    const [FastMenuShow, setIsFastMenuShow] = useState(false);
    const [WriteMenuShow, setIsWriteMenuShow] = useState(false);
    const [WriteMenuClickCheck, setIsWriteMenuClickCheck] = useState(false);
    const [WriteClickCheck, setWriteClickCheck] = useState(false);
    const [FastClickCheck, setFastClickCheck] = useState(false);
    const [BackgroundLine, setBackgroundLine] = useState(false)
    const [modalOnOffBtn, setModalOnOffBtn] = useState(false);
    const [searchmodalOnOffBtn, setSearchModalOnOffBtn] = useState(false);
    const [officialDevelopers, setOfficialDevelopers] = useState([]);
    const [Games, setGames] = useState(Slide);
    const [swiper, setSwiper] = useState(null);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const loginMaintain = localStorage.getItem("loginMaintain");
    const ip = localStorage.getItem("ip");

    let BtnLeaveRef = useRef("");

    

    const swiperParams =
    {
        onSwiper: setSwiper,
        spaceBetween: 4,
        slidesPerView: "auto",
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

    useEffect(() => {
        const getOfficialDevelopers = async () => {
            await axios.get(`${ip}/Users/officialDevelopers`, {

            }, {

            })
                .then((res) => {
                    return res.data;
                }
                )
                .then((data) => {
                    setOfficialDevelopers(data);
                }
                )
        }

        getOfficialDevelopers();
    },[]);


    useEffect(() => {
        function handleOuside(e) {
            if (BtnLeaveRef.current && !BtnLeaveRef.current.contains(e.target)) {
                setIsGameTabCheck(false);
                setIsShopTabCheck(false);
                setIsComunityTabCheck(false);
                setIsSupprotTabCheck(false);
                setBackgroundLine(false);
                setIsGameIconCheck(false);
                setIsShopIconCheck(false);
                setIsComunityIconCheck(false);
                setIsSupprotIconCheck(false);
            }
        };

        if (!isGameTabCheck) {
            document.addEventListener("mouseover", handleOuside);
        }
        return () => {
            document.removeEventListener("mouseover", handleOuside);
        };
    }, [BtnLeaveRef]);


    useEffect(() => {
        setGames(Slide.filter((Game) => Game.game === "공식게임"))
    }, [Slide]);

    


    const OnSearch = (e) => {
        const currentSearch = e.target.value;
        setSearch(currentSearch);
    }

    const LogoutFunc = () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("loginMaintain");
        dispatch(clearLoginState());
        setProfileMenuShow(false);
        setProfileClickCheck(false);
        setIsProfileLogoutCheck(true);
        navigate("/");
    }

    const GameliHover = () => {
        setIsGameIconCheck(true);
        setIsShopIconCheck(false);
        setIsComunityIconCheck(false);
        setIsSupprotIconCheck(false);
        setIsShopTabCheck(false);
        setIsComunityTabCheck(false);
        setIsSupprotTabCheck(false);
        setIsGameTabCheck(true);
        setBackgroundLine(true);
    }

    const ComunityliHover = () => {
        setIsGameIconCheck(false);
        setIsShopIconCheck(false);
        setIsComunityIconCheck(true);
        setIsSupprotIconCheck(false);
        setIsShopTabCheck(false);
        setIsComunityTabCheck(true);
        setIsSupprotTabCheck(false);
        setIsGameTabCheck(false);
        setBackgroundLine(true);
    }

    const ShopliHover = () => {
        setIsGameIconCheck(false);
        setIsShopIconCheck(true);
        setIsComunityIconCheck(false);
        setIsSupprotIconCheck(false);
        setIsShopTabCheck(true);
        setIsComunityTabCheck(false);
        setIsSupprotTabCheck(false);
        setIsGameTabCheck(false);
        setBackgroundLine(true);
    }

    const SupportliHover = () => {
        setIsGameIconCheck(false);
        setIsShopIconCheck(false);
        setIsComunityIconCheck(false);
        setIsSupprotIconCheck(true);
        setIsShopTabCheck(false);
        setIsComunityTabCheck(false);
        setIsSupprotTabCheck(true);
        setIsGameTabCheck(false);
        setBackgroundLine(true);
    }


    const [scrollPosition, setScrollPosition] = useState(0);

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    const ScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <>
            <ALLNavBox>
                <LeaveBox ref={BtnLeaveRef}>

                    <BackgroudTopNav TopBack={scrollPosition}>

                        <ModalFast OnOff={modalOnOffBtn}>

                            <ModalFastMenuBox OnOff={modalOnOffBtn}>

                                {loginMaintain == null ?

                                    <>
                                        <ModalAllOffBtn>
                                            <ModalAllOffBtnText
                                                onClick={() => setModalOnOffBtn(!modalOnOffBtn)}
                                            >
                                                x
                                            </ModalAllOffBtnText>
                                        </ModalAllOffBtn>

                                        <LoginCheckBox>
                                            <Link to='/Login' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>로그인</Link> 후 이용해주세요.
                                        </LoginCheckBox>
                                    </> :

                                    // 로그인유지 상태
                                    loginMaintain == "true" ?
                                        userInfo == null ?

                                            <>
                                                <ModalAllOffBtn>
                                                    <ModalAllOffBtnText
                                                        onClick={() => setModalOnOffBtn(!modalOnOffBtn)}
                                                    >
                                                        x
                                                    </ModalAllOffBtnText>
                                                </ModalAllOffBtn>

                                                <LoginCheckBox>
                                                    <Link to='/Login' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>로그인</Link> 후 이용해주세요.
                                                </LoginCheckBox>
                                            </> :

                                            userInfo.loginState === "allok" ?

                                                <>

                                                    <ModalProfileImgBox>

                                                        <ModalAllOffBtn>
                                                            <ModalAllOffBtnText
                                                                onClick={() => setModalOnOffBtn(!modalOnOffBtn)}
                                                            >
                                                                x
                                                            </ModalAllOffBtnText>
                                                        </ModalAllOffBtn>

                                                        <ProfileAllBox>

                                                            <Profile>
                                                                <Profileimg src={`${ip}/Users/profileImg/${userInfo.nickName}`} />
                                                            </Profile>

                                                            <ModalNickNameBox>
                                                                <ModalNickNameText>
                                                                    <ModalNickNamePointText>
                                                                        {userInfo.nickName}
                                                                    </ModalNickNamePointText>
                                                                    님, 환영합니다!
                                                                </ModalNickNameText>
                                                            </ModalNickNameBox>

                                                            <MyPageShopBox>
                                                                <MyPageBtnBox>
                                                                    <Link to={"/"} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                        <MyPageBtnText>마이페이지</MyPageBtnText>
                                                                    </Link>
                                                                </MyPageBtnBox>

                                                                <ShopBtnBox>
                                                                    <Link to={"/"} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                        <ShopBtnText>장바구니</ShopBtnText>
                                                                    </Link>
                                                                </ShopBtnBox>
                                                            </MyPageShopBox>

                                                        </ProfileAllBox>

                                                    </ModalProfileImgBox>

                                                    <ContentBoxAllBox>

                                                        <ContentBox>

                                                            <ServiceBox>

                                                                <ServiceText>
                                                                    ■ 8bit 서비스
                                                                </ServiceText>

                                                                <GameServiceSubBox>

                                                                    <GameDotText role={userInfo.role}>-</GameDotText>

                                                                    {loginMaintain == null ?
                                                                        <GameSubText>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText> :

                                                                        loginMaintain == "true" ?

                                                                            userInfo == null ?

                                                                                <GameSubText role={userInfo.role}>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText> :

                                                                                userInfo.loginState === "allok" ?

                                                                                    userInfo.role === "DEVELOPER" ?

                                                                                        <Link to={`/GameUploadPage/${officialDevelopers.includes(userInfo.nickName) ? 'official':'indie'}`} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                                            <GameSubText role={userInfo.role}>게임 업로드</GameSubText>
                                                                                            <Underline />
                                                                                        </Link> :

                                                                                        <GameSubText role={userInfo.role}>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText> :

                                                                                    <GameSubText role={userInfo.role}>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText> :

                                                                            user.login_state === "allok" ?

                                                                                user.role === "DEVELOPER" ?

                                                                                    <Link to={`/GameUploadPage/${officialDevelopers.includes(user.nickname) ? 'official':'indie'}`} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                                        <GameSubText role={user.role}>게임 업로드</GameSubText>
                                                                                        <Underline />
                                                                                    </Link> :

                                                                                    <GameSubText role={user.role}>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText> :

                                                                                <GameSubText role={user.role}>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText>

                                                                    }

                                                                </GameServiceSubBox>

                                                                <ShopServiceSubBox>
                                                                    <ShopDotText role={userInfo.role}>-</ShopDotText>

                                                                    {loginMaintain == null ?

                                                                        <ShopSubText>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText> :

                                                                        loginMaintain == "true" ?

                                                                            userInfo == null ?

                                                                                <ShopSubText role={userInfo.role}>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText> :

                                                                                userInfo.loginState === "allok" ?

                                                                                    userInfo.role === "SELLER" ?

                                                                                        <Link to="/GameUploadPage/indie" onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                                            <ShopSubText role={userInfo.role}>굿즈 판매</ShopSubText>
                                                                                            <Underline />
                                                                                        </Link> :

                                                                                        <ShopSubText role={userInfo.role}>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText> :

                                                                                    <ShopSubText role={userInfo.role}>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText> :

                                                                            user.login_state === "allok" ?

                                                                                user.role === "SELLER" ?

                                                                                    <Link to="/GameUploadPage/indie" onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                                        <ShopSubText role={user.role}>굿즈 판매</ShopSubText>
                                                                                        <Underline />
                                                                                    </Link> :

                                                                                    <ShopSubText role={user.role}>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText> :

                                                                                <ShopSubText role={user.role}>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText>
                                                                    }

                                                                </ShopServiceSubBox>

                                                            </ServiceBox>

                                                            <GameDownloadBox>

                                                                <GameDownloadText>
                                                                    ■ 게임 다운로드
                                                                </GameDownloadText>

                                                                <GameDownloadAllBox>

                                                                    <OfficialGameBox1>
                                                                        <OfficialDot>-</OfficialDot>
                                                                        <Link to={`/Game/${Games[0].developer}/${Games[0].regdate}/official`} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                            <GameText>방치 모험가</GameText>
                                                                            <Underline />
                                                                        </Link>
                                                                    </OfficialGameBox1>

                                                                    <OfficialGameBox2>
                                                                        <OfficialDot>-</OfficialDot>
                                                                        <Link to={`/Game/${Games[1].developer}/${Games[1].regdate}/official`} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                            <GameText>로드 오브 토파즈</GameText>
                                                                            <Underline />
                                                                        </Link>
                                                                    </OfficialGameBox2>

                                                                    <OfficialGameBox3>
                                                                        <OfficialDot>-</OfficialDot>
                                                                        <Link to={`/Game/${Games[2].developer}/${Games[2].regdate}/official`} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                            <GameText>럭키 웨폰</GameText>
                                                                            <Underline />
                                                                        </Link>
                                                                    </OfficialGameBox3>

                                                                    <OthersGameBox>
                                                                        <OfficialDot>-</OfficialDot>
                                                                        <Link to='/IndieGame/indie' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                            <GameText>인디 게임s</GameText>
                                                                            <Underline />
                                                                        </Link>
                                                                    </OthersGameBox>

                                                                </GameDownloadAllBox>

                                                            </GameDownloadBox>

                                                            <WriteBoardBox>

                                                                <WriteBoardText>
                                                                    ■ 글쓰기
                                                                </WriteBoardText>

                                                                <WriteBoardAllBox>

                                                                    <StrategyBoardBox>
                                                                        <WriteBoardDotText>-</WriteBoardDotText>
                                                                        <Link to='/Board/strategy' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                            <BoardText>공략 게시판</BoardText>
                                                                            <Underline />
                                                                        </Link>
                                                                    </StrategyBoardBox>

                                                                    <QuestionBoardBox>
                                                                        <WriteBoardDotText>-</WriteBoardDotText>
                                                                        <Link to='/Board/question' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                            <BoardText>질문 게시판</BoardText>
                                                                            <Underline />
                                                                        </Link>
                                                                    </QuestionBoardBox>

                                                                    <FreeBoardBox>
                                                                        <WriteBoardDotText>-</WriteBoardDotText>
                                                                        <Link to='/Board/free' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                            <BoardText>자유 게시판</BoardText>
                                                                            <Underline />
                                                                        </Link>
                                                                    </FreeBoardBox>

                                                                </WriteBoardAllBox>

                                                            </WriteBoardBox>

                                                        </ContentBox>

                                                    </ContentBoxAllBox>

                                                </> :

                                                <>
                                                    <ModalAllOffBtn>
                                                        <ModalAllOffBtnText
                                                            onClick={() => setModalOnOffBtn(!modalOnOffBtn)}
                                                        >
                                                            x
                                                        </ModalAllOffBtnText>
                                                    </ModalAllOffBtn>

                                                    <LoginCheckBox>
                                                        <Link to='/Login' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>로그인</Link> 후 이용해주세요.
                                                    </LoginCheckBox>
                                                </> :

                                        // 로그인유지 안한 상태
                                        user.login_state === "allok" ?

                                            <>

                                                <ModalProfileImgBox>

                                                    <ModalAllOffBtn>
                                                        <ModalAllOffBtnText
                                                            onClick={() => setModalOnOffBtn(!modalOnOffBtn)}
                                                        >
                                                            x
                                                        </ModalAllOffBtnText>
                                                    </ModalAllOffBtn>

                                                    <ProfileAllBox>

                                                        <Profile>
                                                            <Profileimg src={`${ip}/Users/profileImg/${user.nickname}`} />
                                                        </Profile>

                                                        <ModalNickNameBox>
                                                            <ModalNickNameText>
                                                                <ModalNickNamePointText>
                                                                    {user.nickname}
                                                                </ModalNickNamePointText>
                                                                님, 환영합니다!
                                                            </ModalNickNameText>
                                                        </ModalNickNameBox>

                                                        <MyPageShopBox>

                                                            <MyPageBtnBox>
                                                                <Link to={"/"} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                    <MyPageBtnText>마이페이지</MyPageBtnText>
                                                                </Link>
                                                            </MyPageBtnBox>

                                                            <ShopBtnBox>
                                                                <Link to={"/"} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                    <ShopBtnText>장바구니</ShopBtnText>
                                                                </Link>
                                                            </ShopBtnBox>

                                                        </MyPageShopBox>

                                                    </ProfileAllBox>

                                                </ModalProfileImgBox>

                                                <ContentBoxAllBox>
                                                    <ContentBox>
                                                        <ServiceBox>

                                                            <ServiceText>
                                                                ■ 8bit 서비스
                                                            </ServiceText>

                                                            <GameServiceSubBox>
                                                                <GameDotText role={user.role}>-</GameDotText>

                                                                {loginMaintain == null ?

                                                                    <GameSubText>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText> :

                                                                    loginMaintain == "true" ?

                                                                        userInfo == null ?

                                                                            <GameSubText role={userInfo.role}>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText> :

                                                                            userInfo.loginState === "allok" ?

                                                                                userInfo.role === "DEVELOPER" ?

                                                                                    <Link to={`/GameUploadPage/${officialDevelopers.includes(userInfo.nickName) ? 'official':'indie'}`} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                                        <GameSubText role={userInfo.role}>게임 업로드</GameSubText>
                                                                                        <Underline />
                                                                                    </Link> :

                                                                                    <GameSubText role={userInfo.role}>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText> :

                                                                                <GameSubText role={userInfo.role}>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText> :

                                                                        user.login_state === "allok" ?

                                                                            user.role === "DEVELOPER" ?

                                                                                <Link to={`/GameUploadPage/${officialDevelopers.includes(user.nickname) ? 'official':'indie'}`} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                                    <GameSubText role={user.role}>게임 업로드</GameSubText>
                                                                                    <Underline />
                                                                                </Link> :

                                                                                <GameSubText role={user.role}>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText> :

                                                                            <GameSubText role={user.role}>게임 업로드 (개발자 인증 후 사용 가능)</GameSubText>
                                                                }

                                                            </GameServiceSubBox>

                                                            <ShopServiceSubBox>

                                                                <ShopDotText role={user.role}>-</ShopDotText>

                                                                {loginMaintain == null ?

                                                                    <ShopSubText>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText> :

                                                                    loginMaintain == "true" ?

                                                                        userInfo == null ?

                                                                            <ShopSubText role={userInfo.role}>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText> :

                                                                            userInfo.loginState === "allok" ?

                                                                                userInfo.role === "SELLER" ?

                                                                                    <Link to="/GameUploadPage/indie" onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                                        <ShopSubText role={userInfo.role}>굿즈 판매</ShopSubText>
                                                                                        <Underline />
                                                                                    </Link> :

                                                                                    <ShopSubText role={userInfo.role}>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText> :

                                                                                <ShopSubText role={userInfo.role}>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText> :

                                                                        user.login_state === "allok" ?

                                                                            user.role === "SELLER" ?

                                                                                <Link to="/GameUploadPage/indie" onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                                    <ShopSubText role={user.role}>굿즈 판매</ShopSubText>
                                                                                    <Underline />
                                                                                </Link> :

                                                                                <ShopSubText role={user.role}>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText> :

                                                                            <ShopSubText role={user.role}>굿즈 판매 (판매자 인증 후 사용 가능)</ShopSubText>
                                                                }

                                                            </ShopServiceSubBox>

                                                        </ServiceBox>

                                                        <GameDownloadBox>

                                                            <GameDownloadText>
                                                                ■ 게임 다운로드
                                                            </GameDownloadText>

                                                            <GameDownloadAllBox>
                                                                <OfficialGameBox1>
                                                                    <OfficialDot>-</OfficialDot>
                                                                    <Link to={`/Game/${Games[0].developer}/${Games[0].regdate}/official`} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                        <GameText>방치 모험가</GameText>
                                                                        <Underline />
                                                                    </Link>
                                                                </OfficialGameBox1>

                                                                <OfficialGameBox2>
                                                                    <OfficialDot>-</OfficialDot>
                                                                    <Link to={`/Game/${Games[1].developer}/${Games[1].regdate}/official`} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                        <GameText>로드 오브 토파즈</GameText>
                                                                        <Underline />
                                                                    </Link>
                                                                </OfficialGameBox2>

                                                                <OfficialGameBox3>
                                                                    <OfficialDot>-</OfficialDot>
                                                                    <Link to={`/Game/${Games[2].developer}/${Games[2].regdate}/official`} onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                        <GameText>럭키 웨폰</GameText>
                                                                        <Underline />
                                                                    </Link>
                                                                </OfficialGameBox3>

                                                                <OthersGameBox>
                                                                    <OfficialDot>-</OfficialDot>
                                                                    <Link to='/IndieGame/indie' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                        <GameText>인디 게임s</GameText>
                                                                        <Underline />
                                                                    </Link>
                                                                </OthersGameBox>
                                                            </GameDownloadAllBox>

                                                        </GameDownloadBox>

                                                        <WriteBoardBox>

                                                            <WriteBoardText>
                                                                ■ 글쓰기
                                                            </WriteBoardText>

                                                            <WriteBoardAllBox>

                                                                <StrategyBoardBox>
                                                                    <WriteBoardDotText>-</WriteBoardDotText>
                                                                    <Link to='/Board/strategy' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                        <BoardText>공략 게시판</BoardText>
                                                                        <Underline />
                                                                    </Link>
                                                                </StrategyBoardBox>

                                                                <QuestionBoardBox>
                                                                    <WriteBoardDotText>-</WriteBoardDotText>
                                                                    <Link to='/Board/question' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                        <BoardText>질문 게시판</BoardText>
                                                                        <Underline />
                                                                    </Link>
                                                                </QuestionBoardBox>

                                                                <FreeBoardBox>
                                                                    <WriteBoardDotText>-</WriteBoardDotText>
                                                                    <Link to='/Board/free' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>
                                                                        <BoardText>자유 게시판</BoardText>
                                                                        <Underline />
                                                                    </Link>
                                                                </FreeBoardBox>

                                                            </WriteBoardAllBox>

                                                        </WriteBoardBox>

                                                    </ContentBox>

                                                </ContentBoxAllBox>
                                            </> :

                                            <>
                                                <ModalAllOffBtn>
                                                    <ModalAllOffBtnText
                                                        onClick={() => setModalOnOffBtn(!modalOnOffBtn)}
                                                    >
                                                        x
                                                    </ModalAllOffBtnText>
                                                </ModalAllOffBtn>

                                                <LoginCheckBox>
                                                    <Link to='/Login' onClick={() => [setModalOnOffBtn(!modalOnOffBtn), ScrollTop()]}>로그인</Link> 후 이용해주세요.
                                                </LoginCheckBox>
                                            </>
                                }

                                {loginMaintain == null ?
                                    <></> :
                                    loginMaintain == "true" ?
                                        userInfo == null ?
                                            <></> :
                                            userInfo.loginState === "allok" ?
                                                <LogoutBtnBox>
                                                    <LogoutBtn onClick={() => LogoutFunc()}>
                                                        <LogoutBtnText>로그아웃</LogoutBtnText>
                                                    </LogoutBtn>
                                                </LogoutBtnBox> :

                                                <></> :

                                        user.login_state === "allok" ?

                                            <LogoutBtnBox>
                                                <LogoutBtn onClick={() => LogoutFunc()}>
                                                    <LogoutBtnText>로그아웃</LogoutBtnText>
                                                </LogoutBtn>
                                            </LogoutBtnBox> :

                                            <></>
                                }

                            </ModalFastMenuBox>

                        </ModalFast>

                        <SearchModal OnOff={searchmodalOnOffBtn}>

                        </SearchModal>

                        <Topnav>

                            <NavBox TopBack={scrollPosition}>
                                <NavMenuAllBox>
                                    <LogoBox>
                                        <Link to='/'><Logo src={LogoLight} alt='로고' /></Link>
                                    </LogoBox>

                                    <NavUl>
                                        <GameLi onClick={() => ScrollTop()} active={isGameIconCheck}><Link to='/' onMouseOver={GameliHover}>게임</Link></GameLi>
                                        <ShopLi onClick={() => ScrollTop()} active={isShopIconCheck}><Link to='/' onMouseOver={ShopliHover}>쇼핑</Link></ShopLi>
                                        <ComunityLi onClick={() => ScrollTop()} active={isComunityIconCheck}><Link to='/' onMouseOver={ComunityliHover}>커뮤니티</Link></ComunityLi>
                                        <SupportLi onClick={() => ScrollTop()} active={isSupprotIconCheck}><Link to='/' onMouseOver={SupportliHover}>서포트</Link></SupportLi>
                                    </NavUl>

                                </NavMenuAllBox>

                                <SlideNav {...swiperParams} ref={setSwiper}>
                                    <SwiperSlide>
                                        <GameLi as={"div"} onClick={() => ScrollTop()} active={isGameIconCheck}><Link to='/' onMouseOver={GameliHover}>게임</Link></GameLi>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <ShopLi as={"div"} onClick={() => ScrollTop()} active={isShopIconCheck}><Link to='/' onMouseOver={ShopliHover}>쇼핑</Link></ShopLi>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <ComunityLi as={"div"} onClick={() => ScrollTop()} active={isComunityIconCheck}><Link to='/' onMouseOver={ComunityliHover}>커뮤니티</Link></ComunityLi>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <SupportLi as={"div"} onClick={() => ScrollTop()} active={isSupprotIconCheck}><Link to='/' onMouseOver={SupportliHover}>서포트</Link></SupportLi>
                                    </SwiperSlide>
                                </SlideNav>

                            </NavBox>



                            <AllButtonBox>


                                <ButtonBox>

                                    <SearchInputBox>
                                        <SearchInput TopBack={scrollPosition} placeholder="게임 검색하기" value={Search} onChange={OnSearch} />
                                        <SearchInputIconBox TopBack={scrollPosition}>
                                            <SearchButton><HiOutlineSearch /></SearchButton>
                                        </SearchInputIconBox>
                                    </SearchInputBox>

                                    <SearchModalMenu
                                        onClick={() => setSearchModalOnOffBtn(!searchmodalOnOffBtn)}
                                    >
                                        <ModalSearchMenuIcon><HiOutlineSearch /></ModalSearchMenuIcon>
                                    </SearchModalMenu>


                                    <ShoppingBox
                                        onClick={() => setModalOnOffBtn(!modalOnOffBtn)}
                                    >
                                        <ShoppingMenuIcon><AiOutlineShopping /></ShoppingMenuIcon>
                                    </ShoppingBox>

                                    <ModalFastMenu
                                        onClick={() => setModalOnOffBtn(!modalOnOffBtn)}
                                    >
                                        <ModalFastMenuIcon><CgMenuGridR /></ModalFastMenuIcon>
                                    </ModalFastMenu>

                                    <Darkmode />

                                </ButtonBox>


                            </AllButtonBox>
                        </Topnav>
                    </BackgroudTopNav>

                    <BackgroudSubNav LineCheck={BackgroundLine} TopBack={scrollPosition}>
                        <SubNavMenu LineCheck={BackgroundLine}>
                            <GameSubNav display={isGameTabCheck} TopBack={scrollPosition}>
                                <Link to='/'><SubNavText>홈</SubNavText></Link>
                                <Link to='/OfficialGame/official'><SubNavText>공식게임</SubNavText></Link>
                                <Link to='/IndieGame/indie'><SubNavText>인디게임</SubNavText></Link>
                            </GameSubNav>
                            <ShopSubNav display={isShopTabCheck} TopBack={scrollPosition}>
                                <Link to="/CpGdShop/Coupon"><SubNavText>쿠폰샵</SubNavText></Link>
                                <Link to="/CpGdShop/Goods"><SubNavText>굿즈샵</SubNavText></Link>
                                <Link to='/'><SubNavText>장바구니</SubNavText></Link>
                            </ShopSubNav>
                            <ComunitySubNav display={isComunityTabCheck} TopBack={scrollPosition}>
                                <Link to='/Board/notice'><SubNavText>공지사항</SubNavText></Link>
                                <Link to='/Event'><SubNavText>이벤트</SubNavText></Link>
                                <Link to='/Board/question'><SubNavText>질문게시판</SubNavText></Link>
                                <Link to='/Board/strategy'><SubNavText>공략게시판</SubNavText></Link>
                                <Link to='/Board/free'><SubNavText>자유게시판</SubNavText></Link>
                            </ComunitySubNav>
                            <SupportSubNav display={isSupprotTabCheck} TopBack={scrollPosition}>
                                <Link to='/'><SubNavText>이용문의</SubNavText></Link>
                                <Link to='/'><SubNavText>회사정보</SubNavText></Link>
                            </SupportSubNav>
                        </SubNavMenu>
                    </BackgroudSubNav>
                </LeaveBox>
            </ALLNavBox>
            <Outlet />
        </>
    );
}

export const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

const LoginCheckBox = styled.div
    `
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;
    color: #ededed;
    font-size: 20px;
    a{
        color: #ededed;
        margin: 0px 8px 0px 0px;
    }
`

const SlideNav = styled(Swiper)
    `
    display: none;
    -webkit-tap-highlight-color: transparent;

    .swiper-slide {
        display: inline-flex;
        width: auto;
    }

    @media (min-width:250px) and (max-width:891px)
    {
        display: flex;
    }

`

const ModalAllOffBtn = styled.div
    `
    display: flex;
    color: white;
    font-size: 45px;
    justify-content: end;
    cursor: pointer;
`

const ModalAllOffBtnText = styled.span
    `
    margin: 5px 15px 0px 0px;
`

const ModalUserMenu = styled.div
    `
`

const LogoutBtnBox = styled.div
    `
    display: flex;
    justify-content: end;
    padding: 12px;
    font-size: 18px;
    color: #EDEDEF;
    `

const LogoutBtn = styled.div
    `
    cursor: pointer;
`

const LogoutBtnText = styled.span
    `

`

const ModalFast = styled.div
    `
    display: ${props => props.OnOff ? "block" : "none"};
    position: fixed;
    white-space: nowrap;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(25,25,25,0.3);
    z-index: 99999;
`

const ModalAnimateOpen = keyframes
    `
    0%{
        width: 0px;
    },
    100%{
        width: 366px;
    }

`

const ModalAnimateClose = keyframes
    `
    0%{
        width: 366px;
    },
    100%{
        width: 0px;
    }

`

const ModalMobileAnimateOpen = keyframes
    `
    0%{
        width: 0%;
    },
    100%{
        width: 100%;
    }

`

const ModalMobileAnimateClose = keyframes
    `
    0%{
        width: 100%;
    },
    100%{
        width: 0%;
    }

`

const ModalFastMenuBox = styled.div
    `
    height: 100%;
    position: relative;
    width: 366px;
    overflow: hidden;
    margin-left: auto;
    display: flex;
    color: #ededed;
    flex-direction: column;
    background: rgba(25,25,25,1);
    animation: ${props => props.OnOff ? ModalAnimateOpen : ModalAnimateClose} 0.5s;

    @media (min-width:250px) and (max-width:622px)
    {
         width: 100%;
         animation: ${props => props.OnOff ? ModalMobileAnimateOpen : ModalMobileAnimateClose} 0.5s;
    }

`

const SearchModal = styled.div
    `
    display: ${props => props.OnOff ? "flex" : "none"};
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(25,25,25,1);
`

const ModalFastMenu = styled.div
    `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 35px;
        cursor: pointer;
        margin: 0px 10px 0px 0px;
        &:hover{
        color: #55aaff;
    }
`

const SearchModalMenu = styled.div
    `
    display: none;

    @media (min-width:250px) and (max-width:1156px)
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 35px;
        cursor: pointer;
        margin: 0px 10px 0px 0px;
        &:hover{
            color: #55aaff;
        }
    };
`

const NavMenuAllBox = styled.div
    `
    display: flex;
`

const ModalFastMenuIcon = styled.i
    `
    display: flex;
    align-items: center;
`

const ShoppingMenuIcon = styled.i
    `
    display: flex;
    align-items: center;
`

const ModalSearchMenuIcon = styled.i
    `
    display: flex;
    align-items: center;
`

const LeaveBox = styled.div
    `

`

const WriteBox = styled.div
    `
    width: 66px;
    height: 11px;
    border: solid 2px white;
    padding: 14.5px;
    border-radius: 8px;
    background: ${props => props.click ? "#2773cf" : "#6a9dda"};
    font-size: 22px;
    cursor: pointer;
    margin: 7px 0px 0px 19px;
    
    @media (hover: hover)
    {
        &:hover
        {
            background: #2773cf;
        }
    }
`

const WriteBoxText = styled.span
    `   
    margin: -6px 0px 0px 2.5px;
    position:absolute;
    @media (min-width:250px) and (max-width:666px)
    {
        white-space: nowrap;
    }
`
const BackgroudTopNav = styled.div
    `
    background-color: ${props => props.TopBack === 0 ? "rgba(25,25,25,0.6)" : "#2b2b2b"};
    transition: background-color 0.5s;

    @media (min-width:250px) and (max-width:666px)
    {
        width: 100%;
    }

    @media (min-width:667px) and (max-width:1342px)
    {
        height: 78px;
    }
`

const BackgroudSubNav = styled.div
    `
    display: ${props => props.LineCheck ? "block" : "none"};
    background: ${props => props.TopBack === 0 ? "rgba(25,25,25,0.4)" : "white"};
    border-bottom: ${props => props.LineCheck ? props.TopBack === 0 ? "none" : "solid 3px #3c3c3c" : "none"};

    @media (min-width:250px) and (max-width:666px)
    {
        width: 100%;
    }

`

const ALLNavBox = styled.div
    `
    font-size: 25px;
    position: relative;
    z-index:9999;
`

const GameSubNav = styled.div
    `
    display: ${props => props.display ? "block" : "none"};
a{
    text-decoration: none;
    -webkit-tap-highlight-color:transparent;
    color: ${props => props.TopBack === 0 ? "white" : "black"};
    font-weight: bold;
    &:hover
    {
        color: #6a9dda;
    }
}

&::-webkit-scrollbar
    {
        display: none;
    }

    @media (min-width:250px) and (max-width:666px)
    {
        white-space: nowrap;
        overflow: scroll;
    }
`

const ShopSubNav = styled(GameSubNav)
    `
    display: ${props => props.display ? "block" : "none"};
    a{
        text-decoration: none;
        -webkit-tap-highlight-color:transparent;
        color: ${props => props.TopBack === 0 ? "white" : "black"};
        font-weight: bold;
        &:hover
        {
            color: #6a9dda;
        }
    }
    &:hover
    {
        color: #6a9dda;
    }
    &::-webkit-scrollbar
    {
        display: none;
    }

    @media (min-width:250px) and (max-width:666px)
    {
        white-space: nowrap;
        overflow: scroll;
    }
`
const ComunitySubNav = styled(GameSubNav)
    `
    display: ${props => props.display ? "block" : "none"};
    a{
        text-decoration: none;
        -webkit-tap-highlight-color:transparent;
        color: ${props => props.TopBack === 0 ? "white" : "black"};
        font-weight: bold;
        &:hover
        {
            color: #6a9dda;
        }
    }
    &:hover
    {
        color: #6a9dda;
    }

    &::-webkit-scrollbar
    {
        display: none;
    }

    @media (min-width:250px) and (max-width:666px)
    {
        white-space: nowrap;
        overflow: scroll;
    }
`
const SupportSubNav = styled(GameSubNav)
    `
    display: ${props => props.display ? "block" : "none"};
    a{
        text-decoration: none;
        -webkit-tap-highlight-color:transparent;
        color: ${props => props.TopBack === 0 ? "white" : "black"};
        font-weight: bold;
        &:hover
        {
            color: #6a9dda;
        }
    }
    &:hover
    {
        color: #6a9dda;
    }
    &::-webkit-scrollbar
    {
        display: none;
    }

    @media (min-width:250px) and (max-width:666px)
    {
        white-space: nowrap;
        overflow: scroll;
    }
`

const SubNavText = styled.span
    `
    padding: 0px 10px 0px 10px;
`

const GameLi = styled.li
    `
    display: flex;
    flex-direction: column;
    -webkit-tap-highlight-color: transparent;
    justify-content: center;
    padding: 0px 20px 0px 20px;
    list-style: none;
    white-space: nowrap;
    font-size: 25px;
    @media (min-width:250px) and (max-width:666px)
    {
        font-size: 20px;
    }
    a
    {
        color: ${props => props.active ? "#55aaff" : "white"};
        -webkit-tap-highlight-color:transparent;
    }
`

const ShopLi = styled(GameLi)
    `
`

const ComunityLi = styled(GameLi)
    `
`
const SupportLi = styled(GameLi)
    `
`

const SubNavMenu = styled.div
    `
    height: 55px;
    justify-content: center;
    font-size:21.7px;
    display: flex;
    margin: auto;
    max-width: 1500px;
    align-items: center;
    @media (min-width:250px) and (max-width:666px)
    {
        font-size: 17px;
    }
`

const Topnav = styled.header
    `
    padding: 0px 48px;
    height: 78px;
    display: flex;
    margin: auto;
    max-width: 1500px;
    color: white;
    justify-content: space-between;
    a{
        text-decoration: none;
        font-weight: bold;
        -webkit-tap-highlight-color:transparent;
    }

    @media (min-width:250px) and (max-width:623px)
    {
        flex-direction: column;
        padding: 10px;
    }
`

const Logo = styled.img
    `
    width: 144px;
    height: 72px;

     @media (min-width:250px) and (max-width:666px)
    {
        width: 95px;
        height: 46px;
    }
`

const LogoBox = styled.div
    `
`

const NavBox = styled.div
    `
    display: flex;
    align-items: center;
    position: relative;
    color: white;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(270deg,transparent,#000 2.2rem);
`
const NavSlideAllBox = styled.div
    `

`

const NavUl = styled.ul
    `
    display: flex;
    white-space: nowrap;
    height: 27px;

    @media (min-width:250px) and (max-width:891px)
    {
        display: none;
    }
`

export const SearchInput = styled.input
    `
    border: none;
    outline: none;
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 0px 8px 0px 12px;
    font-size: 20px;
    width: 170px;
    height: 35.5px;
    caret-color: white;
    background: ${props => props.TopBack === 0 ? "rgba(74, 74, 74, 0.7)" : "#4a4a4a"};
    transition: background 0.5s;
    color: #d1d1d1;

    &::placeholder{
        color: #d1d1d1;
    }
`

const AllButtonBox = styled.div
    `
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    color: white;
    -webkit-tap-highlight-color:transparent;
`

const ButtonBox = styled.div
    `
    display: flex;
    align-items: center;
`

const MenuBox = styled.div
    `
    color: ${props => props.click ? "#6a9dda" : "white"};
    cursor: pointer;
    white-space: nowrap;
    a
    {
        font-size:23px;
        font-weight: lighter;
        color: white;
        text-decoration: none;
        -webkit-tap-highlight-color:transparent;    
    }

    @media (hover: hover)
    {
        &:hover
        {
            color: #6a9dda;
        }
    }
`

const ShoppingBox = styled.div
    `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    cursor: pointer;
    margin: 0px 10px 0px 0px;
    &:hover{
        color: #55aaff;
    }
`

const LineBox = styled(MenuBox)
    `
    &::after
    {
        content: "";
        background: white;
        display: inline-block;
        height: 16px;
        width: 2px;
        margin: 0px 7px -1px 15px;
    }
`

export const SearchInputBox = styled.div
    `
    display: flex;
    border: none;
    border-radius: 13px;
    margin: 0px 16px 0px 0px;

    @media (min-width:250px) and (max-width:1155px)
    {
        display: none;
    }
}
`

export const SearchInputIconBox = styled.div
    `
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
    background: ${props => props.TopBack === 0 ? "rgba(74, 74, 74, 0.7)" : "#4a4a4a"};
    transition: background 0.5s;
    height: 35.5px;
    -webkit-user-select: none;
`

export const SearchButton = styled.button
    `
    border: none;
    background: transparent;
    padding: 2px 8px 0px 0px;
    cursor: pointer;
    font-size: 29px;
    color: white;

    @media (hover: hover)
    {
        &:hover
        {
            color: #6a9dda;
        }
    }

`

const ModalAllBox = styled.div
    `
     color: #ededed;
     height: 100%;
`

const ModalProfileImgBox = styled.div
    `
`

const ModalNickNameBox = styled.div
    `
    margin: 37px 0px 25px 0px;
    font-size: 22px;
`

const ModalNickNamePointText = styled.span
    `
    font-weight: bold;
`

const ModalNickNameText = styled.span
    `

`

const MyPageShopBox = styled.div
    `
    display: flex;
    font-size: 18px;
    color: #ededed;
    a{
        color: #ededed;
    }
`

const ContentBoxAllBox = styled.div
    `
    width: 100%;
    height: 100%;
    margin: 100px 0px 0px 0px;
    overflow-y: scroll;
    overflow-x: hidden;

    div:not(:last-child)
    {
        margin: 0px 0px 40px 0px;
    }

    &::-webkit-scrollbar{
        background: rgba(25,25,25,1);
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

const ContentBox = styled.div
    `
    padding: 0px 26px 0px 26px;
`

const ServiceBox = styled.div
    `
    display: flex;
    flex-direction: column;
    padding : 5px;
    a{
        text-decoraction: none;
    }
`

const ServiceText = styled.span
    `

`

const Underline = styled.div
    `
    &::after{
        content: ""; 
        display: block; 
        width: 0%;
        height: 0.08px; 
        background: #ededed; 
        transition: all 0.3s;
    }
`

const GameDotText = styled.span
    `
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.role == "DEVELOPER" ? "#ededed" : "gray"};
`

const ShopDotText = styled.span
    `
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.role == "SELLER" ? "#ededed" : "gray"};
`

const GameServiceSubBox = styled.div
    `
    display: flex;
    margin: 5px 0px 0px 0px!important;
    
    a{  
        text-decoration: none;
        line-height: 21px;
        margin: 0px 0px 0px 5px;

        span{
            margin: 0px;
        }

        &:hover{
            ${Underline}{
                &::after{ 
                    width: 100%;
                }
            }
        }
    }
`

const ShopServiceSubBox = styled.div
    `
    display: flex;
    margin: 5px 0px 0px 0px !important;
    line-height: 21px;

     a{  
        text-decoration: none;
        margin: 0px 0px 0px 5px;

        span{
            margin: 0px;
        }

        &:hover{
            ${Underline}{
                &::after{ 
                    width: 100%;
                }
            }
        }
    }
`

const GameDownloadBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const GameDownloadText = styled.span
    `

`

const GameDownloadAllBox = styled.div
    `
    display: flex;
    flex-direction: column;
    margin: 12px 0px 0px 0px;
`

const OfficialDot = styled.span
    `

`

const OfficialGameBox1 = styled.div
    `
    display: flex;
    margin: 0px 0px 5px 0px !important;
    
    a{  
        text-decoration: none;
        line-height: 21px;
        margin: 0px 0px 0px 5px;

        span{
            margin: 0px;
        }

        &:hover{
            ${Underline}{
                &::after{ 
                    width: 100%;
                }
            }
        }
    }
`

const OfficialGameBox2 = styled.div
    `
    display: flex;
    margin: 0px 0px 5px 0px !important;
    
    a{  
        text-decoration: none;
        line-height: 21px;
        margin: 0px 0px 0px 5px;

        span{
            margin: 0px;
        }

        &:hover{
            ${Underline}{
                &::after{ 
                    width: 100%;
                }
            }
        }
    }
`

const OfficialGameBox3 = styled.div
    `
    display: flex;
    margin: 0px 0px 5px 0px !important;
    
    a{  
        text-decoration: none;
        line-height: 21px;
        margin: 0px 0px 0px 5px;

        span{
            margin: 0px;
        }

        &:hover{
            ${Underline}{
                &::after{ 
                    width: 100%;
                }
            }
        }
    }
`

const OthersGameBox = styled.div
    `
    display: flex;
    
    a{  
        text-decoration: none;
        line-height: 21px;
        margin: 0px 0px 0px 5px;

        span{
            margin: 0px;
        }

        &:hover{
            ${Underline}{
                &::after{ 
                    width: 100%;
                }
            }
        }
    }
`

const WriteBoardBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const WriteBoardDotText = styled.span
    `

`

const WriteBoardAllBox = styled.div
    `
    display: flex;
    flex-direction: column;
    margin: 12px 0px 0px 0px;
`

const StrategyBoardBox = styled.div
    `
    display: flex;
    margin: 0px 0px 5px 0px !important;
    
    a{  
        text-decoration: none;
        line-height: 21px;
        margin: 0px 0px 0px 5px;

        span{
            margin: 0px;
        }

        &:hover{
            ${Underline}{
                &::after{ 
                    width: 100%;
                }
            }
        }
    }
`

const QuestionBoardBox = styled.div
    `
    display: flex;
    margin: 0px 0px 5px 0px !important;
    
    a{  
        text-decoration: none;
        line-height: 21px;
        margin: 0px 0px 0px 5px;

        span{
            margin: 0px;
        }

        &:hover{
            ${Underline}{
                &::after{ 
                    width: 100%;
                }
            }
        }
    }
`

const FreeBoardBox = styled.div
    `
    display: flex;
    
    a{  
        text-decoration: none;
        line-height: 21px;
        margin: 0px 0px 0px 5px;

        span{
            margin: 0px;
        }

        &:hover{
            ${Underline}{
                &::after{ 
                    width: 100%;
                }
            }
        }
    }

`

const WriteBoardText = styled.span
    `

`

const MyPageBtnBox = styled.div
    `
    margin: 0px 23px 0px 0px;
`

const MyPageBtnText = styled.span
    `

`

const ShopBtnBox = styled.div
    `

`

const ShopBtnText = styled.span
    `

`
const ProfileAllBox = styled.div
    `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 60px 0px 0px 0px;
    width: 100%;
`

const Profile = styled.div
    `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    
    @media (hover: hover)
    {
        &:hover
        {
            box-shadow: 0px 0px 0px 3px #6a9dda;
        }
        
    }
`

const Profileimg = styled.img
    `
    width: 130px;
    height: 130px;
`
const DropdownImg = styled.img
    `
    width: 34px;
    height: 34px;
`

const ProfileImg = styled(DropdownImg)
    `
    border-radius: 50%;
`

const ProFileSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 384px;
    }
    }
`

const WriterSlideDown = keyframes
    `
    0%{
        height: 0%;
    }
    100%{
        ${props => props.size === "DEVELOPER" ? "319px" : "255px"}
    }
`

const ProfileListBox = styled.div
    `
    display: ${props => props.default ? props.logout ? "none" : "block" : "none"};
    width: 217px;
    margin: 59px 0px 0px 56.5px;
    box-shadow: 0px 0px 0px ${props => props.show ? "3px" : "0px"} ${props => props.theme.borderColor};
    background: white;  
    height: ${props => props.show ? "384px" : "0px"};
    border-radius: 10px;
    position: absolute;
    animation: ${props => props.show ? ProFileSlideDown : "none"} 0.25s;
    overflow: hidden;
    z-index: ${props => props.zindex ? 2 : 1};
`

const FastListBox = styled(ProfileListBox)
    `
    display: ${props => props.default ? "block" : "none"};
    width: 310px;
    margin: 59px 0px 0px 11px;
    height: ${props => props.show ? "378px" : "0px"};
    z-index: ${props => props.zindex ? 2 : 1};
`

const WriteListBox = styled.div
    `
    display: ${props => props.default ? props.logout ? "none" : "block" : "none"};
    width: 217px;
    margin: 59px 0px 0px 137px;
    box-shadow: 0px 0px 0px ${props => props.show ? "3px" : "0px"} ${props => props.theme.borderColor};
    background: white;
    border-radius: 10px;
    position: absolute;
    height: ${props => props.show ? props.size === "DEVELOPER" ? "377px" : "314px" : "0px"};
    animation: ${props => props.show ? WriterSlideDown : "none"} 0.25s;
    overflow: hidden;
    z-index: ${props => props.zindex ? 2 : 1};
`

const ProfileUl = styled.ul
    `
    margin: 0px;
    padding: 0px;
    color: black;
    overflow: hidden;
    a
    {
        color: black;
        font-size: 25px;
        font-weight: bold;
        -webkit-tap-highlight-color:transparent;
    }
`

const Profileli = styled.li
    `
    list-style: none;
    cursor:pointer;
    padding: ${props => props.padding};
    font-weight: bold;
    font-size: 25px;
    display:flex;
    &:hover
    {
        background-color: #6a9dda;
    }
    &::after
    {
        content: '';
        display: ${props => props.line};
        clear: both;
        position: absolute;
        left: 50%;
        width: calc(100% - -4px);
        height: 1px;
        transform: translateX(-50%);
        background: black;
        margin: 48px 0px 0px -1px;
    }
`

const GameSubText = styled.span
    `
        font-size: 17.7px;
        margin: 0px 0px 0px 5px;
        padding: 3px 0px 2px 0px;
        color: ${props => props.role == "DEVELOPER" ? "#ededed" : "gray"};
`

const ShopSubText = styled.span
    `
        font-size: 17.7px;
        margin: 0px 0px 0px 5px;
        padding: 3px 0px 2px 0px;
        color: ${props => props.role == "SELLER" ? "#ededed" : "gray"};
`

const GameText = styled.span
    `
        font-size: 17.7px;
        margin: 0px 0px 0px 5px;
        padding: 3px 0px 2px 0px;
        color: #ededed;
`

const BoardText = styled.span
    `
        font-size: 17.7px;
        margin: 0px 0px 0px 5px;
        padding: 3px 0px 2px 0px;
        color: #ededed;
`


const ProfileliIcon = styled.i
    `
        margin-left: ${props => props.left};
`
export default HeaderBox;
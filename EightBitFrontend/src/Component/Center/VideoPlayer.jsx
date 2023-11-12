import { useState, useEffect, useRef, useCallback } from 'react';
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RiInformationLine } from "react-icons/ri";
import { AiOutlineDownload } from "react-icons/ai";
import { VscMute } from "react-icons/vsc";
import { VscUnmute } from "react-icons/vsc";
import ReactPlayer from 'react-player'
import { Link, useNavigate } from "react-router-dom";
import { Slide } from "../Game";
import InformationImgBtn from "../../Item/img/Button/Information.png";


SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

const VideoPlayler = () => {
    const navPrevRef = useRef(null);
    const navNextRef = useRef(null);
    const PaginatonRef = useRef(null);
    const [swiper, setSwiper] = useState(null);
    const [soundOnOff, setSoundOnOff] = useState(true);
    const [play, setPlay] = useState(true);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [playtime, setPlaytime] = useState(0);
    const offset = 0;
    const limit = 5;

    const swiperParams =
    {
        centeredSlides: true,
        loopAdditionalSlides: 2,
        loop: true,
        effect: "coverflow",
        navigation: { prevEl: navPrevRef.current, nextEl: navNextRef.current },

        pagination: {
            el: PaginatonRef.current,
            type: 'bullets',
            clickable: true
        },

        autoplay: {
            delay: 20000,
            disableOnInteraction: false,
        },

        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef.current;
            swiper.params.navigation.nextEl = navNextRef.current;
            swiper.activeIndex = mainImageIndex;
            swiper.navigation.update();
        },

        onSwiper: setSwiper,
        onSlideChange: (e) => setMainImageIndex(e.realIndex),
        allowSlidePrev: { Slidelength: false },

        coverflowEffect: {
            rotate: 20,
            stretch: 6,
            depth: 115,
            modifier: 1,
            scale: 1,
            slideShadows: false
        },

        breakpoints: {
            250: {
                spaceBetween: 30,
                slidesPerView: 1,
            },
            600: {
                spaceBetween: 30,
                slidesPerView: 4,
            },
            1342: {
                spaceBetween: 30,
                slidesPerView: 4,
            }
        },

    }

    function NextSlide() {
        swiper.slideNext();
        setPlay(true);
    }

    const ScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <VideoAllBox>
            <VideoBox>
                <VideoBackground />

                <VideoInformation>
                    <VideoInformationLogoBox>
                        <VideoInformationLogo src={Slide[mainImageIndex].Logo} />
                    </VideoInformationLogoBox>

                    <VideoInformationTextBox>
                        <VideoInformationText>
                            {Slide[mainImageIndex].information}
                        </VideoInformationText>
                    </VideoInformationTextBox>

                    <VideoInformationDownLoadBtnBox>

                        <Link to={`Game/${Slide[mainImageIndex].developer}/${Slide[mainImageIndex].regdate}/${Slide[mainImageIndex].contentType}`}>
                            <VideoInformationBtn>
                                <InformaionBoxImg src={InformationImgBtn} /> 
                            </VideoInformationBtn>
                        </Link>

                    </VideoInformationDownLoadBtnBox>

                </VideoInformation>

                <VideoViewBox ref={setSwiper}>
                    {Slide[mainImageIndex].video === "" ? <VideoImg src={Slide[mainImageIndex].backgroundImg} /> :
                        <VideoPlay
                            url={Slide[mainImageIndex].video}
                            loop={false}
                            onProgress={
                                (progress) => { setPlaytime(progress.playedSeconds) }
                            }
                            muted={soundOnOff}
                            playing={play}
                            width={"100%"}
                            onEnded={() => NextSlide()}
                        />
                    }
                </VideoViewBox>

                <MuteBtnBox>
                    <MuteBtn>
                        <MuteBtnIcon onClick={() => setSoundOnOff(!soundOnOff)}>
                            {soundOnOff ? <VscMute /> : <VscUnmute />}
                        </MuteBtnIcon>
                    </MuteBtn>
                </MuteBtnBox>

            </VideoBox>
            <GameSlideBox>
                <Slider {...swiperParams} ref={setSwiper}>
                    {Slide.length !== 0 && Slide.slice(offset, limit).map(({ id, mainImg, information, title,developer, regdate, contentType, thumbnailImg }) => (
                        <SwiperSlide key={id}>
                            <VideoSlideBox>
                                <Link to={`/Game/${developer}/${regdate}/${contentType}`} onClick={() => ScrollTop()}>
                                    <SlideAllBox>
                                        <SlideBox>
                                            <SlideImgBox>
                                                <ImgBox src={thumbnailImg} />
                                            </SlideImgBox>
                                        </SlideBox>
                                    </SlideAllBox>
                                </Link>
                            </VideoSlideBox>
                        </SwiperSlide>
                    ))}
                </Slider>
                <ButtonBox>
                    <PrevBtn ref={navPrevRef}><IoIosArrowBack /></PrevBtn>
                    <PaginationBtn ref={PaginatonRef}></PaginationBtn>
                    <NextBtn ref={navNextRef}><IoIosArrowForward /></NextBtn>
                </ButtonBox>
            </GameSlideBox>
        </VideoAllBox>
    );
}

export default VideoPlayler

const SlideImgBox = styled.div
    `
    position:absolute; 
    top:0; 
    left:0; 
    width:100%; 
    height:100%; 
`

const InformaionBoxImg = styled.img
`
    width: 100%;
    height: 100%;
`

const VideoSlideBox = styled.div
    `
    
`

const MuteBtnBox = styled.div
    `
    position: absolute;
    top: 38vw;
    right: 3%;
    z-index: 999;
`

const VideoViewBox = styled.div
    `
    
`

const VideoImg = styled.img
    `
    width: 100%;
    height: 56vw;

    @media (min-width:250px) and (max-width:623px)
    {
        height: 80vw;
    }
`

const MuteBtn = styled.div
    `
    margin: 0px 0px 0px 24px;
    font-size: 1.3vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    width: 55px;
    height: 55px;
    border: solid 2px white;
    border-radius: 100%;
    box-sizing: border-box;
    svg
    {
        color: white;
    }
`

const MuteBtnIcon = styled.i
    `
    font-size: 30px;
    text-align: center;
    margin: 13px 0px 7px 0px;
`

const VideoInformationDownLoadBtnBox = styled.div
    `
    display: flex;
    margin: 2vw 0px 0px 0px;
    justify-content: start;

    a
    {
        text-decoration: none;
    }
`

const VideoInformationBtn = styled.div
    `
    display: flex;
    border-radius: 5px;
    box-sizing: border-box;
    width: 17vw;
`

const VideoInformationLogoBox = styled.div
    `

`

const VideoInformationLogo = styled.img
    `
    width: 100%;
    height: 100%;
}
`

const VideoInformationTextBox = styled.div
    `
    margin: 2vw 0px 0px 0px;
    text-align: start;
`

const VideoInformationText = styled.span
    `
    color: ${props => props.theme.CenterTextColor};
    font-size: 1.5vw;
    font-weight: bold;
    transition: color 0.5s;
`

const VideoBox = styled.div
    `

`

const VideoInformation = styled.div
    `
    position: absolute;
    top: 12vw;
    right: 3vw;
    width: 24vw;
    border-radius: 18px;
    z-index: 999;

    @media (min-width:250px) and (max-width:667px)
    {
       display: none;
    }
    
`

const Slider = styled(Swiper)
    `
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    margin-bottom: 20px;
    max-width: 850px;

    a{
        text-decoration: none;
    }

    .swiper-button-next, .swiper-button-prev
    {
        top: 41%;
        background: white;
        background: white;
        border-radius: 30px;
        padding: 10px;
        border: solid 3px #55AAFF;
        width: 30px;
        height: 30px;
    }

    .swiper-button-prev.swiper-button-disabled,
    .swiper-button-next.swiper-button-disabled
    {
        display: none;
    }

    .swiper-button-prev:after,
    .swiper-button-next:after
    {
        font-size: 22px;
    }

`

const PaginationBtn = styled.div
    `
display: flex;
align-items: center;
z-index: 999;

.swiper-pagination-bullet
{
    margin: 0px 4px 0px 4px;
    background: white;
    cursor: pointer;
    opacity: 1;
}

.swiper-pagination-bullet.swiper-pagination-bullet-active
{
    background: #007aff;
    width: 20px;
    border-radius: 5px;
}
`

const PrevBtn = styled.div
    `
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    cursor: pointer;
    transition: color 0.5s;
    color: ${props => props.theme.CenterTextColor};
    font-size: 34px;
`

const NextBtn = styled.div
    `   
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    cursor: pointer;
    transition: color 0.5s;
    color: ${props => props.theme.CenterTextColor};
    font-size: 34px;
`

const GameSlideBox = styled.div
    `
    max-width: 1280px;
    position: relative;
    margin: -12vw auto 0px auto;
    padding: 0px 20px 0px 20px;
    z-index: 1000;

    @media (min-width:250px) and (max-width:549px)
    {
        margin: -9px auto 0px auto;
    }

    @media (min-width:550px) and (max-width:704px)
    {
        margin: -74px auto 0px auto;
    }

    @media (min-width:705px) and (max-width:1373px)
    {
        margin: -80px auto 0px auto;
    }
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

const SlideAllBox = styled.div
    `
    &:hover
    {
        ${AllBox}
        {
            display: flex;
        }
    }
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
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    color: white;
`

const InformaionBoxTextBox = styled.div
    `
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: rgba(41,41,41,0.8);
`

const SlideBox = styled.div
    `
    border-radius: 10px;
    position:relative; 
    width:100%; 
    height:0;
    overflow: hidden;
    padding-bottom: 160%;
`

const VideoPlay = styled(ReactPlayer)
    `
    width: 100%;
    height: 56vw !important;

    @media (min-width:250px) and (max-width:623px)
    {
        height: 80vw !important;
    }

    video
    {
        height: 100% !important;
    }
`

const VideoBackground = styled.div
    `
    position: absolute;
    background: linear-gradient(to top, rgba(25, 25, 25, 1) 5%, rgba(25, 25, 25, 0.9) 20%, rgba(25, 25, 25, 0) 54%);
    height: 56vw;
    top: 0%;
    left: 0%;
    bottom: 0%;
    right: 0%;
    z-index: 999;
    pointer-events: none;

    @media (min-width:250px) and (max-width:623px)
    {
        height: 80vw;
    }
`

const VideoAllBox = styled.div
    `
    position: relative;
`

const ButtonBox = styled.div
    `
    display: flex;
    justify-content: center;
}
`


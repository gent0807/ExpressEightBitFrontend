import { useState, useEffect, useRef, useCallback, FC } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import VideoPlayler from './VideoPlayer';
import { Slide } from "../Game";
import DOMPurify from "dompurify";
import Banner1 from "../../Item/img/mainSlide/banner/banner1.png";
import Banner2 from "../../Item/img/mainSlide/banner/banner2.png";
import { Goods } from "../CpGdShop/CpGdData";

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const CenterPage = () => {

    const navPrevRef = useRef(null);
    const navNextRef = useRef(null);
    const navPrevRef2 = useRef(null);
    const navNextRef2 = useRef(null);
    const navPrevRef4 = useRef(null);
    const navNextRef4 = useRef(null);
    const navPrevRef7 = useRef(null);
    const navNextRef7 = useRef(null);

    const PaginatonRef = useRef(null);
    const PaginatonRef2 = useRef(null);
    const PaginatonRef4 = useRef(null);
    const PaginatonRef7 = useRef(null);

    const [swiper, setSwiper] = useState(null);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [GoodsList, setGoodsList] = useState(Goods);
    const offset = 0;
    const limit = 5;

    const [AdSlide2, setAdSlide2] = useState([
        {
            id: 1,
            banner: Banner1,
        },
        {
            id: 2,
            banner: Banner2,
        },
    ]);

    const swiperParams =
    {
        navigation: { prevEl: navPrevRef.current, nextEl: navNextRef.current },
        pagination: {
            el: PaginatonRef.current,
            type: 'bullets',
            clickable: true
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef.current;
            swiper.params.navigation.nextEl = navNextRef.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },
        spaceBetween: 30,
        slidesPerView: 3,
        loop: true,
        loopAdditionalSlides: 1,
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
        breakpoints: {
            250: {
                spaceBetween: 30,
                slidesPerView: 1,
            },
            561: {
                spaceBetween: 30,
                slidesPerView: 2,
            },
            794: {
                spaceBetween: 30,
                slidesPerView: 3,
            },
        },
    }

    const swiperParams2 =
    {
        navigation: { prevEl: navPrevRef2.current, nextEl: navNextRef2.current },
        pagination: {
            el: PaginatonRef2.current,
            type: 'bullets',
            clickable: true
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef2.current;
            swiper.params.navigation.nextEl = navNextRef2.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },
        spaceBetween: 30,
        slidesPerView: 3,
        loop: true,
        loopAdditionalSlides: 1,
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
        breakpoints: {
            250: {
                spaceBetween: 30,
                slidesPerView: 1,
            },
            561: {
                spaceBetween: 30,
                slidesPerView: 2,
            },
            794: {
                spaceBetween: 30,
                slidesPerView: 3,
            },
        },
    }

    const swiperParams3 =
    {
        navigation: { prevEl: navPrevRef4.current, nextEl: navNextRef4.current },
        pagination: {
            el: PaginatonRef4.current,
            type: 'bullets',
            clickable: true
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef4.current;
            swiper.params.navigation.nextEl = navNextRef4.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },
        spaceBetween: 30,
        slidesPerView: 4,
        loop: true,
        loopAdditionalSlides: 1,
        onSwiper: setSwiper,
        allowSlidePrev: { Slidelength: false },
        breakpoints: {
            250: {
                spaceBetween: 30,
                slidesPerView: 1,
            },
            561: {
                spaceBetween: 30,
                slidesPerView: 3,
            },
            980: {
                spaceBetween: 30,
                slidesPerView: 4,
            },
        },
    }

    const AdSwiper2 =
    {
        navigation: { prevEl: navPrevRef7.current, nextEl: navNextRef7.current },
        pagination: {
            el: PaginatonRef7.current,
            type: 'bullets',
            clickable: true
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = navPrevRef7.current;
            swiper.params.navigation.nextEl = navNextRef7.current;
            swiper.activeIndex = mainImageIndex
            swiper.navigation.update();
        },
        onSwiper: setSwiper,
        onSlideChange: (e) => setMainImageIndex(e.activeIndex),
        allowSlidePrev: { Slidelength: false },
        slidesPerView: 1,
        loop: true,
        loopAdditionalSlides: 1,
        centeredSlides: true,
    }

    const ScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {
        setGoodsList(Goods.sort((a, b) => b.likecount - a.likecount).filter((Goods) => Goods.Goods === "Goods"));
    }, [Goods])

    console.log(GoodsList)

    return (
        <SwiperBox>

            <VideoPlayler />

            <AllContentBox>

                <AdContainerBox>
                    <AdSlideBox>
                        <AdSlider {...AdSwiper2} ref={setSwiper}>
                            {AdSlide2.length !== 0 && AdSlide2.map(({ id, banner }) => (
                                <SwiperSlide key={id}>
                                    <ImgAllBox>

                                        <AdImgSlideBox>
                                            <SlideImgBox>
                                                <ImgAdBox src={banner} />
                                            </SlideImgBox>
                                        </AdImgSlideBox>

                                    </ImgAllBox>
                                </SwiperSlide>
                            ))}
                        </AdSlider>
                    </AdSlideBox>

                    <AdButtonBox>
                        <PrevBtn ref={navPrevRef7}><IoIosArrowBack /></PrevBtn>
                        <PaginationBtn ref={PaginatonRef7}></PaginationBtn>
                        <NextBtn ref={navNextRef7}><IoIosArrowForward /></NextBtn>
                    </AdButtonBox>
                </AdContainerBox>

                <GameSlideBox>

                    <PopTitleBox>Best of 8bit</PopTitleBox>

                    <Slider {...swiperParams} ref={setSwiper}>
                        {Slide.length !== 0 && Slide.sort((a, b) => b.likecount - a.likecount).slice(offset, limit).map(({ id, mainImg, information, title,developer, regdate, contentType }) => (
                            <SwiperSlide key={id}>
                                <Link to={`/Game/${developer}/${regdate}/${contentType}`} onClick={() => ScrollTop()}>
                                    <SlideAllBox>
                                        <SlideBox>
                                            <SlideImgBox>
                                                <ImgBox src={mainImg} />
                                            </SlideImgBox>
                                        </SlideBox>

                                        <AllBox>
                                            <InformaionBoxTextBox>
                                                <TitleBox>{title}</TitleBox>
                                                <InformaionBox>{information}</InformaionBox>
                                            </InformaionBoxTextBox>
                                        </AllBox>
                                    </SlideAllBox>
                                </Link>
                            </SwiperSlide>
                        ))} 
                    </Slider>

                    <ButtonBox>
                        <PrevBtn ref={navPrevRef}><IoIosArrowBack /></PrevBtn>
                        <PaginationBtn ref={PaginatonRef}></PaginationBtn>
                        <NextBtn ref={navNextRef}><IoIosArrowForward /></NextBtn>
                    </ButtonBox>

                    <PopTitleBox>최신 인디게임</PopTitleBox>

                    <Slider {...swiperParams2} ref={setSwiper}>
                        {Slide.length !== 0 && Slide
                            .filter((game) => game.game === "인디게임")
                            .sort((a, b) => new Date(b.regdate) - new Date(a.regdate))
                            .slice(offset, limit)
                            .map(({ id, mainImg, information, title, developer, regdate, contentType }) => (
                                <SwiperSlide key={id}>
                                    <Link to={`/Game/${developer}/${regdate}/${contentType}`} onClick={() => ScrollTop()}>
                                        <SlideAllBox>
                                            <SlideBox>
                                                <SlideImgBox>
                                                    <ImgBox src={mainImg} />
                                                </SlideImgBox>
                                            </SlideBox>

                                            <AllBox>
                                                <InformaionBoxTextBox>
                                                    <TitleBox>{title}</TitleBox>
                                                    <InformaionBox>{information}</InformaionBox>
                                                </InformaionBoxTextBox>
                                            </AllBox>
                                        </SlideAllBox>
                                    </Link>
                                </SwiperSlide>
                            ))}
                    </Slider>

                    <ButtonBox>
                        <PrevBtn ref={navPrevRef2}><IoIosArrowBack /></PrevBtn>
                        <PaginationBtn ref={PaginatonRef2}></PaginationBtn>
                        <NextBtn ref={navNextRef2}><IoIosArrowForward /></NextBtn>
                    </ButtonBox>

                </GameSlideBox>

                <GameSlideBox>

                    <PopTitleBox>인기판매 굿즈</PopTitleBox>

                    <GoodsSlider {...swiperParams3} ref={setSwiper}>
                        {GoodsList.length !== 0 && GoodsList.slice(offset, limit).map(({ id, src, title, content, price }) => (
                            <SwiperSlide key={id}>
                                <BoardContentBox>
                                    <Link to={`/CpGdShopView/${id}`} onClick={() => ScrollTop()}>
                                        <GoodsBox>
                                            <GoodsSlideBox>
                                                <GoodsImgBox>
                                                    <CpGdShopMainImg src={src} />
                                                </GoodsImgBox>
                                            </GoodsSlideBox>

                                            <GoodsAllBox>
                                                <GoodsInformaionBoxTextBox>
                                                    <GoodsTitleBox>{title}</GoodsTitleBox>
                                                    <GoodsInformaionBox dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></GoodsInformaionBox>
                                                    <PriceBox>₩{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</PriceBox>
                                                </GoodsInformaionBoxTextBox>
                                            </GoodsAllBox>
                                        </GoodsBox>
                                    </Link>
                                </BoardContentBox>
                            </SwiperSlide>
                        ))}
                    </GoodsSlider>

                    <GoodsButtonBox>
                        <PrevBtn ref={navPrevRef4}><IoIosArrowBack /></PrevBtn>
                        <PaginationBtn ref={PaginatonRef4}></PaginationBtn>
                        <NextBtn ref={navNextRef4}><IoIosArrowForward /></NextBtn>
                    </GoodsButtonBox>

                </GameSlideBox>
            </AllContentBox>
        </SwiperBox>
    );
}

const CpGdShopMainImg = styled.img
    `
    width: 100%;
    height: 100%;
`

const PriceBox = styled.div
    `
    font-weight: bold;
    font-size: 19px;
`

const BoardContentBox = styled.div
    `
        a{
            text-decoration: none;
        }
`

const GradiBox = styled.div
    `
    position: relative;
    display: flex;
    height: 100%;
    background: rgba(25,25,25,1);
`
const GradiLeft = styled.div
    `
    background-image: linear-gradient(90deg, rgba(25,25,25,1), transparent);
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 1;
    height: 100%;
    width: 20rem;
    margin-left: -50rem;
`

const GradiRight = styled.div
    `
    background-image: linear-gradient(270deg, rgba(25,25,25,1), transparent);
    height: 100%;
    width: 20rem;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 1;
    margin-left: 30rem;
`

const ImgAllBox = styled.div
    `
    
`

const AllContentBox = styled.div
    `
    position: relative;
    z-index: 1000;
`

const AdContainerBox = styled.div
    `
    margin: 40px 0px 40px 0px;
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

    a{
        text-decoration: none;
    }

.swiper-button-next, .swiper-button-prev
{
    top: 41%;
    background: white;
    border-radius: 30px;
    padding: 10px;
    border: solid 3px #55AAFF;
    width: 30px;
    height: 30px;
}

.swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    transition-property: transform;
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

.swiper-pagination-bullet.swiper-pagination-bullet-active
{
    background: #007aff;
}
`

const GoodsSlider = styled(Slider)
    `
    height: 100%;
`

const PaginationBtn = styled.div
    `
    display: flex;
    align-items: center;
    z-index: 999;

    .swiper-pagination-bullet
    {
        align-item:center;
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

const InformaionBoxTextBox = styled.div
    `
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: rgba(41,41,41,0.8);
`

const GoodsInformaionBoxTextBox = styled.div
    `
    display: flex;
    flex-direction: column;
    padding: 12px;
    color: white;
`

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

const GoodsBox = styled.div
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
    &:hover
    {
        ${AllBox}
        {
            display: flex;
        }
    }
`

const GoodsAllBox = styled.div
    `
    position: relative;
`


const AdSlider = styled(Slider)
    `
    
`


const ButtonBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const GoodsButtonBox = styled.div
    `
    display: flex;
    justify-content: center;
`

const AdButtonBox = styled(ButtonBox)
    `
    margin: 0px 0px 0px 0px;
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
    margin: 0 auto;
    padding: 0px 20px 0px 20px;
    z-index: 999;
`

const PopTitleBox = styled.h2
    `
    margin: 70px 0px 15px 0px;
    color: ${props => props.theme.CenterTextColor};
    transition: color 0.5s;
`

const SwiperBox = styled.div
    `
   
`

const ImgBox = styled.img
    `
    width: 100%;
    height: 100%;
`

const ImgAdBox = styled.img
    `
    width: 100%;
    height: 100%;
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

const GoodsTitleBox = styled.div
    `
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 23px;
    font-weight: bold;
    margin: 0px 0px 5px 0px;
`

const AdTitleBox = styled.span
    `
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 55px;
    color: white;
    margin: 0px 0px 30px 0px;
`

const AdInformaionBox = styled.span
    `
    color : white;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 22px;
`

const InformaionBox = styled.div
    `
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    color: white;
`

const GoodsInformaionBox = styled.div
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

const AdAllBox = styled.div
    `
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    padding: 20px;
`

const SlideBox = styled.div
    `
    border-radius: 10px;
    position:relative; 
    width:100%; 
    height:0;
    overflow: hidden;
    padding-bottom: 56%;
`

const AdSlideBox = styled.div
`

`

const AdImgSlideBox = styled(SlideBox)
`
    padding-bottom: 24%;
`

const SlideImgBox = styled.div
    `
    position:absolute; 
    top:0; 
    left:0; 
    width:100%; 
    height:100%; 
`

const GoodsSlideBox = styled.div
    `
    border-radius: 10px;
    position:relative; 
    width:100%; 
    height:0;
    overflow: hidden;
    padding-bottom: 100%; 
`


const GoodsImgBox = styled.div
    `
    position:absolute; 
    top:0; 
    left:0; 
    width:100%; 
    height:100%; 
`

export default CenterPage;

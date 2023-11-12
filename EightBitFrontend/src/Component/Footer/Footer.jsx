import styled from "styled-components";
import { Outlet } from "react-router-dom"
import Logo from "../../Item/img/LOGO/8bitLight.png"

const Footer = () => {
    return (
        <>
            <Outlet />
            <FooterBackground>
                <FooterContainer>
                    <TextBox>
                        <FooterText>8bit 대표 : 박준형 주소 : 서울특별시 구로구 경인로 445 동양미래대학교</FooterText>
                        <FooterText>대표번호 : 010-4719-2523 이메일 : pqowi2000@naver.com 입점문의 : theloopholesnk@gmail.com</FooterText>
                    </TextBox>

                    <FooterText>© 2023. 8bit Inc. All Rights Reserved.</FooterText>

                    <ImgBox>
                        <LogoImg src={Logo} />
                    </ImgBox>

                </FooterContainer>
            </FooterBackground>
        </>
    );
}

export default Footer;

const ImgBox = styled.div
    `
    display: flex;
    width: 135px;
    margin: 0px 0px 0px -13px;
    height: 67px;
`

const LogoImg = styled.img
    `
    width: 100%;
    height: 100%;
`

const FooterContainer = styled.div
    `
    height: 250px;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: start;
    color: #808080;
    justify-content: center;
    padding: 0px 15px 0px 15px;
    @media (min-width:250px) and (max-width:480px)
    {
        max-width: 480px;
    }
`

const FooterBackground = styled.div
    `
    height: 250px;
    background-color: black;
    @media (min-width:250px) and (max-width:480px)
    {
        max-width: 480px;
    }
`

const TextBox = styled.div
    `
    display: flex;
    flex-direction: column;
    margin: 0px 0px 15px 0px;
`

const FooterText = styled.span
    `
    margin: 0px 0px 10px 0px;
`


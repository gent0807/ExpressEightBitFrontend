import { useState, useEffect, useRef } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { styled } from 'styled-components';
import { ErrorMessageBox, ErrorMessageIcon, ErrorMessageText, ErrorMessage } from "../Sign/Signinput"
import { isDark } from '../../Recoil/Darkmode/Darkmode';
import { work } from './PhoneAuthMode';
import { useRecoilValue } from 'recoil';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import LogoLight from "../../Item/img/LOGO/8bitLight.png";
import LogoDark from "../../Item/img/LOGO/8bitDark.png";


const Phone = () => {
    const isDarkmode = useRecoilValue(isDark);
    const authMode = useRecoilValue(work);
    const [Phone, setPhone] = useState("");
    const [PhoneAuth, setPhoneAuth] = useState("");
    const [isPhone, setIsPhone] = useState(false);
    const [isPhoneAuth, setIsPhoneAuth] = useState(false);
    const [isPhoneCheck, setIsPhoneCheck] = useState(false);
    const [isPhoneAuthCheck, setIsPhoneAuthCheck] = useState(false);
    const [isPhoneBtnCheck, setIsPhoneBtnCheck] = useState(false);
    const [isPhoneAuthBtnCheck, setIsPhoneAuthBtnCheck] = useState(false);
    const [PhoneMessage, setPhoneMessage] = useState("");
    const [PhoneAuthMessage, setPhoneAuthMessage] = useState("");
    const [isVisibled, setIsVisibled] = useState(false);
    const ip = localStorage.getItem("ip");

    const navigate = useNavigate();


    const inputRef = useRef();

    const realPhone = useRef("");

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const OnPhoneChange = (e) => {
        const currentPhone = e.target.value;
        const onlyNumber = currentPhone.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '');
        setPhone(onlyNumber);

        if (currentPhone === "") {
            setIsPhoneBtnCheck(false);
            setIsPhoneCheck(false);
        }
        else {
            const Check = /[0-9.]{10,12}$/;

            if (!Check.test(currentPhone)) {
                setIsPhoneBtnCheck(false);
                setIsPhone(false);
                setPhoneMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>올바른 휴대폰 번호을 입력해주세요!</ErrorMessageText></MessaageAllBox>);
            }
            else {
                setIsPhoneBtnCheck(true);
            }
        }
    }

    const OnPhoneAuthChange = (e) => {
        const currentPhoneAuth = e.target.value;
        setPhoneAuth(currentPhoneAuth);

        if (currentPhoneAuth === "") {
            setIsPhoneAuthBtnCheck(false);
            setIsPhoneAuthCheck(false);
        }
        else {
            setIsPhoneAuthBtnCheck(true);
        }
    }

    const PhoneData = (e) => {
        e.preventDefault();
    }

    const PhoneCheck = () => {
        const Check = /[0-9.]{10,12}$/;
        if (!Check.test(Phone)) {
            setIsPhone(false);
            setIsPhoneCheck(true);
            setPhoneMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>올바른 휴대폰 번호을 입력해주세요!</ErrorMessageText></MessaageAllBox>);
        }
        else {
            axios.post(`${ip}/Phone/authNum`, {
                phoneNum: Phone
            })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    console.log(data);
                    realPhone.current = Phone;
                    console.log(realPhone.current);
                    setIsPhoneCheck(true);
                    setPhoneMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>인증번호가 전송 되었습니다!</ErrorMessageText></MessaageAllBox>);
                    setIsVisibled(true);
                    setIsPhone(true);
                })
            setIsPhoneCheck(false);
            setPhoneMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>인증번호 전송 중...</ErrorMessageText></MessaageAllBox>);
            setIsVisibled(false);
            setIsPhone(false);
        }
    }



    const PhoneAuthCheck = () => {

        axios.post(`${ip}/Phone/check/authNum/`,
            {
                phoneNum: realPhone.current,
                authNum: PhoneAuth
            })
            .then(res => {
                return res.data;
            })
            .then(data => {
                if (data == "no") {
                    setIsPhoneAuthCheck(true);
                    setPhoneAuthMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>인증번호가 일치 하지 않습니다.</ErrorMessageText></MessaageAllBox>);
                    setIsPhoneAuth(false);
                }
                else if (data == "yes") {
                    setIsPhoneAuth(true);
                    setIsPhoneAuthCheck(true);
                    setPhoneAuthMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>인증번호가 일치 합니다!</ErrorMessageText></MessaageAllBox>);
                }
            })
    }

    const deletePhoneNum = () => {
        axios.delete(`${ip}/Phone/phone/`, {
            data: {
                phoneNum: realPhone.current
            }
        })
            .then(res => {
                return res.data;
            })
            .then(data => {
                if (data == "success") {
                    if (authMode === 'register') {
                        navigate("/Sign");
                    }
                    else if (authMode === 'find') {
                        navigate("/EmailPwFound");
                    }

                }
                else if (data == "fail") {

                }
            })
    }

    return (
        <PhoneBox>
            <LogoBox>
                <Link to='/'><PhoneAuthLOGO src={isDarkmode ? LogoLight : LogoDark} alt='로고' /></Link>
            </LogoBox>

            <IntroduceBox>
                <MainText as={"h1"}>서비스 이용을 위해 본인 확인이 필요합니다!</MainText>
                <IntroduceText>만 18세 미만인 경우 보호자 동의가 필요합니다.</IntroduceText>
            </IntroduceBox>

            <PhoneInformationBox>
                <PhoneInformation>
                    <PhoneInformationText>휴대폰 인증</PhoneInformationText>
                </PhoneInformation>
            </PhoneInformationBox>

            <PhoneInformationInputBox>
                <PhoneForm onSubmit={PhoneData}>
                    <PhoneInputBox>
                        <PhoneTitle>휴대폰</PhoneTitle>
                        <PhoneInputAllBox>
                            <PhoneInput ref={inputRef} maxlength="12" show={isPhone} check={isPhoneCheck} value={Phone} onChange={OnPhoneChange} />
                            <PhoneSendBtn type="button" onClick={PhoneCheck} show={isPhoneBtnCheck}><span>{isVisibled ? "재전송" : "전송"}</span></PhoneSendBtn>
                        </PhoneInputAllBox>
                        <MessageBox show={isPhoneCheck} color={isPhone}>{PhoneMessage}</MessageBox>
                    </PhoneInputBox>
                    <PhoneAuthBox show={isVisibled}>
                        <PhoneTitle>인증번호</PhoneTitle>
                        <PhoneInputAllBox>
                            <PhoneInput value={PhoneAuth} show={isPhoneAuth} check={isPhoneAuthCheck} onChange={OnPhoneAuthChange} />
                            <PhoneSendBtn type="button" show={isPhoneAuthBtnCheck} onClick={PhoneAuthCheck}><span>확인</span></PhoneSendBtn>
                        </PhoneInputAllBox>
                        <MessageBox show={isPhoneAuthCheck} color={isPhoneAuth}>{PhoneAuthMessage}</MessageBox>
                    </PhoneAuthBox>
                    <SubmitBox>
                        <SubmitBtn disabled={!(isPhone && isPhoneAuth)} onClick={deletePhoneNum}><span>완료</span></SubmitBtn>
                    </SubmitBox>
                </PhoneForm>
            </PhoneInformationInputBox>
        </PhoneBox>
    );
}

export default Phone;

const PhoneAuthLOGO = styled.img
    `
    width: 192px;
    height: 102px;
    -webkit-user-select: none;
`

const PhoneInformationBox = styled.div
    `
    display: flex;
    justify-content: center;
    margin: 22px 0px 22px 0px;
`

const PhoneInformationInputBox = styled.div
    `
    display: flex;
    flex-direction: column;
`

const LogoBox = styled.div
    `
    display: flex;
    justify-content: center;
}
`

const PhoneBox = styled.div
    `
`

const MessageBox = styled(ErrorMessage)
    `
    display: ${props => props.show ? "block" : "none"};
    color: ${props => props.color ? props.theme.successColor : props.theme.errorColor};
`

const MessaageAllBox = styled(ErrorMessageBox)
    `
    margin: -18px 5px 6px;
`

const PhoneForm = styled.form
    `

`

const SubmitBox = styled.div
    `
    display: flex;
    flex-direction: column;
    margin: 36px 0px 0px 0px;
`

const SubmitBtn = styled.button
    `
    max-width: 480px;
    height: 55px;
    background: ${props => props.theme.buttonColor};
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    color: white;
    font-size: 16px;
    &:active
    {
      font-size: 15px;
      opacity: 90%;
    }
    &:disabled
    {
      box-shadow: 0 0 0 1px #dddddd inset;
      background: #aaaaaa;
      pointer-events: none;
    }
`

const PhoneInputAllBox = styled.div
    `
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 3fr 1fr;
    margin: 0px 0px 20px 0px;
`

const PhoneTitle = styled.span
    `
    font-weight: bold;
    color: ${(props) => props.theme.textColor};
`

const PhoneInputBox = styled.div
    `
    display: flex;
    flex-direction: column;
    max-width: 460px;
`

const PhoneAuthBox = styled.div
    `
    display: ${props => props.show ? "block" : "none"};
    margin: 20px 0px 0px 0px;
`

const PhoneInput = styled.input
    `
    max-width: 385px;
    padding: 20px 5px 20px 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    border: none;
    outline: none;
    border-radius: 10px;
    caret-color: ${(props) => props.theme.textColor};
    background-color: #dee2e6;
    font-size:15px;
    box-shadow: ${props => props.check ? props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : "none"};

    &:focus
    {
        box-shadow: ${props => props.check ? props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : `0 0 0 2px ${props.theme.borderColor} inset`};
    }
`

const PhoneSendBtn = styled.button
    `
    max-width: 100px;
    height: 60px;
    border: none;
    background: ${(props) => props.show ? props.theme.buttonColor : "#aaaaaa"};
    color: white;
    border-radius: 0.4rem;
    font-size: 15px;
    cursor: pointer;
    margin: 20px 0px 20px 10px;
    pointer-events: ${(props) => props.show ? "true" : "none"};
    &:active
    {
        opacity: 90%;
    }

    &:disabled
    {
      padding: 16px;
      box-shadow: 0 0 0 1px #dddddd inset;
      background: #aaaaaa;
      pointer-events: none;
    }
`

const PhoneInformation = styled.div
    `
    width: 100px;
    border: solid 3px ${(props) => props.theme.borderColor};
    padding: 10px;
    text-align: center;
    border-radius: 20px;
`

const PhoneInformationText = styled.span
    `
    font-weight: bold;
    color: ${(props) => props.theme.textColor};
`

const MainText = styled.span
    `
    font-size: 25px;
    opacity: 100%;
`

const IntroduceText = styled.span
    `

`

const IntroduceBox = styled.div
    `
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${(props) => props.theme.textColor};
`
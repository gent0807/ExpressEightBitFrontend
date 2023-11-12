import React, { useRef, useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiErrorWarningFill } from "react-icons/ri";
import { RiKakaoTalkFill } from 'react-icons/ri';
import { BsGithub } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { loginState } from '../../Redux/User';
import { isDark } from '../../Recoil/Darkmode/Darkmode';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ScrollTop } from '../Header/TopNavBar';
import { work } from '../Phone/PhoneAuthMode';

import LogoLight from "../../Item/img/LOGO/8bitLight.png";
import LogoDark from "../../Item/img/LOGO/8bitDark.png";

const Logininput = () => {
  const [authMode, setAuthMode] = useRecoilState(work);
  const [Email, setEmail] = useState('');
  const [Pw, setPw] = useState('');
  //const [loginCheck,setLoginCheck]=React.useState('');
  const [message, setMessage] = useState('');
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkmode = useRecoilValue(isDark);
  const inputRef = useRef();
  const ip = localStorage.getItem("ip");
  let loginCheck;

  localStorage.setItem("loginMaintain", isShow);

  const user = useSelector(state => state.user);
  const loginMaintain = localStorage.getItem("loginMaintain");
  let userInfo = localStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  console.log("loginMaintain", loginMaintain);
  console.log("userInfo", userInfo);
  console.log("user", user);

  useEffect(() => {
    inputRef.current.focus();
    setAuthMode('find');
  }, []);

  const Show = () => {
    setIsShow(!isShow);
  }

  const OnChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
  }

  const OnChangePw = (e) => {
    const currentPw = e.target.value;
    setPw(currentPw);
  }

  const OnCheckSubmit = (e) => {
    e.preventDefault();
    if (Email == "" && Pw == "") {
      setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>이메일과 패스워드를 입력하세요!</ErrorMessageText></ErrorMessageBox>]);
    }
    else if (Email != "" && Pw == "") {
      setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>패스워드를 입력하세요!</ErrorMessageText></ErrorMessageBox>]);
    }
    else if (Email == "" && Pw != "") {
      setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>이메일을 입력하세요!</ErrorMessageText></ErrorMessageBox>]);
    }
    else {

      axios.post(`${ip}/Users/check/login/`, {
        email: Email,
        password: Pw
      }
      )
        .then(res => {
          return res.data;
        })
        .then(data => {
          console.log(data); 
          loginCheck = data.loginState;
          if (loginCheck == "emailok") {
            setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>비밀번호가 틀렸습니다!</ErrorMessageText></ErrorMessageBox>])
          }
          else if (loginCheck == "no") {
            setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>가입되지 않은 이메일입니다!</ErrorMessageText></ErrorMessageBox>])
          }
          else if (loginCheck == "allok") {
            setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>로그인 가능</ErrorMessageText></ErrorMessageBox>])
            dispatch(loginState(data));
            localStorage.setItem("loginMaintain", isShow);
            if (isShow == true) {
              localStorage.setItem("userInfo", JSON.stringify(data));
            }
            console.log(localStorage.getItem("userInfo"));
            navigate("/");
          }
        });
      /*if(loginCheck=="emailok"){   <- 위에 함수 호출로 인한 실행과 비동기적이기 때문에 위에서의 loginCheck와는 동기화되지 않는다. 즉 최초의 submit 이벤트 처리시에는 axios 함수에서의 loginCheck와 axios와 비동기적으로 실행되는 if문에서의 loginCheck는 다를 수 밖에 없다.
          console.log('까비');           
      }*/
    }
  }



  return (
    <LoginT>
      <LoginTop>
        <Link to='/'>
          <LoginTopLOGO src={isDarkmode ? LogoLight : LogoDark} alt='로고' />
        </Link>
      </LoginTop>

      <LoginInput>
        <InputT>
          <Sumbit
            onSubmit={OnCheckSubmit}
          >
            <InputAllBox>
              <InputBox
                ref={inputRef}
                placeholder="E-mail"
                onChange={OnChangeEmail}
              />
              <PwInputBox
                placeholder="Password"
                onChange={OnChangePw}
                type='password'
              />
            </InputAllBox>

            <ErrorMessageShow show={message}>{message}</ErrorMessageShow>

            <LoginMaintainT>
              <LoginMaintainCheckBox type='checkbox' onClick={Show} />
              <LoginMaintain>로그인 유지</LoginMaintain>
              <LoginMaintainMessageShow show={isShow}>
                <LoginMaintainText>개인정보 보호를 위해 개인 PC에서만 사용하세요.</LoginMaintainText>
              </LoginMaintainMessageShow>
            </LoginMaintainT>
            <LoginBtnT>
              <LoginBtn type="submit">로그인</LoginBtn>
            </LoginBtnT>
          </Sumbit>
        </InputT>

        <Line><LineText>또는</LineText></Line>

        <EmPwFoundT>
          <EmailPwFoundList>
            <EmailPwFoundListLiBar onClick={() => ScrollTop()}><Link to='/PhoneAuth'>이메일/비밀번호 찾기</Link></EmailPwFoundListLiBar>
            <EmailPwFoundListLI onClick={() => ScrollTop()}><Link to='/SelectSign'>회원가입</Link></EmailPwFoundListLI>
          </EmailPwFoundList>
        </EmPwFoundT>

      </LoginInput>
    </LoginT>
  );
}

const LoginMaintainText = styled.div
  `

`

const LineText = styled.span
  `
`

const InputAllBox = styled.div
  `
    display: flex;
    flex-direction: column;
`

export const InputBox = styled.input
  `
    max-width: 435px;
    height: 20px;
    padding: 20px 5px 20px 20px;
    margin-bottom: 10px;
    border: none;
    border-radius: 10px;
    caret-color: ${(props) => props.theme.textColor};
    background-color: #dee2e6;
    outline: none;
    font-size:15px;
    &:focus
    {
      box-shadow: 0 0 0 2px ${(props) => props.theme.borderColor} inset;
    }
    &::placeholder
    {
      color:gray;
      font-weight:bolder;
      opacity: 50%;
      font-size: 15px;
    }
`

const PwInputBox = styled(InputBox)
  `
    font-family: "";
`

const ErrorMessageBox = styled.div
  `
    display: flex;

`

const ErrorMessageIcon = styled.i
  `
    margin: 1px 9px 0px;
`

const LoginT = styled.div
  `
    position:relative;
`

const LoginTop = styled.div
  `
    text-align: center;
    margin-bottom: 50px;
`
export const LoginTopLOGO = styled.img
  `
    width: 192px;
    height: 102px;
    margin: 0px 0px 32px 0px;
    -webkit-user-select: none;
`

const LoginInput = styled.div
  `
    display: flex;
    flex-direction: column;
`

const InputT = styled.div
  `

`

const Sumbit = styled.form
  `
`

const ErrorMessageShow = styled.p
  `
    display: ${props => props.show === "" ? "none" : "inline-block"};
    margin: 0px;
    font-size: 15px;
    color: ${(props) => props.theme.errorColor};
`

const LoginMaintain = styled.p
  `
    font-size: 16px;
    margin-top: 14px;
    margin-left: 4px;
    font-weight: 400;
    color: ${(props) => props.theme.textColor};
`

const LoginMaintainT = styled.div
  `
    margin: -9px 0px 15px 0px;
    display: flex;
    height: 54px;
`

const LoginMaintainCheckBox = styled.input
  `
    accent-color: ${(props) => props.theme.checkBoxColor};
    zoom: 1.5;
    margin-top: -2px;
    &:checked
    {
      accent-color: ${(props) => props.theme.checkBoxColor};
      zoom: 1.5;
      margin-top: -2px;
    }
`

const LoginMaintainMessageShow = styled.p
  `
    display: ${props => props.show ? "block" : "none"};
    margin: 40px 0px 0px -100px;
    font-size: 12px;
    color: ${(props) => props.theme.textColor};
`

const LoginBtnT = styled.div
  `
    display: flex;
    flex-direction: column;
`

const LoginBtn = styled.button
  `
    max-width: 460px;
    height: 51px;
    padding: 0px 16px;
    background: ${(props) => props.theme.buttonColor};
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    color:white;
    font-size: 100%;
    margin-bottom: 30px;
  &:active
  {
      padding: 10px;
      background: ${(props) => props.theme.buttonColor};
      font-size: 90%;
      opacity: 90%;
  }
`

export const Line = styled.p
  `
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.textColor};
    font-size: 13px;
    &::before
    {
      height: 1px;
      flex: 1 1 0%;
      content: "";
      background-color: ${(props) => props.theme.textColor};
    }
    &::after
    {
      height: 1px;
      flex: 1 1 0%;
      content: "";
      background-color: ${(props) => props.theme.textColor};
    }
`

const Text = styled.span
`

`

const LOGINAPI = styled.div
  `
`

const EmPwFoundT = styled.div
  `
`

export const EmailPwFoundList = styled.ul
  `
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    list-style: none;
    padding: 0px;
`
export const APIListA = styled.a.attrs((props) => ({ href: props.API }))
  `
    display: inline-block;
    padding: 5px;
    margin: 0px 5px 0px 5px;
    width: 44px;
    height: 44px;
    border-radius: 30px;
    border: 1px solid ${props => props.border};
    background-color: ${props => props.background};
    cursor: pointer;
    color: white;
    svg
    {
      padding: 10px;
      width: 24px;
      height: 24px;
    }
`

const APIList = styled(EmailPwFoundList)
  `
    margin:40px 0px 40px 0px;
    li:nth-child(3){
        svg{color: black;}
    }
`


const APIListLI = styled.li
  `
`

const EmailPwFoundListLI = styled.li
  `
    padding: 0px 10px 0px 10px;
    a
    {
      color: ${props => props.theme.textColor};
      text-decoration: none;
    }
`

const EmailPwFoundListLiBar = styled(EmailPwFoundListLI)
  `
  &::after {
    background: ${props => props.theme.textColor};
    position: absolute;
    content: "";
    display: inline-block;
    width: 2px;height: 11px;
    margin: 4px 10px 0px 10px;
}
`

const ErrorMessageText = styled.span
  `

`
export default Logininput;
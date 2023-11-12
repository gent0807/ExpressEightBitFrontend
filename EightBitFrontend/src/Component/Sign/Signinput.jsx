import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { RiErrorWarningFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled, keyframes } from 'styled-components';
import { isDark } from '../../Recoil/Darkmode/Darkmode';
import { useRecoilValue } from 'recoil';
import { ScrollTop } from '../Header/TopNavBar'

import LogoLight from "../../Item/img/LOGO/8bitLight.png";
import LogoDark from "../../Item/img/LOGO/8bitDark.png";


const Signinput = (props) => {
  const [Email, setEmail] = useState("");
  const [EmailCert, setEmailCert] = useState("");
  const [Pw, setPw] = useState("");
  const [PwConfirm, setPwConfirm] = useState("");
  const [Nickname, setNickname] = useState("");
  const [SelectValue, setSelectValue] = useState("naver.com");
  const [MenuText, setMenuText] = useState("naver.com")
  const [InputDirect, setInputDirect] = useState("naver.com");

  const [PwMessage, setPwMessage] = useState("");
  const [EmailMessage, setEmailMessage] = useState("");
  const [PwConfirmMessage, setPwConfirmMessage] = useState("");
  const [NicknameMessage, setNicknameMessage] = useState("");
  const [EmailCertCheckMessage, setEmailCertCheckMessage] = useState("");

  const [isPw, setIsPw] = useState(false);
  const [isPwConfirm, setIsPwConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isEmailCertCheck, setIsEmailCertCheck] = useState(false);
  const [isEmailCertCheckBtn, setIsEmailCertCheckBtn] = useState(true);
  const [isInputCheck, setIsInputCheck] = useState(true);
  const [isConfirmCheck, setIsConfirmCheck] = useState(false);
  const [isSelectBtnCheck, setIsSelectBtnCheck] = useState(true);
  const [isInputDirect, setIsInputDirect] = useState(false);
  const [isInputPwCheck, setIsInputPwCheck] = useState(false);
  const [isInputPwConfirmCheck, setIsInputPwConfirmCheck] = useState(false);
  const [isInputNicknameCheck, setIsInputNicknameCheck] = useState(false);

  const [isVisibled, setVisibled] = useState(false);
  const isDarkmode = useRecoilValue(isDark);
  const ip = localStorage.getItem("ip");


  const navigate = useNavigate();



  const certEmail = useRef(null);
  const compareMode = useRef(false);
  const password = useRef("");
  const passwordPossibleCombCheck = useRef(false);
  const nickNamePossible = useRef(false);
  const finalEmail = useRef("");
  const authNum = useRef(null);
  const inputFocus = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);


  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    function handleOuside(e) {
      if (textRef.current && !textRef.current.contains(e.target)) {
        setIsSelectBtnCheck(true);
      };
    };

    if (isSelectBtnCheck) {
      document.addEventListener("mousedown", handleOuside);
    };
    return () => {
      document.removeEventListener("mousedown", handleOuside);
    };
  }, [textRef]);

  const setEmailDomain = (e) => {
    const { innerText } = e.target;
    console.log(innerText);
    setSelectValue(innerText);
    setMenuText(innerText)
    setInputDirect(innerText);
    setIsInputDirect(false);
  }

  const readyToWirteInputDirect = (e) => {
    const { innerText } = e.target;
    setInputDirect("");
    setIsInputDirect(true);
    setSelectValue(InputDirect);
    setMenuText(innerText)
    return inputFocus.current.focus();
  }

  const checkAndSetInputDirect = (e) => {
    const InputDirect = e.target.value;
    const onlytext = InputDirect.replace(/[~!@#$%^&*()_+|<>?:{}]/g, '');
    setInputDirect(onlytext);
  }

  const checkAuthNumberRight = () => {
    setIsInputCheck(false)


    axios.post(`${ip}/Email/check/authNum`,
      {
        email: certEmail.current,
        authNum: EmailCert
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log(data);
        if (data == "no") {
          setIsEmailCertCheck(false);
          setIsEmailCertCheckBtn(false);
          setIsConfirmCheck(false);
          setEmailCertCheckMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>인증번호가 일치하지 않습니다.</ErrorMessageText></ErrorMessageBox>]);
        }
        else if (data == "yes") {
          setIsEmailCertCheck(true);
          setIsEmailCertCheckBtn(true);
          setIsConfirmCheck(true);
          setEmailCertCheckMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>인증번호가 일치합니다.</ErrorMessageText></ErrorMessageBox>]);
          setIsEmail(false);
        }

      })

  }


  const checkEmail = (e) => {
    const currentEmail = e.target.value;
    const onlytext = currentEmail.replace(/[~!@#$%^&*()_+|<>?:{}]/g, '');
    setEmail(onlytext);

    const Check = /^([0-9a-zA-Z_\.-]+)/;
    if (!Check.test(currentEmail)) {
      setIsEmail(false);
    }
    else {
      setIsEmail(true);
    }

  };

  const setAuthNumber = (e) => {
    const currentEmailCert = e.target.value;
    //const onlynumber = currentEmailCert.replace(/[^0-9]/g, '');
    setEmailCert(currentEmailCert);

    if (!EmailCert) {
      setIsEmailCertCheckBtn(false);
    }
  };

  const OnChangePw = (e) => {
    const currentPw = e.target.value;
    setPw(currentPw);
    const PwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (currentPw === "") {
      setIsInputPwCheck(false);
    }
    else {
      setIsInputPwCheck(true);
    }


    if (!PwCheck.test(currentPw)) {
      setPwMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>]);
      setIsPw(false);
      passwordPossibleCombCheck.current = false;
    } else {
      setPwMessage("");
      setIsPw(true);
      passwordPossibleCombCheck.current = true;
    }

    if (compareMode.current == true) {
      if (currentPw !== PwConfirm) {
        setPwConfirmMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>비밀번호가 일치하지 않습니다!</ErrorMessageText></ErrorMessageBox>]);
        setIsPwConfirm(false);
        if (PwConfirm == "") {
          setIsPw(true);
        }
        else if (PwConfirm != "") {
          setIsPw(false);
        }
      }
      else if (currentPw == PwConfirm) {
        setPwConfirmMessage("");

        if (passwordPossibleCombCheck.current == false) {
          setIsPwConfirm(false);
          setIsPw(false);
        }

        else if (passwordPossibleCombCheck.current == true) {
          setIsPwConfirm(true);
          setIsPw(true);
        }
      }
    }
  };

  const OnChangePwConfirm = (e) => {
    const currentPwConfirm = e.target.value;
    setPwConfirm(currentPwConfirm);

    if (currentPwConfirm === "") {
      compareMode.current = false;
      setIsInputPwConfirmCheck(false);
      if (passwordPossibleCombCheck.current == true) {
        setIsPw(true);
        setPwMessage("")
      }
      else if (passwordPossibleCombCheck.current == false) {
        setIsPw(false);
        setPwMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>]);
      }
    }
    else {
      compareMode.current = true;
      setIsInputPwConfirmCheck(true);
      if (Pw !== currentPwConfirm) {
        setIsPw(false);
        setPwConfirmMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>비밀번호가 일치하지 않습니다!</ErrorMessageText></ErrorMessageBox>])
        setIsPwConfirm(false);
      }
      else if (Pw == currentPwConfirm) {
        if (passwordPossibleCombCheck.current == false) {
          setIsPw(false);
          setIsPwConfirm(false);
          setPwMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>]);
          setPwConfirmMessage("");
        }
        else if (passwordPossibleCombCheck.current == true) {
          setPwConfirmMessage("");
          setIsPwConfirm(true);
          setIsPw(true);
        }
      }
    }


  };


  const checkAlreadySigning = () => {
    const EmailTotal = Email + "@" + SelectValue;
    const EmailTotalCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    setEmailCertCheckMessage("");
    setEmailCert("");
    setIsInputCheck(true);

    if (!EmailTotalCheck.test(EmailTotal) || InputDirect === "") {
      setEmailMessage([<div style={{ display: "flex", position: "absolute", margin: "0px 5px 6px" }}>
        <i style={{ margin: "-3px 5px 6px" }}><RiErrorWarningFill /></i>
        <span style={{ margin: "-3px 5px 6px" }}>올바른 이메일 작성해 주세요!</span>
      </div>])
      setVisibled(false);
    } else {


      finalEmail.current = EmailTotal;

      axios.post(`${ip}/Users/check/email/already`, {
        email: EmailTotal
      })
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (data === "yes") {
            setEmailMessage([<div style={{ display: "flex", position: "absolute", margin: "0px 5px 6px" }}>
              <i style={{ margin: "-3px 5px 6px" }}><RiErrorWarningFill /></i>
              <span style={{ margin: "-3px 5px 6px" }}>이미 가입된 이메일 입니다.</span>
            </div>]);
            setVisibled(false);
          }
          else {
            axios.post(`${ip}/Email/authNum`, {
              email: EmailTotal
            })
              .then(res => {
                return res.data;
              })
              .then(data => {
                setEmailMessage([<div style={{ display: "flex", position: "absolute", margin: "0px 5px 6px" }}>
                  <i style={{ margin: "-3px 5px 6px" }}><RiErrorWarningFill /></i>
                  <span style={{ margin: "-3px 5px 6px" }}>인증번호가 전송되었습니다.</span>
                </div>]);
                setVisibled(true);
                certEmail.current = EmailTotal;
              });
            setEmailMessage([<div style={{ display: "flex", position: "absolute", margin: "0px 5px 6px" }}>
              <i style={{ margin: "-3px 5px 6px" }}><RiErrorWarningFill /></i>
              <span style={{ margin: "-3px 5px 6px" }}>인증번호 전송 중...</span>
            </div>]);
            setVisibled(false);
          }

        });
    }
  }

  const checkAlreadyNickRegistered = (e) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);

    if (currentNickname === "") {
      setIsInputNicknameCheck(false);
    }
    else {
      setIsInputNicknameCheck(true);
    }

    if (currentNickname.length > 6 || currentNickname.length < 2) {
      setNicknameMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>닉네임은 2자리에서 5자리 내로 작성해주세요!</ErrorMessageText></ErrorMessageBox>]);
      setIsNickname(false);
    } else {
      axios.post(`${ip}/Users/check/nick/already`, {
        nickname: currentNickname
      }
      )
        .then(res => {
          return res.data;
        })
        .then(data => {

          if (data === "yes") {
            setNicknameMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>이미 사용 중인 닉네임입니다!</ErrorMessageText></ErrorMessageBox>])
            setIsNickname(false);
          }
          else if (data === "no") {
            setNicknameMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill /></ErrorMessageIcon><ErrorMessageText>사용가능한 닉네임입니다.</ErrorMessageText></ErrorMessageBox>])
            setIsNickname(true);
          }


        });
    }

  }


  const register = (e) => {
    e.preventDefault();

    axios.post(`${ip}/Users/user`,
      {
        email: finalEmail.current,
        password: PwConfirm,
        nickname: Nickname,
        role: "USER",
        profileImgPath: "default.jpg",
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data === "OK") {
          navigate("/Login");
        }
        else if(data === "NO"){
          alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
        }
      });
  }

  console.log(inputRef);

  return (
    <SignT>
      <SignTop>
        <Link to='/'>
          <SignTopLogo src={isDarkmode ? LogoLight : LogoDark} alt='로고' />
        </Link>
      </SignTop>
      <SubmitT onSubmit={register}>
        <SignInputT>
          <InformaionLogoBox>
            <Information>
              <SignTitle className='title'>회원가입</SignTitle>
            </Information>
          </InformaionLogoBox>

          <Title htmlFor="email">이메일</Title>

          <EmailCheckT>
            <EmailBox>
              <EmailInputBox>
                <EmailInput
                  ref={inputRef}
                  disabled={isEmailCertCheck}
                  value={Email}
                  onChange={checkEmail}
                  placeholder="이메일"
                />

                <EmailText>@</EmailText>

                <SelectInput
                  disabled={isInputDirect ? false : true}
                  ON={isInputDirect}
                  value={InputDirect}
                  ref={inputFocus}
                  onChange={checkAndSetInputDirect}
                />
              </EmailInputBox>

              <SelectBox
                ref={textRef}
                ON={isInputDirect}
                onClick={() => setIsSelectBtnCheck(!isSelectBtnCheck)}
                show={isSelectBtnCheck}
                event={isEmailCertCheck}
              >

                <SelectTextBox>
                  <SelectValueText>{MenuText}</SelectValueText>
                  <ArrowBox direction={isSelectBtnCheck}>{isSelectBtnCheck ? "▼" : "▲"}</ ArrowBox>
                </SelectTextBox>

                <SelectOption showli={isSelectBtnCheck}>
                  <SelectOptionLI value="naver.com" onClick={setEmailDomain}>naver.com</SelectOptionLI>
                  <SelectOptionLI value="gmail.com" onClick={setEmailDomain}>gmail.com</SelectOptionLI>
                  <SelectOptionLI value="hanmail.net" onClick={setEmailDomain}>hanmail.net</SelectOptionLI>
                  <SelectOptionLI value="nate.com" onClick={setEmailDomain}>nate.com</SelectOptionLI>
                  <SelectOptionLI value="daum.net" onClick={setEmailDomain}>daum.net</SelectOptionLI>
                  <SelectOptionLI value="outlook.com" onClick={setEmailDomain}>outlook.com</SelectOptionLI>
                  <SelectOptionLI value="직접입력" onClick={readyToWirteInputDirect}>직접입력</SelectOptionLI>
                </SelectOption>
              </SelectBox>
            </EmailBox>

            <ErrorMessage color={isVisibled}>{EmailMessage}</ErrorMessage>

            <CertBtn
              show={isEmail}
              disabled={isEmailCertCheck}
              type="button"
              onClick={checkAlreadySigning}
            >
              <CertText>{isVisibled ? "재요청" : "인증요청"}</CertText>
            </CertBtn>


            <EmailAuthCheckT show={isVisibled}>
              <Title htmlFor="emailCert">인증번호</Title>
              <EmailCheckBtnT>
                {/*<EmailAuthInput show={isInputCheck} check={isEmailCertCheck} maxLength={6} value={EmailCert} onChange={OnChangeEmailCert}/>*/}
                <EmailAuthInput
                  placeholder="인증번호를 입력해주세요!"
                  show={isInputCheck}
                  check={isEmailCertCheck}
                  value={EmailCert}
                  onChange={setAuthNumber}
                />

                <CertCheckBtn
                  show={isEmailCertCheck}
                  type="button"
                  onClick={checkAuthNumberRight}
                >
                  <CertBtnText>{isEmailCertCheck ? "인증완료" : "인증하기"}</CertBtnText>
                </CertCheckBtn>
              </EmailCheckBtnT>

            </EmailAuthCheckT>

            <ErrorMessage color={isEmailCertCheckBtn}>{EmailCertCheckMessage}</ErrorMessage>

          </EmailCheckT>

          <Title htmlFor="Pw">비밀번호</Title>

          <PwCofirmNicknameT>
            <PwBox
              placeholder="비밀번호를 입력해주세요!"
              show={isPw}
              check={isInputPwCheck}
              type="password"
              value={Pw}
              onChange={OnChangePw}
            />

            {Pw.length > 0 && (<ErrorMessage show={isPw}>{PwMessage}</ErrorMessage>)}
          </PwCofirmNicknameT>

          <Title htmlFor="PwConfirm">비밀번호 확인</Title>

          <PwCofirmNicknameT>
            <PwCofirmBox
              placeholder="비번번호를 다시 입력해주세요!"
              show={isPwConfirm}
              check={isInputPwConfirmCheck}
              type="password"
              value={PwConfirm}
              onChange={OnChangePwConfirm}
            />

            {PwConfirm.length > 0 && (<ErrorMessage show={isPwConfirm}>{PwConfirmMessage}</ErrorMessage>)}
          </PwCofirmNicknameT>

          <Title htmlFor="Nickname">닉네임</Title>

          <PwCofirmNicknameT>
            <NicknameBox
              placeholder="닉네임을 입력해주세요!"
              show={isNickname}
              check={isInputNicknameCheck}
              value={Nickname}
              onChange={checkAlreadyNickRegistered}
            />

            {Nickname.length > 0 && (<ErrorMessage color={isNickname}>{NicknameMessage}</ErrorMessage>)}
          </PwCofirmNicknameT>

        </SignInputT>

        <SumbitButtonBox>
          <SumbitButton
            type='submit'
            disabled={!(!isEmail && isPw && isPwConfirm && isNickname && isConfirmCheck)}
          >
            <SumbitBtnText>회원가입</SumbitBtnText>
          </SumbitButton>
        </SumbitButtonBox>

        <EmPwFoundT>
          <EmailPwFoundList>
            <EmailPwFoundListLiBar onClick={() => ScrollTop()}><Link to='/Login'>로그인</Link></EmailPwFoundListLiBar>
            <EmailPwFoundListLI onClick={() => ScrollTop()}><Link to='/EmailPwFound'>이메일/비밀번호 찾기</Link></EmailPwFoundListLI>
          </EmailPwFoundList>
        </EmPwFoundT>
      </SubmitT>
    </SignT>

  );
}

const SelectTextBox = styled.div
  `
    display: flex;
    justify-content: end;
    @media (min-width:250px) and (max-width:420px)
    {
      justify-content: center;
    }
`

const EmailInputBox = styled.div
  `
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: minmax(0px, 153px) minmax(0px, 41px) minmax(0px, 153px);
`

const SumbitBtnText = styled.span
  `

`

const CertBtnText = styled.span
  `

`

const CertText = styled.span
  `

`

const EmailInput = styled.input
  `
    height: 20px;
    padding: 20px 5px 20px 15px;
    border: none;
    border-radius: 10px;
    caret-color: ${(props) => props.theme.textColor};
    background-color: #dee2e6;
    font-size:15px;
    outline: none;
    &:focus
    {
        box-shadow: 0 0 0 2px ${(props) => props.theme.borderColor} inset;
    }
`

const Title = styled.label
  `
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  margin: 14px 0px 0px 0px;
`

const SignTitle = styled.span
  `
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  font-size: 20px;
`

const SignT = styled.div
  `
  position:relative;
`

const SignInputT = styled.div
  `
    display: flex;
    flex-direction: column;
`

const SignTop = styled.div
  `
    display: flex;
    justify-content: center;
`

const SignTopLogo = styled.img
  `
    width: 192px;
    height: 102px;
    -webkit-user-select: none;
`

const EmailCheckT = styled.div
  `
    display: flex;
    flex-direction: column;
`

const EmailBox = styled.div
  `
    display: grid;
    grid-auto-flow: column;
    margin: 20px 0px 20px 0px;
`

const SubmitT = styled.form
  `
`

const InformaionLogoBox = styled.div
  `
    display: flex;
    justify-content: center;
    margin: 20px 0px 20px 0px;
`

const Information = styled.div
  `
    width: 130px;
    border: solid 3px ${(props) => props.theme.borderColor};
    padding: 10px;
    text-align: center;
    border-radius: 20px;
`

const SelectInput = styled.input
  `
    height: 20px;
    border: none;
    background-color: #dee2e6;
    font-size:15px;
    border-radius: 10px;
    outline: none;
    padding: 20px 5px 20px 15px;
    cursor: pointer;
    z-index: ${props => props.ON ? "2" : "0"};
    caret-color: ${(props) => props.theme.checkBoxColor};
    outline: none;
    &:focus
    {
        box-shadow: 0 0 0 2px ${(props) => props.theme.borderColor} inset;
    }
`

const SelectBox = styled.div
  `
    overflow: hidden;
    height: 20px;
    background-color: #dee2e6;
    font-size:15px;
    box-shadow: ${props => props.show ? "none" : `0 0 0 2px ${props.theme.borderColor} inset`};
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 20px 5px 20px 20px;
    margin: 0px 0px 0px 13px;
    z-index: 1;
    cursor: ${props => props.event ? "none" : "pointer"};
    pointer-events: ${props => props.event ? "none" : ""};
    @media (min-width:250px) and (max-width:420px)
    {
        padding: 20px 5px 20px 5px;
    }
`

const EmailText = styled.span
  `
    font-size: 25px;
    margin: 16px 7px 16px 7px;
    color: ${(props) => props.theme.textColor};
`

const slide = keyframes
  `
  0%{
    height: 0px;
  }
  100%{
    height: 248px;
  }
`

const SelectOptionLI = styled.li
  `
  padding: 10px 0px 10px 0px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  color: black;
  &:hover
  {
      background-color: ${(props) => props.theme.DropDownListColor};
  }
`

const SelectOption = styled.ul
  `
    display: ${props => props.showli ? "none" : "block"};
    position: absolute;
    background: #dee2e6;
    list-style: none;
    padding: 0px 0px 0px 0px;
    width: 128px;
    border-radius: 10px;
    border: none;
    margin: 28px 0px 0px -19px;
    box-shadow: ${props => props.showli ? "none" : `0 0 0 2px ${props.theme.borderColor} inset`};
    animation: ${slide} 0.5s;
    overflow: hidden;
    @media (min-width:250px) and (max-width:420px)
    {
        margin: 28px 0px 0px -108px;
    }
`

const SelectValueText = styled.span
  `
    width: 80px;
    margin: 1px 10px 0px 0px;
    color: black;
    @media (min-width:250px) and (max-width:420px)
    {
        display: none;
    }
`

export const ArrowBox = styled.div
  `
    margin: 3px 0px 0px 0px;
    color: ${(props) => props.theme.textColor};
    @media (min-width:250px) and (max-width:420px)
    {
        display: flex;
        justify-content: center;
    }
`

const CertBtn = styled.button
  `
    max-width: 460px;
    height: 50px;
    border: none;
    box-shadow: ${props => props.show ? "none" : "0 0 0 1px #dddddd inset"};
    background: ${props => props.show ? props.theme.buttonColor : "#aaaaaa"};
    border-radius: 0.4rem;
    cursor: pointer;
    color:white;
    font-size: 15px;
    margin: 21px 0px 21px 0px;
    pointer-events: ${props => props.show ? "true" : "none"};
    &:active
    {
      opacity: 90%;
    }
`

export const ErrorMessage = styled.p
  /*display: ${props => props.show ? "none" : "block"};*/
  `
    margin: -2px 0px 3px -6px ;
    padding: 0px;
    color: ${(props) => props.color ? props.theme.successColor : props.theme.errorColor};
    font-size: 15px;
`



const EmailAuthCheckT = styled.div
  `
    display: ${props => props.show ? "flex" : "none"};
    flex-direction: column;
`

const PwCofirmNicknameT = styled.div
  `
    display: flex;
    flex-direction: column;
`

const EmailAuthInput = styled.input
  `
  max-width: 324px;
  height: 19px;
  padding: 20px 5px 20px 20px;
  border: none;
  box-shadow: ${props => props.show ? "none" : props.check ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset`};
  border-radius: 10px;
  caret-color: ${props => props.theme.textColor};
  background-color: #dee2e6;
  font-size:15px;
  pointer-events: ${props => props.check ? "none" : "true"};
  outline: none;
  &:focus
  {
    box-shadow: ${props => props.show ? `0 0 0 2px ${props.theme.boderColor} inset` : props.check ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset`};
  }
`

const EmailCheckBtnT = styled.div
  `
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 3fr 1fr;
    margin: 20px 0px 20px 0px;
`

const CertCheckBtn = styled.button
  `
  max-width: 100px;
  height: 60px;
  box-shadow: ${props => props.show ? "0 0 0 1px #dddddd inset" : "none"};
  border: none;
  background: ${props => props.show ? "#aaaaaa" : props.theme.buttonColor};
  border-radius: 0.4rem;
  cursor: pointer;
  color:white;
  font-size: 15px;
  margin: 0px 0px 0px 11px;
  pointer-events: ${props => props.show ? "none" : "true"};
  &:active
  {
    opacity: 90%;
  }
`

const PwBox = styled.input
  `
  max-width: 435px;
  padding: 20px 5px 20px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: ${props => props.check ? props => props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : "none"};
  border-radius: 10px;
  border: none;
  caret-color: ${props => props.theme.textColor};
  background-color: #dee2e6;
  font-size:15px;
  outline: none;
  &:focus
  {
    box-shadow: ${props => props.check ? props => props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : `0 0 0 2px ${props.theme.borderColor} inset`};
  }
`

const PwCofirmBox = styled(PwBox)
  `
    box-shadow: ${props => props.check ? props => props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : "none"};
`

const NicknameBox = styled(PwBox)
  `
    box-shadow: ${props => props.check ? props => props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : "none"};
`

const SumbitButton = styled.button
  `
   
    max-width: 460px;
    padding: 15px;
    background: ${props => props.theme.buttonColor};
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    color:white;
    font-size: 100%;
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

const SumbitButtonBox = styled.div
  `
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`

export const ErrorMessageBox = styled.div
  `
    margin: -5px 5px 6px;
    display: flex;
    position: absolute;
`

export const ErrorMessageIcon = styled.i
  `
    margin: -2px 5px 6px;
`

export const ErrorMessageText = styled.span
  `
    margin: -2px 5px 6px;
`

const EmPwFoundT = styled.div
  ` 
  margin-top: 50px;
`

const EmailPwFoundListLI = styled.li
  `
    padding: 0px 10px 0px 10px;
    a
    {
      color:${props => props.theme.textColor};
      text-decoration: none;
    }
`

const EmailPwFoundList = styled.ul
  `
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    list-style: none;
    padding: 0px;
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

export default Signinput;


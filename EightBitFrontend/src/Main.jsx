import { styled, createGlobalStyle, ThemeProvider } from 'styled-components';
import Router from './Router';
import { useRecoilValue } from 'recoil';
import { isDark } from './Recoil/Darkmode/Darkmode';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

const ip = `http://59.14.217.233:8038`;


const Main = () => {

  localStorage.setItem("ip", ip);


  const isDarkmode = useRecoilValue(isDark);
  
  return (
    <ThemeProvider theme={isDarkmode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default Main;

const darkTheme =
{
  CenterBorderColor: "#007aff",
  CenterTextColor: "#007aff",
  backgroundColor: "#1e1e1e",
  textColor: "white",
  successColor: "#6a9dda",
  errorColor: "orange",
  borderColor: "#6a9dda",
  buttonColor: "#6a9dda",
  checkBoxColor: "#6a9dda",
  DropDownListColor: "orange",
  BoardTitle: "white",
  BoardInformaiton: "Orange",
  PaginationSelect: "Orange",
  PaginationOff: "#007aff",
  WriterBorder: "#55aaff",
  BoardTextView: "white"
};

const lightTheme =
{
  CenterBorderColor: "white",
  CenterTextColor: "white",
  backgroundColor: "rgba(255,255,255,1)",
  textColor: "black",
  successColor: "green",
  errorColor: "red",
  borderColor: "#3c3c3c",
  buttonColor: "#3c3c3c",
  checkBoxColor: "#3c3c3c",
  DropDownListColor: "#6a9dda",
  BoardTitle: "black",
  BoardInformaiton: "black",
  PaginationSelect: "#6a9dda",
  PaginationOff: "black",
  WriterBorder: "white",
  BoardTextView: "#6B7280"
};

const GlobalStyle = createGlobalStyle
`
  body
  {
      font-family: "LIGHT";

      input
      {
          font-family: "LIGHT";

          &::placeholder
          {
              font-family: "LIGHT";
          }

      }

      input[type=password] 
      {
          font-family: none;
      }
  
      button
      {
          font-family: "LIGHT";
      }

      background-color: ${(props) => props.theme.backgroundColor};
      transition: background-color 0.5s, background 0.5s, color 0.5s, box-shadow 0.5s, border 0.5s, accent-color 0.5s;
      background-size: cover;
      background-repeat: no-repeat;
      height: 100%;
  }
`


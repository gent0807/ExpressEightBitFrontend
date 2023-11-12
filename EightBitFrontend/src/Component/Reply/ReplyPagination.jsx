import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useRecoilValue, useRecoilState } from 'recoil';
import { firstReset } from "../../Recoil/Darkmode/Darkmode";

function ReplyPagination({ total, limit, page, setPage }) {
  const numPages = total > 0 && limit > 0 ? Math.ceil(total / limit) : 1;
  const [currPage, setCurrPage] = useState(page);
  const [WindowLength, setWindowLength] = useState(window.innerWidth);
  const [ViewArrow, setViewArrow] = useState(false);
  let firstNum = currPage - (currPage % 5) + 1 ;
  const PaginationArray = numPages - firstNum;


  const handleResize = () => {
    setWindowLength(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  })

  const ScrollTop = () => {
    window.scrollTo({ top: 1264, behavior: "smooth" });
  }

  useEffect(() => {
    if(PaginationArray > 0)
    {
        setViewArrow(true);
    }else{
        setViewArrow(false);
    }
  },[PaginationArray])

  return (
    <>
      <Nav>
        <PprevArrow
            ViewArrow={ViewArrow}
            onClick={() => { setPage(1); setCurrPage(1); ScrollTop(); }} 
            off={page === 1}
        >
          &lt;
          &lt;
        </PprevArrow>
        <PrevArrow
          onClick={() => { setPage(page - 1); setCurrPage(page - 2); ScrollTop(); }}
          off={page === 1}
          ViewArrow={ViewArrow}
        >
          &lt;
        </PrevArrow>

        <Button
          onClick={() => { setPage(firstNum); ScrollTop(); }}
          aria-current={page === firstNum ? "page" : null}>
          {firstNum}
        </Button>
        {Array(PaginationArray).fill().map((_, i) => {
          if (i <= Math.round(3)) {
            return (
              <Button
                key={i + 1}
                onClick={() => { setPage(firstNum + 1 + i); ScrollTop(); }}
                aria-current={page === firstNum + 1 + i ? "page" : null}>
                {firstNum + 1 + i}
              </Button>
            )
          }
        })}

        <NextArrow
          onClick={() => { setPage(page + 1); setCurrPage(page); ScrollTop(); }}
          off={page === numPages}
          ViewArrow={ViewArrow}
        >
          &gt;
        </NextArrow>
        <NnextArrow
            onClick={() => { setPage(numPages); setCurrPage(numPages); ScrollTop(); }} 
            off={page === numPages}
            ViewArrow={ViewArrow}
        >
          &gt;
          &gt;
        </NnextArrow>
      </Nav>
    </>
  );
}

export default ReplyPagination;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: ${props => props.off ? "grey" : props.theme.PaginationOff};
  color: white;
  font-size: 1rem;
  cursor: ${props => props.off ? "revert" : "pointer"};
  transform: ${props => props.off ? "revert" : "none"};
  pointer-events: ${props => props.off ? "none" : "true"};

g  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
  }

  &[aria-current] {
    background: #6A9DDA;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  } 
`

const PrevArrow = styled(Button)
`
  display: ${props => props.ViewArrow ? "block" : "none"};
`

const PprevArrow = styled(Button)
`
  display: ${props => props.ViewArrow ? "block" : "none"};
`

const NextArrow = styled(Button)
`
  display: ${props => props.ViewArrow ? "block" : "none"};
`

const NnextArrow = styled(Button)
`
  display: ${props => props.ViewArrow ? "block" : "none"};
`
;


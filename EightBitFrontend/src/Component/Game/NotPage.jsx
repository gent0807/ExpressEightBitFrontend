import { styled } from "styled-components";

const NotPage = () => {
    return (
        <NotPageContainer>
            <NotPageText>등록된 댓글이 없습니다.</NotPageText>
        </NotPageContainer>
    );
}

export default NotPage;

const NotPageContainer = styled.div
    `
    display: flex;
    justify-content: center;
    padding: 20px;
    color: white;
    border-bottom: solid 2px white;
    font-weight: bold;
`

const NotPageText = styled.span
    `

`
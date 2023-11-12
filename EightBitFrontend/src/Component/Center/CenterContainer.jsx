import styled from "styled-components";
import CenterPage from "./CenterPage"

let Containerbox = styled.div
    `
    width: 100%;
    min-height: 1000px;
    padding: 0px 0px 200px 0px;
    background: rgba(25,25,25,1);
`

const CenterContainer = () => {
    return (
        <Containerbox>
            <CenterPage />
        </Containerbox>
    );
}

export default CenterContainer;
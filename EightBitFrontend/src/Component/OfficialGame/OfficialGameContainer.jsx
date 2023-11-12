import styled from "styled-components";
import OfficialGamePage from "./OfficialGamePage"

let Containerbox = styled.div
    `
    width: 100%;
    height: 100vh;
    background: rgba(25,25,25,1);
`

const OfficialGameContainer = () =>
{
    return(
        <Containerbox>
            <OfficialGamePage />
        </Containerbox>
    );
}

export default OfficialGameContainer;

import styled from 'styled-components'
import GameUploadPage from './GameUploadPage';

const Containerbox = styled.div`
    margin: 0 auto;
    max-width: 1280px;
    min-height: 1000px;
    padding: 145px 0px 54px 0px;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 358px 0px 54px 0px;
    }
`


const GameUploadPageContainer = () => {
    return (
        <Containerbox>
            <GameUploadPage />
        </Containerbox>
    );
}

export default GameUploadPageContainer;
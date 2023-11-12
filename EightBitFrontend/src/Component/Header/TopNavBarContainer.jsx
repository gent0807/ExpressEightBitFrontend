import TopNavBar from './TopNavBar';
import styled from 'styled-components'


const Containerbox = styled.div`
    margin: 0 auto;
    position: fixed;
    z-index: 9999;
    width: 100%;
`

const TopNavBarContainer = () => {

    return (
        <Containerbox>
            <TopNavBar />
        </Containerbox>
    );
}

export default TopNavBarContainer;

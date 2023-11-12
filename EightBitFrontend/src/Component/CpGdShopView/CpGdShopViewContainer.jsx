import styled from 'styled-components'
import GameInformationView from './CpGdShopView';

const Containerbox = styled.div`
    width: 100%;
`


const CpGdShopViewContainer = () => {
  return (
    <Containerbox>
      <GameInformationView  />
    </Containerbox>
  );
}

export default CpGdShopViewContainer;
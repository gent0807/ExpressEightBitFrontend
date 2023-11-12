import styled from 'styled-components'
import Game from './Game';

const Containerbox = styled.div`
    width: 100%;
`


const GameContainer = () => {
  return (
    <Containerbox>
      <Game />
    </Containerbox>
  );
}

export default GameContainer;
import SelectSignInput from './SelectSignInput';
import styled from 'styled-components'

let Containerbox = styled.div`
    margin: 0 auto;
    max-width: 460px;
    height: 100vh;
    padding: 267px 0px 54px 0px;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 358px 10px 54px 10px;
    }
`

const SelectSign = () => {

  return (
    <Containerbox>
      <SelectSignInput />
    </Containerbox>
  );
}

export default SelectSign;
import styled from 'styled-components'
import EmailPwFound from './EmailPwFound';

const Containerbox = styled.div`
    margin: 0 auto;
    max-width: 460px;
    padding: 267px 0px 54px 0px;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 358px 10px 54px 10px;
    }
`


const EmailPwFoundContainer = () => {
  return (
    <Containerbox>
      <EmailPwFound />
    </Containerbox>
  );
}

export default EmailPwFoundContainer;
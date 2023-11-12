import TopNavBar from './Component/Header/TopNavBarContainer';
import Login from './Component/Login/LoginContainer';
import Sign from './Component/Sign/SignContainer';
import EmailPwFound from './Component/EmailPwFound/EmailPwFoundContainer';
import PhoneAuth from './Component/Phone/PhoneAuthContainer';
import SelectSign from "./Component/Phone/SelectSignContainer";
import Board from "./Component/Board/BoardContainer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./Component/Footer/Footer";
import NotFound from "./Component/Error/NotPageContainer";
import WriteBoard from "./Component/WriteBoard/WriteBoardContainer";
import Article from "./Component/Article/ArticleContainer";
import UpdateBoard from "./Component/UpdateBoard/UpdateBoardContainer";
import Center from "./Component/Center/CenterContainer";
import OfficialGame from "./Component/OfficialGame/OfficialGameContainer";
import IndieGame from "./Component/IndieGame/IndieGamePageContainer";
import Game from "./Component/Game/GameContainer";
import GameUploadPage from "./Component/GameUploadPage/GameUploadPageContainer";
import CpGdShopView from "./Component/CpGdShopView/CpGdShopViewContainer";
import CpGdShop from "./Component/CpGdShop/CpGdShopPageContainer";

const Router = () => {

    return (
        <BrowserRouter>
            <TopNavBar />
            <Routes>
                <Route element={<Footer />} >
                    <Route path="/Board/:contentType" element={<Board />} />
                    <Route path="/" element={<Center />} />
                    <Route path="/Article/:writer/:regdate/:contentType" element={<Article />} />
                    <Route path="/Game/:developer/:regdate/:contentType" element={<Game />} />
                    <Route path="/CpGdShopView/:id" element={<CpGdShopView />} />
                    <Route path="/GameUploadPage/:contentType" element={<GameUploadPage />} />
                </Route>
                    <Route path="/OfficialGame/:contentType" element={<OfficialGame />} />
                    <Route path="/IndieGame/:contentType" element={<IndieGame />} />
                    <Route path="/CpGdShop/:View" element={<CpGdShop />} />
                    <Route path="/WriteBoard/:contentType" element={<WriteBoard />} />
                    <Route path="/UpdateBoard/:contentType" element={<UpdateBoard />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Sign" element={<Sign />} />
                    <Route path="/SelectSign" element={<SelectSign />} />
                    <Route path="/PhoneAuth" element={<PhoneAuth />} />
                    <Route path="/EmailPwFound" element={<EmailPwFound />} />
                    <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;


import "./App.css";
import Audios from "./components/Audios/Audios";
import AudiosSort from "./components/Audios/AudiosSort";
import AudioCard from "./components/Audios/AudioCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import ContactUs from "./components/ContactusPage/ContactUs";
import Articles from "./components/Articles/Articles";
import ArticleCard from "./components/Articles/ArticleCard";
import Pictures from "./components/Pictures/Pictures";
import Books from "./components/Books/Books";
import BooksSort from "./components/Books/BooksSort";
import FavAudios from "./components/Favorites/FavAudios";
import FavScientists from "./components/Favorites/FavScientists";
import FavBook from "./components/Favorites/FavBook";
import FavPics from "./components/Favorites/FavPics";
import FavArticles from "./components/Favorites/FavArticles";
import DownloadPictures from "./components/Downloads/DownloadPictures";
import DownloadScientists from "./components/Downloads/DownloadScientists";
import DownloadAudios from "./components/Downloads/DownloadAudios";
import DownloadBooks from "./components/Downloads/DownloadBooks";
import DownloadAudioCard from "./components/Downloads/DownloadAudioCard";
import FavAudioCard from "./components/Favorites/FavAudioCard";
import NotificationPage from "./components/NotificationPage/NotificationPage";
import ConditionsAndRoles from "./components/ConditionsAndRoles/ConditionsAndRoles";
import PersonalinFormation from "./components/UserProfile/PersonalinFormation";
import UserPassword from "./components/UserProfile/UserPassword";
import LoginPage from "./components/Auth/LoginPage";
import ForgetPasswordPage from "./components/Auth/ForgetPasswordPage";
import ForgetPass2 from "./components/Auth/ForgetPass2";
import RegisterPage from "./components/Auth/RegisterPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";

import ImgCategory from "./components/Pictures/ImgCategory";
import ArticalCategory from "./components/Articles/ArticalCategory";
import AudioCategory from "./components/Audios/AudioCategory";
import AudioCategorySort from "./components/Audios/AudioCategorySort";
import AudioCardCategory from "./components/Audios/AudioCardCategory";
import ViewBook from "./components/Books/ViewBook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/audios" element={<Audios />} />
          <Route path="/audiosSort" element={<AudiosSort />} />

          {/* <Route path="/audiosCategory/:id" element={<AudioCategory />} />
          <Route path="/audiosCategorySort/:id" element={<AudioCategorySort />} /> */}
          <Route path="/audioCardCategory/:id" element={<AudioCardCategory />} />


          <Route path="/audioCard/:id" element={<AudioCard />} />



          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/articles" element={<Articles />} />

          <Route path="/articles/:id" element={<ArticalCategory />} />

          <Route path="/articleCard/:id" element={<ArticleCard />} />
          <Route path="/pictures" element={<Pictures />} />

          <Route path="/pictures/:id" element={<ImgCategory />} />

          <Route path="/Books" element={<Books />} />
          <Route path="/bookSort" element={<BooksSort />} />
          <Route path="/book/:id" element={<ViewBook />} />

          <Route path="/favScientists" element={<FavScientists />} />
          <Route path="/favAudios" element={<FavAudios />} />
          <Route path="/audioCardfav" element={<FavAudioCard />} />
          <Route path="/favBook" element={<FavBook />} />
          <Route path="/favpictures" element={<FavPics />} />
          <Route path="/favArtivles" element={<FavArticles />} />
          <Route path="/DownloadScientest" element={<DownloadScientists />} />
          <Route path="/Downloadpictures" element={<DownloadPictures />} />
          <Route path="/DownloadAudios" element={<DownloadAudios />} />
          <Route path="/DownloadBook" element={<DownloadBooks />} />
          <Route path="/audioCardDownload" element={<DownloadAudioCard />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/conditionandroles" element={<ConditionsAndRoles />} />
          <Route
            path="/personaLinformation"
            element={<PersonalinFormation />}
          />
          <Route path="/personaLPassword" element={<UserPassword />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
          <Route path="/forgetPass" element={<ForgetPass2 />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

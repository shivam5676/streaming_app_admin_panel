import AddLayout from "../components/Layouts/AddLayout";
import AddMovies from "../components/Movies/AddMovies/AddMovies";
import AddSlider from "../components/Sliders/AddSlider";
import AddWebSeries from "../components/AddWebSeries";
import AddAds from "../components/Advertisement/AddAds";
import AllAds from "../components/Advertisement/AllAds";
import AllAdmin from "../components/AllAdmin";
import AllGenreList from "../components/AllGenreList";
import AllLAyout from "../components/Layouts/AllLAyout";
import AllMovies from "../components/AllMovies";

import AllUsers from "../components/AllUSers";
import Analytics from "../components/Analytics/Analytics";
import CheckedInAllotement from "../components/CheckedInAllotement";
import CreateAdmin from "../components/CreateAdmin";

import DashBoard from "../components/dashboard/DashBoard";
import EditLayout from "../components/Layouts/EditLayout";
import EditMovies from "../components/editMovie";
import EdducationQuestionGenerator from "../components/educationQuestionGenerator";
import LanguageList from "../components/LanguageLIst";
import UserDetails from "../components/UserDetails";
import AllSliders from "../components/Sliders/AllSliders";

export const routes = [
  { path: "/addMovies", element: <AddMovies /> },
  { path: "/addWebShows", element: <AddWebSeries /> },
  { path: "/addLayout", element: <AddLayout /> },
  { path: "/addSlider", element: <AddSlider /> },
  { path: "/allMovies", element: <AllMovies /> },
  { path: "/allMovies/:edit", element: <EditMovies /> },
  { path: "/allLayouts", element: <AllLAyout /> },
  { path: "/allLayout/:edit", element: <EditLayout /> },
  { path: "/allSliders", element: <AllSliders /> },
  { path: "/genreslist", element: <AllGenreList /> },
  { path: "/LanguageList", element: <LanguageList /> },
  { path: "/QuestionUploader", element: <EdducationQuestionGenerator /> },
  { path: "/allUsers", element: <AllUsers /> },
  { path: "/userDetails/:uid", element: <UserDetails /> },
  { path: "/CheckedPoints/", element: <CheckedInAllotement /> },
  { path: "/allAdmin/", element: <AllAdmin /> },
  { path: "/createAdmin/", element: <CreateAdmin /> },
  { path: "/Analytics/", element: <Analytics /> },
  { path: "/addAds/", element: <AddAds /> },
  { path: "/allAds", element: <AllAds /> },
  { path: "*", element: <DashBoard /> },
];

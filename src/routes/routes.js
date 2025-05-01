import AddLayout from "../components/Layouts/AddLayout";
import AddMovies from "../components/Movies/AddMovies/AddMovies";
import AddSlider from "../components/Sliders/AddSlider";
import AddWebSeries from "../components/webSeries/AddWebSeries";
import AddAds from "../components/Advertisement/AddAds";
import AllAds from "../components/Advertisement/AllAds";
import AllAdmin from "../components/Admin/AllAdmin";
import AllGenreList from "../components/Genres/AllGenreList";
import AllLAyout from "../components/Layouts/AllLAyout";

import Analytics from "../components/Analytics/Analytics";

import DashBoard from "../components/dashboard/DashBoard";
import EditLayout from "../components/Layouts/EditLayout";
// import EditMovies from "../components/Movies/editMovie";

import LanguageList from "../components/Language/LanguageLIst";
import UserDetails from "../components/Users/UserDetails";
import AllSliders from "../components/Sliders/AllSliders";
import AddNotification from "../components/Notification/AddNotification";
import AllNotification from "../components/Notification/AllNotification";
import AddSubscriptionPlan from "../components/subscription/AddSubscriptionPlan";
import AllMovies from "../components/Movies/AllMovies/AllMovies";
import AllUsers from "../components/Users/AllUSers";
import CheckedInAllotement from "../components/Checked-In-Points/CheckedInAllotement";
import CreateAdmin from "../components/Admin/CreateAdmin";
import EdducationQuestionGenerator from "../components/QuestionGenerator/educationQuestionGenerator";
import EditMovies from "../components/Movies/editmovies/editMovie";
import AllSubscriptionPlan from "../components/subscription/AllSubscriptionPlan";
import Error from "../components/Error/Error";

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
  { path: "/addNotification", element: <AddNotification /> },
  { path: "/allNotification", element: <AllNotification /> },
  { path: "/addPackage", element: <AddSubscriptionPlan /> },
  { path: "/allpackages", element: <AllSubscriptionPlan /> },
  { path: "/", element: <DashBoard /> },
  // { path: "/error/:redirectUrl", element: <Error message={"User Not Authorised"} statusCode={401} /> },
];

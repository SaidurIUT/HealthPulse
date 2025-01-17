import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/user-routes/Dashboard";
import ProfileInfo from "./pages/user-routes/ProfileInfo";
import About from "./pages/About";
import Signup from "./pages/Signup";
import DoctorChatBot from "./servicePage/DoctorChatBot";
import KidsCorner from "./servicePage/KidsCorner";
import HealthCalculator from "./servicePage/HealthCalculator";
import BookDoctor from "./servicePage/BookDoctor";
import AddPost from "./components/postComponents/AddPost";
import User from "./components/User";
import PostPage from "./pages/PostPage";
import Blogs from "./pages/Blogs";
import Categories from "./components/postComponents/Categories";
import MyPosts from "./pages/user-routes/MyPosts";
import UpdateBlog from "./pages/UpdateBlog";
import UpdateUser from "./pages/UpdateUser";
import UpdatePersonalData from "./pages/UpdatePersonalData";
import DonorList from "./pages/BloodDoner";
import Quiz from "./servicePage/Quiz.jsx";
import UpdateDoctorInfoPage from "./pages/UpdateDoctorInfoPage";
import Notification from "./Notifications/Notification.jsx";

import Background from "./components/basicComponents/Background.jsx";

import NewsList from "./servicePage/NewsList";
import Weather from "./servicePage/Weather";
import PrescriptionAnalyzer from "./servicePage/PrescriptionAnalyzer";
import NearestHospital from "./servicePage/NearestHospital";

import MentalHealth from "./servicePage/MentalHealth";
import FoodSuggestion from "./servicePage/FoodSuggestion";
import MapHome from "./servicePage/MapHome";

//cabin booking part

import CabinMainPage from "./CabinBooking/CabinMainPage";

//Admin part

import AdminMainPage from "./admin_part/AdminMainPage";

//Appointment part
import AppointMainPage from "./appointPart/AppointMainPage";
import ImageAndPdfGenerator from "./servicePage/ImageGenerator";

//Chat part
import ChatMainPage from "./Chat/ChatMainPage";

//Health Tracker part
import HealthTrackerMainPage from "./HealthTracker/HealthTrackerMainPage";

//Medication part
import MedicationMainPage from "./madication/MedicationMainPage";

//Ecommerce part
import EcommerceMainPage from "./Ecommerce/EcommerceMainPage.jsx";

import MlModels from "./servicePage/MlModels";
import Pet from "./servicePage/Pet";
import QuizGame from "./servicePage/QuizGame";

library.add(fas);
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/background" element={<Background />} />

        <Route path="/landing" element={<Landing />} />

        <Route path="/service/doctor-chat-bot" element={<DoctorChatBot />} />
        <Route
          path="/service/health-calculator"
          element={<HealthCalculator />}
        />
        <Route path="/service/kids-corner" element={<KidsCorner />} />
        <Route path="/service/mentalhealth" element={<MentalHealth />} />
        <Route path="/service/food-suggestion" element={<FoodSuggestion />} />
        <Route path="/service/pet" element={<Pet />} />
        <Route path="/service/newsapp" element={<NewsList />} />
        <Route path="/service/book-doctor" element={<BookDoctor />} />
        <Route path="/service/weatherapp" element={<Weather />} />
        <Route
          path="/service/prescription-analyzer"
          element={<PrescriptionAnalyzer />}
        />
        <Route path="/service/ml-models" element={<MlModels />} />
        <Route path="/service/quiz" element={<Quiz />} />

        <Route path="/service/nearest-hospital" element={<MapHome />} />

        <Route path="/user/update-user" element={<UpdateUser />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/categories/:categoryId" element={<Categories />} />

        <Route path="/addpost" element={<AddPost />} />

        <Route path="/donors" element={<DonorList />} />

        <Route path="/user" element={<User />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-profile/:userId" element={<ProfileInfo />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="update-blog/:blogId" element={<UpdateBlog />} />
          <Route path="update-personal-info" element={<UpdatePersonalData />} />
        </Route>

        <Route
          path="/update-doctor-info/:userId"
          element={<UpdateDoctorInfoPage />}
        />

        {/* Cabin booking part */}

        <Route path="/cabin-booking/*" element={<CabinMainPage />} />

        {/* Admin part */}
        <Route path="/admin/*" element={<AdminMainPage />} />

        {/* Appointment part */}
        <Route path="/appoint/*" element={<AppointMainPage />} />

        {/* Chat part */}
        <Route path="/chat/*" element={<ChatMainPage />} />

        {/* Health Tracker part */}
        <Route path="/tracker/*" element={<HealthTrackerMainPage />} />

        {/* Medication part */}
        <Route path="/medication/*" element={<MedicationMainPage />} />

        {/* EcommercePart*/}
        <Route path="/ecommerce/*" element={<EcommerceMainPage />} />

        {/* Notification part */}
        <Route path="/notifications" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

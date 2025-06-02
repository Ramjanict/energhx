import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import CertifiedAssociates from "@/pages/standard-consumer/StandardConsumerAssociates";
import Service from "@/common/Service";
import CertifiedAssociateLayout from "@/Layout/CertifiedAssociateLayout";
import ServerSettings from "@/pages/basic-server/ServerSettings";
import MyCourses from "@/common/LMS/MyCourses";
import StandardCertificateDashboard from "@/pages/standard-developer-certified/StandardDeveloperCertificateDashboard";
import RootStandardDeveloper from "@/pages/standard-developer/RootStandardDeveloper";
import StandardDeveloperSetting from "@/pages/standard-developer/StandardDeveloperSetting";
import StandardDeveloperHistory from "@/pages/standard-developer/StandardDeveloperHistory";
import OverviewDetails from "@/common/LMS/OverviewDetails";
import MyCourseDetails from "@/components/MyCourse/MyCourseDetails";
import CourseDetails from "@/common/LMS/CourseDetails";
import AssociateProfile from "@/pages/standard-consumer/StandardConsumerAssociateProfile";
import RootBasicDeveloper from "@/pages/basic-developer/RootBasicDeveloper";
import BasicDeveloperDashboard from "@/pages/basic-developer/BasicDeveloperDashboard";
import { BasicDeveloperSetting } from "@/pages/basic-developer/BasicDeveloperSetting";
import RootBasicConsumer from "@/pages/basic-consumer/RootBasicConsumer";
import BasicConsumerDashboard from "@/pages/basic-consumer/BasicConsumerDashboard";
import BasicConsumerBuildingInfo from "@/pages/basic-consumer/BasicConsumerBuildingInfo";
import BasicConsumerHistory from "@/pages/basic-consumer/BasicConsumerHistory";
import BasicConsumerService from "@/pages/basic-consumer/BasicConsumerService";
import BasicConsumerSettings from "@/pages/basic-consumer/BasicConsumerSettings";
import RootStandardConsumer from "@/pages/standard-consumer/RootStandardConsumer";
import BasicDeveloperForm from "@/pages/basic-developer/BasicDeveloperForm";
import RootBasicServer from "@/pages/basic-server/RootBasicServer";
import BasicServerDashboard from "@/pages/basic-server/BasicServerDashboard";
import StandardConsumerDashboard from "@/pages/standard-consumer/StandardConsumerDashboard";
import StandardConsumerBuildingInfo from "@/pages/standard-consumer/StandardConsumerBuildingInfo";
import StandardConsumerAssociates from "@/pages/standard-consumer/StandardConsumerAssociates";
import StandardConsumerAssociateProfile from "@/pages/standard-consumer/StandardConsumerAssociateProfile";
import StandardConsumerSettings from "@/pages/standard-consumer/StandardConsumerSettings";
import StandardDeveloperDashboard from "@/pages/standard-developer/StandardDeveloperDashboard";
import RootStandardDeveloperCertified from "@/pages/standard-developer-certified/RootStandardDeveloperCertified";
import DeveloperCertifiedAppointmentRequest from "@/pages/standard-developer-certified/DeveloperCertifiedAppointmentRequest";
import StandardDeveloperCertifiedAllCourse from "@/pages/standard-developer-certified/StandardDeveloperCertifiedAllCourse";
import StandardDeveloperCertifiedMyCourse from "@/pages/standard-developer-certified/StandardDeveloperCertifiedMyCourse";
import StandardDeveloperCertifiedHistory from "@/pages/standard-developer-certified/StandardDeveloperCertifiedHistory";
import StandardDeveloperCertifiedSetting from "@/pages/standard-developer-certified/StandardDeveloperCertifiedSetting";
import StandardDeveloperCertifiedSubscription from "@/pages/standard-developer-certified/StandardServerCertifiedSubscription";
import StandardDeveloperCertificateDashboard from "@/pages/standard-developer-certified/StandardDeveloperCertificateDashboard";
import StandardDeveloperAllCourse from "@/pages/standard-developer/StandardDeveloperAllCourse";
import StandardDeveloperMyCourse from "@/pages/standard-developer/StandardDeveloperMyCourse";
import StandardServerDashboard from "@/pages/standard-developer/StandardDeveloperDashboard";
import RootStandardServer from "@/pages/standard-server/RootStandardServer";
import RootMyCourse from "@/common/LMS/RootMyCourse";
import StandardServerAllCourse from "@/pages/standard-server/StandardServerAllCourse";
import StandardServerMyCourse from "@/pages/standard-server/StandardServerMyCourse";
import ServerCertifiedAppointmentRequest from "@/pages/standard-server-certified/ServerCertifiedAppointmentRequest";
import RootStandardServerCertified from "@/pages/standard-server-certified/RootStandardServerCertified";
import StandardServerCertificateDashboard from "@/pages/standard-server-certified/StandardServerCertificateDashboard";
import StandardServerCertifiedAllCourse from "@/pages/standard-server-certified/StandardServerCertifiedAllCourse";
import StandardServerCertifiedMyCourse from "@/pages/standard-server-certified/StandardServerCertifiedMyCourse";
import StandardServerCertifiedSubscription from "@/pages/standard-developer-certified/StandardServerCertifiedSubscription";
import StandardServerCertifiedSetting from "@/pages/standard-developer-certified/StandardDeveloperCertifiedSetting";
import StandardServerHistory from "@/pages/standard-server/StandardServerHistory";
import StandardServerSetting from "@/pages/standard-server/StandardServerSetting";
import BasicConsumerForm from "@/pages/basic-consumer/BasicConsumerForm";
import StandardConsumerHistory from "@/pages/standard-consumer/StandardConsumerHistory";
import DevAndServerHistory from "@/common/LMS/DevAndServerHistory";
import BasicServerForm from "@/pages/basic-server/BasicServerForm";
import StandardConsumerEnergyAudit from "@/pages/standard-consumer/StandardConsumerEnergyAudit";
import SolarMicroserviceForm from "@/components/basic-consumer/Microservice/form/SolarMicroserviceForm";
import BiomassMicroServiceForm from "@/components/basic-consumer/Microservice/form/BiomassMicroServiceForm";
import TotalOverview from "@/components/basic-consumer/TotalOverview";
import WhomePage from "@/pages/wordpress/home/WhomePage";
import ContactUs from "@/pages/wordpress/contact/ContactUs";
import Energhxplus from "@/pages/wordpress/energhxplus/Energhxplus";
import Consulting from "@/pages/wordpress/consulting/Consulting";
import Research from "@/pages/wordpress/research/Research";
import AboutUs from "@/pages/wordpress/about/AboutUs";
import EvBatteryForm from "@/pages/basic-consumer/EvBatteryForm";
import AddRoomWithBuilding from "@/components/standard-consumer/step-form/AddRoomWithBuilding";
import CreatePassword from "@/components/basic-consumer/CreatePassword";
import StandardConsumerAnalysis from "@/pages/standard-consumer/StandardConsumerAnalysis";
import ResearchDetails from "@/pages/wordpress/research/ResearchDetails";
import BasicConsumerAnalysis from "@/pages/basic-consumer/BasicConsumeranalysis";
import CreatePasswordForServer from "@/components/basic-sever/CreatePasswordForServer";
import WorkExperience from "@/components/basic-sever/WorkExperience";
import Admin from "@/dashboard/pages/Admin";
import AdminLoginForm from "@/dashboard/Common/AdminLoginForm";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Admin />,
      },
      {
        path: "/admin-login",
        element: <AdminLoginForm />,
      },
      {
        path: "/home",
        element: <WhomePage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/consulting",
        element: <Consulting />,
      },
      {
        path: "/research",
        element: <Research />,
      },
      {
        path: "/research/:title",
        element: <ResearchDetails />,
      },

      {
        path: "/energhxplus",
        element: <Energhxplus />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/ev-battery/:buildingId",
        element: <EvBatteryForm />,
      },

      {
        path: "/add-room/:buildingId",
        element: <AddRoomWithBuilding />,
      },

      //only for the  consumer users
      {
        path: "/create-password",
        element: <CreatePassword />,
      },
      //only for the  server and developer users
      {
        path: "/user-create-password",
        element: <CreatePasswordForServer />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "basic-consumer",
    element: <RootBasicConsumer />,
    children: [
      { path: "", element: <BasicConsumerDashboard /> },
      { path: "dashboard", element: <BasicConsumerDashboard /> },
      { path: "buildingInformation", element: <BasicConsumerBuildingInfo /> },
      { path: "history", element: <BasicConsumerHistory /> },
      { path: "history/:id", element: <BasicConsumerService /> },
      { path: "settings", element: <BasicConsumerSettings /> },
      { path: "analysis", element: <BasicConsumerAnalysis /> },
      {
        path: "form",
        element: <BasicConsumerForm />,
      },
      {
        path: "certifiedAssociates",
        element: <CertifiedAssociateLayout />,
        children: [
          { index: true, element: <CertifiedAssociates /> },
          {
            path: "certified-associate-profile",
            element: <AssociateProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "standard-consumer",
    element: <RootStandardConsumer />,
    children: [
      { path: "", element: <StandardConsumerDashboard /> },
      { path: "dashboard", element: <StandardConsumerDashboard /> },
      {
        path: "buildingInformation",
        element: <StandardConsumerBuildingInfo />,
      },
      { path: "analysis", element: <StandardConsumerAnalysis /> },
      {
        path: "energy-audit",
        element: <StandardConsumerEnergyAudit />,
        children: [
          { index: true, path: "solar", element: <SolarMicroserviceForm /> },
          {
            index: true,
            path: "biomass",
            element: <BiomassMicroServiceForm />,
          },
          {
            index: true,
            path: "overview",
            element: <TotalOverview />,
          },
        ],
      },
      {
        path: "certifiedAssociates",
        element: <CertifiedAssociateLayout />,
        children: [
          { index: true, element: <StandardConsumerAssociates /> },
          {
            path: "certified-associate-profile",
            element: <StandardConsumerAssociateProfile />,
          },
        ],
      },
      { path: "history", element: <StandardConsumerHistory /> },
      { path: "history/:id", element: <Service /> },
      { path: "settings", element: <StandardConsumerSettings /> },
    ],
  },
  {
    path: "basic-server",
    element: <RootBasicServer />,
    children: [
      {
        path: "",
        element: <BasicServerDashboard />,
      },

      {
        path: "dashboard",
        element: <BasicServerDashboard />,
      },

      {
        path: "settings",
        element: <ServerSettings />,
      },
      {
        path: "experience",
        element: <WorkExperience />,
      },
      {
        path: "form",
        element: <BasicServerForm />,
      },
    ],
  },

  {
    path: "standard-server",
    element: <RootStandardServer />,
    children: [
      { path: "", element: <StandardServerDashboard /> },
      { path: "dashboard", element: <StandardServerDashboard /> },
      {
        path: "my-courses",
        element: <RootMyCourse />,
        children: [
          { path: "", element: <StandardServerMyCourse /> },
          { path: ":id", element: <MyCourseDetails /> },
        ],
      },
      { path: "all-courses", element: <StandardServerAllCourse /> },
      { path: "all-courses/:id", element: <CourseDetails /> },
      { path: "history", element: <StandardServerHistory /> },
      { path: "settings", element: <StandardServerSetting /> },
    ],
  },

  {
    path: "standard-server-certified",
    element: <RootStandardServerCertified />,
    children: [
      { path: "", element: <StandardServerCertificateDashboard /> },
      { path: "dashboard", element: <StandardServerCertificateDashboard /> },
      {
        path: "appointment-request",
        element: <ServerCertifiedAppointmentRequest />,
      },
      { path: "my-courses", element: <StandardServerCertifiedMyCourse /> },
      { path: "all-courses", element: <StandardServerCertifiedAllCourse /> },
      { path: "history", element: <DevAndServerHistory /> },
      {
        path: "subscription",
        element: <StandardServerCertifiedSubscription />,
      },
      { path: "settings", element: <StandardServerCertifiedSetting /> },
      {
        path: "/standard-server-certified/overview/:id",
        element: <OverviewDetails />,
      },
      {
        path: "my-courses",
        element: <RootMyCourse />,
        children: [
          { path: "", element: <MyCourses /> },
          { path: ":id", element: <MyCourseDetails /> },
        ],
      },
    ],
  },

  {
    path: "basic-developer",
    element: <RootBasicDeveloper />,
    children: [
      { path: "", element: <BasicDeveloperDashboard /> },
      { path: "dashboard", element: <BasicDeveloperDashboard /> },
      { path: "settings", element: <BasicDeveloperSetting /> },
      {
        path: "experience",
        element: <WorkExperience />,
      },
      { path: "form", element: <BasicDeveloperForm /> },
    ],
  },
  {
    path: "standard-developer",
    element: <RootStandardDeveloper />,
    children: [
      { path: "", element: <StandardDeveloperDashboard /> },
      { path: "dashboard", element: <StandardDeveloperDashboard /> },
      {
        path: "my-courses",
        element: <RootMyCourse />,
        children: [
          { path: "", element: <StandardDeveloperMyCourse /> },
          { path: ":id", element: <MyCourseDetails /> },
        ],
      },
      { path: "all-courses", element: <StandardDeveloperAllCourse /> },
      { path: "all-courses/:id", element: <CourseDetails /> },
      { path: "history", element: <StandardDeveloperHistory /> },
      { path: "settings", element: <StandardDeveloperSetting /> },
    ],
  },
  {
    path: "standard-developer-certified",
    element: <RootStandardDeveloperCertified />,
    children: [
      { path: "", element: <StandardDeveloperCertificateDashboard /> },
      { path: "dashboard", element: <StandardCertificateDashboard /> },
      {
        path: "appointment-request",
        element: <DeveloperCertifiedAppointmentRequest />,
      },
      { path: "my-courses", element: <StandardDeveloperCertifiedMyCourse /> },
      { path: "all-courses", element: <StandardDeveloperCertifiedAllCourse /> },
      { path: "history", element: <StandardDeveloperCertifiedHistory /> },
      {
        path: "subscription",
        element: <StandardDeveloperCertifiedSubscription />,
      },
      { path: "settings", element: <StandardDeveloperCertifiedSetting /> },
      {
        path: "/standard-developer-certified/overview/:id",
        element: <OverviewDetails />,
      },
      {
        path: "my-courses",
        element: <RootMyCourse />,
        children: [
          { path: "", element: <MyCourses /> },
          { path: ":id", element: <MyCourseDetails /> },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;

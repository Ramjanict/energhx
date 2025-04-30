import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import AdminRoute from "./AdminRoutes";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ServerForm from "@/components/basic-sever/ServerForm";
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
import MyCourseDetails from "@/components/MyCourse/course-details/MyCourseDetails";
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
import StandardConsumerHistory from "@/pages/standard-consumer/RootStandardConsumer";
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
import StandardServerCertifiedHistory from "@/pages/standard-server-certified/StandardServerCertifiedHistory";
import StandardServerCertifiedMyCourse from "@/pages/standard-server-certified/StandardServerCertifiedMyCourse";
import StandardServerCertifiedSubscription from "@/pages/standard-developer-certified/StandardServerCertifiedSubscription";
import StandardServerCertifiedSetting from "@/pages/standard-developer-certified/StandardDeveloperCertifiedSetting";
import StandardServerHistory from "@/pages/standard-server/StandardServerHistory";
import StandardServerSetting from "@/pages/standard-server/StandardServerSetting";
import BasicConsumerForm from "@/pages/basic-consumer/BasicConsumerForm";
import TestingPurpose from "@/Layout/TestingPurpose";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "/api-testing",
        element: <TestingPurpose />,
      },
      {
        path: "/admin",
        element: <AdminRoute />,
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
        path: "form",
        element: <ServerForm />,
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
      { path: "history", element: <StandardServerCertifiedHistory /> },
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

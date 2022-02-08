import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Routes } from "../routes";


// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import User from './components/users/User';
import AddUser from './components/users/AddUser';
import authenticateServices from "../services/authenticate.services";
import { useDispatch, useSelector } from "react-redux";
import authenticationActions from "../actions/authentication.actions";
import ComingDispatchManagement from "./components/ComingDispatch/ComingDispatchManagement";
import OutGoingDispatchManagement from "./components/OutgoingDispatch/OutGoingDispatchManagement";
import AddComingDispatch from "./components/OutgoingDispatch/AddComingDispatch";
import ComingDispatchDetail from "./components/ComingDispatch/ComingDispatchDetail";
import Work from "./components/Work/Work";
import AddWork from './components/Work/AddWork';
import WorkDetail from './components/Work/WorkDetail';
import Calendar from './components/Calendar/Calendar'
import MeetingCalendar from './components/Meeting/MeetingCalendar';



import Task from "./components/Task/Task"
import TaskDetail from './components/Task/TaskDetail'
import MyTask from './components/Task/MyTask'
import Meeting from './components/Meeting/Meeting';
import MeetingDetail from './components/Meeting/MeetingDetail'
import Intivation from './components/Meeting/Invitation'
import MyWork from './components/Work/MyWork';
import StoredWork from './components/Work/StoredWork';


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { userLoaded, user } = useSelector(state => state.authentication);

  useEffect(() => {
    dispatch(authenticationActions.validateToken()).then(rs => {
      if (rs)
        dispatch(authenticationActions.getRoleOfUser(rs.id))

    })

    const timer = setTimeout(() => setLoaded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  if (!userLoaded) {
    return (
      <div>Loading...</div>
    );
  }

  if (!user) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />

    {/* components */}
    <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

    <RouteWithSidebar exact path={Routes.User.path} component={User} />

    <RouteWithSidebar exact path={Routes.AddUser.path} component={AddUser} />

    {/*  Coming dispatch  */}
    <RouteWithSidebar exact path={Routes.ComingDispatchManagement.path} component={ComingDispatchManagement} />
    <RouteWithSidebar exact path={Routes.AddComingDispatch.path} component={AddComingDispatch} />
    <RouteWithSidebar exact path={Routes.ComingDispatchDetail.path} component={ComingDispatchDetail} />

    {/*Out going dispatch*/}
    <RouteWithSidebar exact path={Routes.OutGoingDispatchManagement.path} component={OutGoingDispatchManagement} />

    <RouteWithSidebar exact path={Routes.Presentation.path} component={DashboardOverview} />
    {/* Work */}
    <RouteWithSidebar exact path={Routes.WorkManagement.path} component={Work} />
    <RouteWithSidebar exact path={Routes.AddWork.path} component={AddWork} />
    <RouteWithSidebar exact path={Routes.WorkDetail.path} component={WorkDetail} />
    <RouteWithSidebar exact path={Routes.MyWork.path} component={MyWork} />
    <RouteWithSidebar exact path={Routes.StoredWorks.path} component={StoredWork} />




    {/* Task */}
    <RouteWithSidebar exact path={Routes.TaskManagement.path} component={Task} />
    <RouteWithSidebar exact path={Routes.TaskDetail.path} component={TaskDetail} />
    <RouteWithSidebar exact path={Routes.MyTask.path} component={MyTask} />



    {/* Meeting*/}
    <RouteWithSidebar exact path={Routes.Calendar.path} component={Calendar} />
    <RouteWithSidebar exact path={Routes.MeetingCalendar.path} component={MeetingCalendar} />
    <RouteWithSidebar exact path={Routes.MeetingManager.path} component={Meeting} />
    <RouteWithSidebar exact path={Routes.MeetingDetail.path} component={MeetingDetail} />
    <RouteWithSidebar exact path={Routes.MeetingIntivation.path} component={Intivation} />








    <Redirect to={Routes.NotFound.path} />
  </Switch>
);

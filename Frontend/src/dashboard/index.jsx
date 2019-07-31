/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
//import { createBrowserHistory } from "history";
import { BrowserRouter, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss?v=1.1.0";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "./layouts/Admin.jsx";

//const hist = createBrowserHistory();

const Dashboard = (props) => {
  return(
    <BrowserRouter /*history={hist}*/>
        <AdminLayout {...props} />
        <Redirect  to="/admin/dashboard" />
    </BrowserRouter>
  );
}

export default Dashboard;
import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../components/navigation/EmployeeNav.jsx"
import { EmployeeHome } from "../components/Employee/EmployeeHome.jsx"
import { MyRoutes } from "../components/Employee/MyRoutes.jsx"
import { EmployeeProfile } from "../components/Employee/EmployeeProfile.jsx"
import { EmployeeEditProfile } from "../components/Employee/EmployeeEditProfile.jsx"
import { NewRouteForm } from "../components/route/NewRouteForm.jsx"
import { EditRoute } from "../components/route/EditRoute.jsx"
import { RouteDetails } from "../components/route/RouteDetails.jsx"



export const EmployeeViews = ({currentUser}) => {

    return (
        <Routes>
            <Route path="/" element={
                <div className="overlay">
                    <EmployeeNav />
                    <Outlet />
                </div>
            }>

                <Route index element={<EmployeeHome currentUser={currentUser}/>} />


                <Route path="myroutes">
                    <Route index element={<MyRoutes currentUser={currentUser}/>} />
                    <Route path="edit/:routeId" element={<EditRoute currentUser={currentUser}/>} />
                </Route>


                <Route path="profile">
                    <Route index element={<EmployeeProfile currentUser={currentUser}/>} />
                    <Route path=":edit" element={<EmployeeEditProfile currentUser={currentUser}/>} />
                </Route>

                <Route path="newroute" element={<NewRouteForm currentUser={currentUser}ß/>} />

                <Route path="routedetails" element={<>This will be the route information</>} />


            </Route>
        </Routes>
    )
}
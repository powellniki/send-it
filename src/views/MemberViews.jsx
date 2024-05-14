import { Outlet, Route, Routes } from "react-router-dom"
import { MemberHome } from "../components/member/MemberHome.jsx"
import { MemberNav } from "../components/navigation/MemberNav.jsx"
import { RouteDetails } from "../components/route/RouteDetails.jsx"
import { RouteTickForm } from "../components/route/RouteTickForm.jsx"
import { MemberProfile } from "../components/member/MemberProfile.jsx"
import { RouteSearch } from "../components/member/RouteSearch.jsx"
import { MemberRoutes } from "../components/member/MemberRoutes.jsx"
import { Welcome } from "./Welcome.jsx"


export const MemberViews = ({currentUser}) => {

    return (
        <Routes>
            <Route path="welcome" element={<Welcome currentUser={currentUser}/>} />

            <Route path="/" element={
                <div className="root-container">
                    <div className="main-navigation">
                        <MemberNav />
                    </div>
                    <div  className="main-container">
                        <Outlet />
                    </div>
                </div>
            }>
                <Route index element={<MemberHome currentUser={currentUser}/>}/>
                
                <Route path="myroutes" element={<MemberRoutes currentUser={currentUser} />} />

                <Route path="search" element={<RouteSearch currentUser={currentUser}/>} />

                <Route path="route">
                    <Route path=":routeId" element={<RouteDetails currentUser={currentUser} />} />
                    <Route path=":routeId/tick" element={<RouteTickForm currentUser={currentUser} />} />
                </Route>

                <Route path="myprofile" element={<MemberProfile currentUser={currentUser}/>} />

            </Route>
        </Routes>
    )
}
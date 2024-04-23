import { Outlet, Route, Routes } from "react-router-dom"
import { MemberHome } from "../components/member/MemberHome.jsx"
import { MemberNav } from "../components/navigation/MemberNav.jsx"
import { Welcome } from "./Welcome.jsx"
import { RouteDetails } from "../components/route/RouteDetails.jsx"
import { RouteTickForm } from "../components/route/RouteTickForm.jsx"


export const MemberViews = ({currentUser}) => {

    return (
        <Routes>
        <Route path="/" element={
            <>
                <MemberNav />
                <Outlet />
            </>
        }>
            <Route index element={<Welcome />} />

            <Route path="home">
                <Route index element={<MemberHome currentUser={currentUser} />} />
            </Route>

            <Route path="route">
                <Route path=":routeId" element={<RouteDetails currentUser={currentUser} />} />
                <Route path="tick" element={<RouteTickForm currentUser={currentUser} />} />
            </Route>
            


        </Route>
    </Routes>
    )
}
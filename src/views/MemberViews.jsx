import { Outlet, Route, Routes } from "react-router-dom"
import { MemberHome } from "../components/member/MemberHome.jsx"
import { MemberNav } from "../components/navigation/MemberNav.jsx"
import { Welcome } from "./Welcome.jsx"
import { RouteDetails } from "../components/route/RouteDetails.jsx"
import { RouteTickForm } from "../components/route/RouteTickForm.jsx"
import { MemberProfile } from "../components/member/MemberProfile.jsx"
import { RouteSearch } from "../components/member/RouteSearch.jsx"


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
                <Route path=":routeId/comment" element={<>this will be a comment form</>} />
                <Route path=":routeId/tick" element={<RouteTickForm currentUser={currentUser} />} />
            </Route>

            <Route path="myprofile" element={<MemberProfile currentUser={currentUser}/>} />
                <Route path="edit" element={<>this is where to edit member profile</>} />

            <Route path="search" element={<RouteSearch currentUser={currentUser}/>} />

            

        </Route>
    </Routes>
    )
}
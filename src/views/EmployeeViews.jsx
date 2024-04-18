import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../components/navigation/EmployeeNav.jsx"
import { EmployeeHome } from "../components/Employee/EmployeeHome.jsx"



export const EmployeeViews = ({currentUser}) => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <EmployeeNav />
                    <Outlet />
                </>
            }>
                <Route index element={<EmployeeHome currentUser={currentUser}/>} />

            </Route>
        </Routes>
    )
}
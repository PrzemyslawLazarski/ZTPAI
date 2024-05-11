import { NavLink,Outlet } from "react-router-dom"

export default function RootLayout(){
    return (
        <div>
        <header>
            <nav>
                <h1>Router</h1>
                <NavLink to="/">Home</NavLink>
                <NavLink to="login">Login</NavLink>
                <NavLink to="dashboard">Dashboard</NavLink>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
        </div>
    )
}
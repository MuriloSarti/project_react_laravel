import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import { Link } from "react-router-dom";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    if (!token) {
        return <Navigate to='/login' />
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.get('/logout')
            .then(({ data }) => {
                setUser(null)
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>
                        {user.name}
                    </div>
                    <div>
                        <a href="#" onClick={onLogout} className="btn-logout"> Sair </a>
                        <Link className="btn-logout" to={'/users'}>Usuarios</Link>
                    </div>
                    
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
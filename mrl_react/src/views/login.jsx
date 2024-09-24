import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function login(){

    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/login",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
        }
    });
    }

    return(
        <div className="box">
            <div className="form">
                <h1 className="h1">
                    Faça login em sua conta
                </h1>
                <form onSubmit={Submit}>
                    <input className="inputUser" ref={emailRef} type="email" placeholder="Email" />
                    <input className="inputUser" ref={passwordRef} type="password" placeholder="Senha" />
                    <button className="inputSubmit">Login</button>
                    <p className="message">
                        Não tem conta? <Link className="aa" to= '/register'>Crie sua conta</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
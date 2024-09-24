import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        getUsers();
    }, [])

    const onDeleteClick = user => {
        if (!window.confirm("Você tem certeza que quer deletar esse user?")) {
          return
        }
        axiosClient.delete(`/users/${user.id}`)
          .then(() => {
            getUsers()
          })
      }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
          .then(({ data }) => {
            setLoading(false)
            setUsers(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
      }

    return(
        <center>
        <div>
        <div>
          <h1 className="h1u">Usuarios</h1>
          <Link className="btn-add butadd" to="/users/new">Adicior novo</Link>
        </div>
        <div className="card animated fadeInDown">
          <table className="">
            <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>interação</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Link className="btn-edit" to={'/users/' + u.id}>Editar</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Deletar</button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>
        </div>
      </div>
      </center>
    )
}
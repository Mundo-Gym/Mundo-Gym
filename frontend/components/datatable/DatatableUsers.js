import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/actionUsers";
import { useEffect } from "react";

export const columnsUsers = ["Nombre", "Apellido", "DNI", "Mail", "Genero", "Fecha Nacimiento", "ID"];

export const optionsUsers = {
  filterType: 'checkbox'};



export default function DatabaseUsers() {
    const dispatch = useDispatch()
    const users = useSelector((u) => u.user.allUsers);


    useEffect(()=>{
        dispatch(getUsers())
      },[])

    // console.log(users);
    const datasUsers = users.map(({username, lastname, dni, person_datum, gender, date_born, id}) => [
            username, lastname, dni, person_datum?.email, gender, date_born, id
        ])

        return datasUsers
    }
import {FaEdit, FaTrash} from "react-icons/fa"

import "./index.css"

const UserRow = ({user, onEdit, onDelete}) => {
    return(
        <tr>
            <td>
                <input type="checkbox"/>
            </td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
            <td>{user.company.name}</td>
            <td>
                <button type="button" className="edit-btn" onClick={() => onEdit(user)}>
                    <FaEdit/>
                </button>
                <button type="button" className="delete-btn" onClick={() => onDelete(user.id)}>
                    <FaTrash size={30}/>
                </button>
            </td>
        </tr>
    )
}

export default UserRow
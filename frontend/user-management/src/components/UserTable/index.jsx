import UserRow from "../UserRow";
import "./index.css"

const UserTable = ({filteredUser, onEdit, onDelete}) =>{
    return(
        <div className="user-table-container">
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox"/>
                        </th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUser.length > 0 ? (
                        filteredUser.map((user) => (
                            <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
                        ))
                    ):(
                        <tr className="no-user-card">
                            <td colSpan="6">No user found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable
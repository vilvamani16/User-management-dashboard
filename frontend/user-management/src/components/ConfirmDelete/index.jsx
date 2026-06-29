import "./index.css"

const ConfirmDelete = ({cancelDelete, confirmDelete}) => {
    return(
        <div className="delete-overlay">
            <div className="delete-popup">
                <h1 className="delete-title">Delete User</h1>
                <p className="delete-description">Are you sure you want to delete this user?</p>
                <div className="delete-btn-container">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={cancelDelete}
                    >
                        Cancel
                    </button>
                    <button 
                        type="button"
                        className="delete-btn"
                        onClick={confirmDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete
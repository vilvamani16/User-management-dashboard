import {useState} from "react"

import "./index.css"

export const EditUser = ({ user, onCancel, onSave }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [website, setWebsite] = useState(user.website);

    const handleSubmit = () => {
        onSave({
            ...user,
            name,
            email,
            website,
        });
    };

    return (
        <div className="edit-overlay">
            <div className="edit-popup">
                <h2>Edit User</h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />

                <button onClick={onCancel}>
                    Cancel
                </button>

                <button onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
};

export const AddUser = ({ onCancel, onAdd }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [company, setCompany] = useState("");

    const handleSubmit = () => {
        const newUser = {
            id: Date.now(),
            name,
            email,
            phone,
            website,
            company: {
                name: company,
            },
        };

        onAdd(newUser);
    };

    return (
        <div className="edit-overlay">
            <div className="edit-popup">
                <h2>Add User</h2>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <div className="edit-btn-container">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="save-btn"
                        onClick={handleSubmit}
                    >
                        Add User
                    </button>
                </div>
            </div>
        </div>
    );
};

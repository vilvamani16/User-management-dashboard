import {useState, useEffect} from "react"
import {FaPlus, FaFilter, FaSortAmountDown} from "react-icons/fa"
import { IoMdClose } from "react-icons/io";
import {getAllUser} from "../../api/userService"
import {deleteUser} from "../../api/userService"
import { updateUser } from "../../api/userService";
import { createUser } from "../../api/userService";

import UserTable from "../UserTable"
import SearchBar from "../SearchBar";
import Pagination from "../Pagination"
import ConfirmDelete from "../ConfirmDelete";
import {EditUser, AddUser} from "../UserForm"
import "./index.css"

const Dashboard = () => {
    const [showFilterCard, setShowFilterCard] = useState(false)
    const [showSortCard, setShowSortCard] = useState(false)
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [filterName, setFilterName] = useState("");
    const [filterEmail, setFilterEmail] = useState("");
    const [filterCompany, setFilterCompany] = useState("");
    const [filterWebsite, setFilterWebsite] = useState("");
    const [errMsg, setErrMsg] = useState(false)
    const [sortBy, setSortBy] = useState("")
    const [showDeleteModel, setShowDeleteModel] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const getAllUsers = async () => {
            try{
                const data = await getAllUser()
                console.log("Data Recevied")
                setUsers(data)
            }catch(err){
                console.log(err.message)
            }
        }
        getAllUsers()
    }, [])

    const filteredUser = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.website.toLowerCase().includes(search.toLowerCase()) ||
            user.company?.name.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            user.name.toLowerCase().includes(filterName.toLowerCase()) &&
            user.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
            user.company?.name.toLowerCase().includes(filterCompany.toLowerCase()) &&
            user.website.toLowerCase().includes(filterWebsite.toLowerCase());

        return matchesSearch && matchesFilter;
    })

    const sortedUsers = [...filteredUser].sort((a, b) => {
        switch(sortBy){
            case "name-asc":
                return a.name.localeCompare(b.name);
            case "name-desc":
                return b.name.localeCompare(a.name);
            case "email-asc":
                return a.name.localeCompare(b.name);
            case "email.desc":
                return b.name.localeCompare(a.name);

            default:
                return 0;
        }

    })

    const usersPerPages = 5;
    const  lastIndex = currentPage * usersPerPages;
    const firstIndex = lastIndex - usersPerPages;
    const currentUser = sortedUsers.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(sortedUsers.length/usersPerPages)

    const handleReset = () => {
        setFilterName("");
        setFilterEmail("");
        setFilterCompany("");
        setFilterWebsite("");
        setShowFilterCard(false)
    }

    const handleAppyFilter =() => {
        if (
            !filterName &&
            !filterEmail &&
            !filterCompany &&
            !filterWebsite
        ) {
            setErrMsg(true);
            return;
        }

        setErrMsg(false);
        setShowFilterCard(false);
    }

    const openFilter = () => {
        setShowFilterCard(true)
        setErrMsg(false)
    }

    const handleApplySort = () => {
        setCurrentPage(1);
        setShowSortCard(false);
    };

    const handleResetSort = () => {
        setSortBy("");
        setCurrentPage(1);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        setSelectedUserId(id)
        setShowDeleteModel(true)
    }

    const cancelDelete = () => {
        setShowDeleteModel(false);
        setSelectedUserId(null);
    }

    const confirmDelete = async() => {
        try{
            await deleteUser(selectedUserId);

            setUsers((prevUsers) => (
                prevUsers.filter((user) => user.id !== selectedUserId)
            ))

            setShowDeleteModel(false);
            setSelectedUserId(null);

        }catch(err){
            console.log(err.message)
        }
    }

    const handleSave = async (updatedUser) => {
            try {
                await updateUser(updatedUser.id, updatedUser);

                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === updatedUser.id
                            ? updatedUser
                            : user
                    )
                );

                setShowEditModal(false);
                setEditingUser(null);

            } catch (err) {
                console.log(err.message);
            }
        };

        const handleAddUser = async (newUser) => {
            try {
                await createUser(newUser);

                setUsers((prevUsers) => [...prevUsers, newUser]);

                setShowAddModal(false);
            } catch (err) {
                console.log(err.message);
            }
        };

    return(
        <div className="dashboard-container">
            <div className="header-card">
                <div className="header-text">
                    <h1 className="header-tittle">User Management Dashboard</h1>
                    <p className="header-description">Manage all your users efficiently</p>
                </div>
                <div className="add-btn-card">
                    <button
                        type="button"
                        className="add-btn"
                        onClick={() => setShowAddModal(true)}
                    >
                        <FaPlus />
                        Add User
                    </button>
                </div>
            </div>
            <div className="filter-container">
                <SearchBar search={search} setSearch={setSearch}/>
                <div className="filter-content">
                    <button type="button" onClick={openFilter}>
                        <FaFilter/>
                        Filter
                    </button>
                </div>
                {showFilterCard && (
                    <div className="filter-overlay">
                        <div className="filter-popup">
                            <div className="filter-header">
                                <p className="filter-title">Filter user</p>
                                <button type="button" onClick={() => setShowFilterCard(false)}>
                                    <IoMdClose />
                                </button>
                        </div>
                        <div className="filter-field-card">
                            <div className="select-filter">
                                <label htmlFor="name">Name</label>
                                <input type="text" placeholder="Enter the name" id="name" value={filterName} onChange={(e) => setFilterName(e.target.value)}/>
                                {errMsg && (<p className="err-msg">Fill Feild</p>)}
                            </div>
                            <div className="select-filter">
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder="Enter the email" id="email" value={filterEmail} onChange={(e) => setFilterEmail(e.target.value)}/> 
                                {errMsg && (<p className="err-msg">Fill Feild</p>)}   
                            </div>
                            <div className="select-filter">
                                <label htmlFor="company">Company</label>
                                <input type="text" placeholder="Enter Company" id="company" value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)}/>
                                {errMsg && (<p className="err-msg">Fill Feild</p>)}
                            </div>
                            <div className="select-filter">
                                <label htmlFor="website">Website</label>
                                <input type="website" placeholder="Enter Website" id="website" value={filterWebsite} onChange={(e) => setFilterWebsite(e.target.value)}/>
                                {errMsg && (<p className="err-msg">Fill Feild</p>)}
                            </div>
                        </div>
                        <div className="filter-footer">
                            <button type="button" onClick={handleReset}>Reset</button>
                            <button type="button" onClick={handleAppyFilter}>Apply</button>
                        </div>                 
                    </div>
                </div>
                )}
                <div className="sort-card">
                    <button type="button" onClick={() => setShowSortCard(true)}>
                        <FaSortAmountDown/>
                        Sort by
                    </button>
                </div>
                {showSortCard && (
                    <div className="sort-overlay">
                        <div className="sort-popup">
                            <div className="sort-header">
                                <p className="sort-title">Sort Users</p>

                                <button
                                    type="button"
                                    className="close-btn"
                                    onClick={() => setShowSortCard(false)}
                                >
                                    <IoMdClose />
                                </button>
                            </div>

                            <div className="sort-options">

                                <label className="sort-option">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="name-asc"
                                        checked={sortBy === "name-asc"}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    />
                                    Name (A-Z)
                                </label>

                                <label className="sort-option">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="name-asc"
                                        checked={sortBy === "name-desc"}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    />
                                    Name (Z-A)
                                </label>

                                <label className="sort-option">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="name-asc"
                                        checked={sortBy === "email-asc"}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    />
                                    Email (A-Z)
                                </label>

                                <label className="sort-option">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value="name-asc"
                                        checked={sortBy === "email-desc"}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    />
                                    Email (Z-A)
                                </label>
                            </div>

                            <div className="sort-footer">
                                <button
                                    type="button"
                                    className="reset-btn"
                                    onClick={handleResetSort}
                                >
                                    Reset
                                </button>

                                <button
                                    type="button"
                                    className="apply-btn"
                                    onClick={handleApplySort}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <UserTable filteredUser={currentUser} onEdit={handleEdit} onDelete={handleDelete}/>
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
            {showDeleteModel && (
                <ConfirmDelete
                    cancelDelete={cancelDelete}
                    confirmDelete={confirmDelete}
                />
            )}
            {showEditModal && (
            <EditUser
                user={editingUser}
                onCancel={() => setShowEditModal(false)}
                onSave={handleSave}
            />
        )}
        {showAddModal && (
            <AddUser
                onCancel={() => setShowAddModal(false)}
                onAdd={handleAddUser}
            />
        )}
        </div>
    )
}

export default Dashboard
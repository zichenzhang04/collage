import React, { useState, useEffect } from "react";
import '../CSS/NavBarFollowers.css';

const NetworkBox = ({ userList, search, buttonText1, handleButton1, buttonText2, handleButton2, headerText, subText, searchText }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    //const navigate = useNavigate();

    // Fetch followers on component load
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setUsers(userList);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const people = search ? filteredUsers : users;

    return (
        <div className="nav-bar-followers">
            <h2>{headerText}</h2>
            <p>{subText}</p>
            {
                search && 
                <input
                    type="text"
                    placeholder={searchText}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && setSearchTerm(e.target.value)}
                    className="search-box"
                />
            }
            <div className="followers-list">
                {people.map((user) => (
                    <div key={user.id} className="user-result-row">
                        <img src={user.profileImage} alt={`${user.name}'s profile`} className="profile-image" />
                        <div className="user-info">
                            <div className="user-name">{user.name}</div>
                            <div className="user-details"> <strong> @{user.username}</strong> {user.major} '{user.gradYear}</div>
                        </div>
                        <div className="action-buttons">
                            {handleButton1 && (
                                <button onClick={() => handleButton1()} className="view-profile-button">
                                    {buttonText1}
                                </button>
                            )}
                            {handleButton2 && (
                                <button onClick={() => handleButton2()} className="remove-button">
                                    {buttonText2}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NetworkBox;
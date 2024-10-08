import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';

interface User {
    id: number;
    username: string;
}

const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [friends, setFriends] = useState<User[]>([
        { id: 1, username: 'friend1' },
        { id: 2, username: 'friend2' },
        { id: 3, username: 'friend3' },
        { id: 4, username: 'friend4' },
        { id: 5, username: 'friend5' },
    ]);
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulating a search functionality
        const results: User[] = friends.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(results);
    };

    const addFriend = (newFriend: User) => {
        setFriends([...friends, newFriend]);
        setSearchResults(searchResults.filter(user => user.id !== newFriend.id));
    };

    const handleFriendClick = (friend: User) => {
        setSelectedFriend(friend);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="home-page-container">
            <div className="sidebar">
                <h1 className="main-title">Welcome</h1>
                <div className="friend-search">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
                            className="input-field"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch(e);
                                }
                            }}
                        />
                    </form>

                    {searchResults.length > 0 && (
                        <div className="search-results">
                            <ul className="results-list">
                                {searchResults.map(user => (
                                    <li key={user.id} className="result-item">
                                        {user.username}
                                        <button onClick={() => addFriend(user)} className="primary-button">Add Friend</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <h2 className="section-title">Your Friends</h2>
                <div className="friends-list">
                    {friends.map(friend => (
                        <div
                            key={friend.id}
                            className={`friend-box ${selectedFriend?.id === friend.id ? 'selected' : ''}`}
                            onClick={() => handleFriendClick(friend)}
                        >
                            {friend.username}
                        </div>
                    ))}
                </div>

                <div className="menu-icon" onClick={toggleMenu}>
                    <FaEllipsisV />
                </div>
                {showMenu && (
                    <div className="menu-dropdown">
                        <Link to="/" className="dropdown-item">Log out</Link>
                    </div>
                )}
            </div>

            <div className="chat-container">
                {selectedFriend ? (
                    <div className="chat-window">
                        <h2>Chat with {selectedFriend.username}</h2>
                        {/* Here you can display the messages */}
                        <div className="messages">
                            {/* Placeholder for messages */}
                            <p>No messages yet!</p>
                        </div>
                    </div>
                ) : (
                    <div className="empty-chat">
                        <h2>Select a friend to chat</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;

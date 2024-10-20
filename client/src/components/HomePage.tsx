import React, { useState, FormEvent, KeyboardEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';
import { Chat } from '../index.d.js';

const HomePage: React.FC = () => {

    const navigate = useNavigate();

    useEffect(()=>{
       const userInfoString = localStorage.getItem('userInfo');
       if (userInfoString) {
       navigate("/home");
    }
    },[navigate])

    const [chats, setChats] = useState<Chat[]>([])

    const fetchChats = async () => {
        const {data} = await axios.get('/api/chat')
        setChats(data);
    }

    useEffect(() => {fetchChats()}, [])
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Chat[]>([]);
    const [selectedFriend, setSelectedFriend] = useState<Chat | null>(null);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        // TODO: Handle real time search
        e.preventDefault();
        const results: Chat[] = chats.filter(chat => chat.chatName.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(results);
    };

    // TODO: Handle adding friend
    // const addFriend = (newFriend: User) => {
    //     setFriends([...friends, newFriend]);
    //     setSearchResults(searchResults.filter(user => user.id !== newFriend.id));
    // };

    const handleFriendClick = (friend: Chat) => {
        setSelectedFriend(friend);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch({ preventDefault: () => {} } as FormEvent<HTMLFormElement>);
        }
    };

    return (
        <div className="home-page-container">
            <div className="sidebar">
                <h1 className="app-title">Collabrative</h1>

                <div className="friend-search">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
                            className="input-field"
                            onKeyPress={handleKeyPress} 
                        />
                    </form>

                    {searchResults.length > 0 && (
                        <div className="search-results">
                            <ul className="results-list">
                                {searchResults.map(chat => (
                                    <li key={chat._id} className="result-item">
                                        {chat.chatName}
                                        <button onClick={() => addFriend(user)} className="primary-button">Add Friend</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <h2 className="section-title">Your Friends</h2>
                <div className="friends-list">
                    {chats.map(chat => (
                        <div
                            key={chat._id}
                            className={`friend-box ${selectedFriend?._id === chat._id ? 'selected' : ''}`}
                            onClick={() => handleFriendClick(chat)}
                        >
                            {chat.chatName}
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
                        <h2>{selectedFriend.chatName}</h2>
                        <div className="messages">
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

import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

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
    ]);

    const [searchResults, setSearchResults] = useState<User[]>([]);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulating a search functionality
        const results: User[] = [
            { id: 4, username: 'newfriend1' },
            { id: 5, username: 'newfriend2' },
        ].filter(user => user.username.includes(searchTerm));
        setSearchResults(results);
    };

    const addFriend = (newFriend: User) => {
        setFriends([...friends, newFriend]);
        setSearchResults(searchResults.filter(user => user.id !== newFriend.id));
    };

    const handleFriendClick = (friend: User) => {
        // Placeholder for friend interaction
        console.log(`Clicked on friend: ${friend.username}`);
        // You could open a chat window or navigate to a friend's profile here
    };

    return (
        <div className="container home-page-container">
            <h1 className="main-title home-page-title">Welcome to Our App</h1>
            
            <div className="friend-search">
                <h2>Search for Friends</h2>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter username"
                    />
                    <button type="submit" className="primary-button">Search</button>
                </form>
                
                {searchResults.length > 0 && (
                    <div className="search-results">
                        <h3>Search Results:</h3>
                        <ul>
                            {searchResults.map(user => (
                                <li key={user.id}>
                                    {user.username}
                                    <button onClick={() => addFriend(user)} className="primary-button">Add Friend</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            <div className="friends-list">
                <h2>Your Friends</h2>
                <div className="friends-grid">
                    {friends.map(friend => (
                        <div
                            key={friend.id}
                            className="friend-box"
                            onClick={() => handleFriendClick(friend)}
                        >
                            {friend.username}
                        </div>
                    ))}
                </div>
            </div>
            
            <Link to="/">
                <button className="primary-button">Log out</button>
            </Link>
        </div>
    );
};

export default HomePage;
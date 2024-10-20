import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext({});

const ChatProvider = ({children} : any) => {
    const navigate = useNavigate();
    const [userState, setUserState ] = useState();
    useEffect(()=>{
       const userInfoString = localStorage.getItem('userInfo');
       if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        setUserState(userInfo);
    }
       navigate("/");
    },[navigate])
    return (
        <ChatContext.Provider value={{userState, setUserState}}>
        {children}
        </ChatContext.Provider>
    );
}

export const ChatState = () => {
    useContext(ChatContext);
} 

export default ChatProvider;
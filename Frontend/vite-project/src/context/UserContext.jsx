import react,{ createContext,useState} from 'react'

export const UserContext = createContext();

const UserProvider=({Children})=>{
    const [user,setUser]=useState(null);

    const updateUser=(userData)=>{
        setUser(userData);
    };

    const clearUser=()=>{
        setUser(null);
    };

    return(
        <UserContext.Provider 
        value={{
            user,
            updateUser,
            clearUser,
        }}
        >{Children}
        </UserContext.Provider>
    );
}

export default UserProvider;
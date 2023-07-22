import React, {createContext, useState} from 'react'

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState("");

  const login = (user) => {
    setUser(user);
  };

  const isLogedIn = () => {
    if (!user) {
      return "Ingresar";
    }else{
      return user.user.first_name;
    }
  }

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser("");
  };

  return(
    <UserContext.Provider value={{user, isLogedIn, login, logout}}>
      {children}
    </UserContext.Provider>
  )
};

export default UserContextProvider;
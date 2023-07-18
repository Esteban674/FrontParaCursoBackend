import React, {createContext, useState} from 'react'

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState([]);

  const login = (user) => {
    setUser(user);
  };

  const isLogedIn = () => {
    if (!user) {
      return "Ingresar";
    }else{
      return user.first_name;
    }
  }

  return(
    <UserContext.Provider value={{isLogedIn, login}}>
      {children}
    </UserContext.Provider>
  )
};

export default UserContextProvider;
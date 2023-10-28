import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const[loading,setLoading] = useState(true);
    const[user,setUser]= useState(null);
    const navigate = useNavigate();

     useEffect(()=>{
        getUserOnLoad();
     },[]);

     const getUserOnLoad = async() =>{
       try{
          const accountDetails = await account.get();
          setUser(accountDetails);
       }
       catch(error){

       }
       setLoading(false);
     }

     const handleUserLogin = async(e,credentials) =>{
          e.preventDefault();
          try{
              const response = await account.createEmailSession(credentials.email,credentials.password);
              const accountDetails = await account.get();
              setUser(accountDetails);
              navigate('/')
          }
          catch(error){
            console.error(error);
          }
     }

     const handleLogout = async()=>{
        const response = await account.deleteSession('current');
        setUser(null);
     }

     const handleRegister = async()=>{
        e.preventDefault();

        if(credentials.password1 !== credentials.password2){
           console.log("Password different");
           return;
        }

        try{
          const response = await account.create(ID.unique(), credentials.email,credentials.password,credentials.name);
          console.log("Registered successfully",response);
          await account.createEmailSession(credentials.email,credentials.password1);
          const accountDetails = await account.get();
          setUser(accountDetails);
          navigate('/')
        }
        catch(error){

        }
     }

     const contextData = {
        user,
        handleUserLogin,
        handleLogout,
        handleRegister
    }


    return (
     <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
     </AuthContext.Provider>

    )
}

export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;
import React, { useEffect, useState } from 'react'
import { databases } from '../appwriteConfig';
import { COLLECTION_ID_MESSAGES } from '../appwriteConfig';
import { DATABASE_ID } from '../appwriteConfig';
// import { Query } from 'appwrite';

const Room = () => {
  const [messages, setMessages] = useState([])
 useEffect(()=>{
    getMessage();
 },[]);

 const getMessage = async () => {

  const response = await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID_MESSAGES,
  )
  console.log("Response",response);
  setMessages(response.documents)

 
}
  return (
    <div>
      Room
     
    </div>
  )
}

export default Room

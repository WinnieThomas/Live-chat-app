import React, { useEffect, useState } from 'react'
import { databases } from '../appwriteConfig';
import { COLLECTION_ID_MESSAGES } from '../appwriteConfig';
import { DATABASE_ID } from '../appwriteConfig';
// import { Query } from 'appwrite';
import { ID, Query, Permission, Role} from 'appwrite';

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('');
  const {user} = useAuth();

 useEffect(()=>{
    getMessage();
    const unsubscribe = client.subscribe([`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`], response => {
      // Callback will be executed on changes for documents A and all files.
      if(response.events.includes("databases.*.collections.*.documents.*.create")){
        setMessages(prevState =>[response.payload, ...prevState]);
      }

      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id));
      }
      console.log(response);
    });

    return () => {
      unsubscribe();
    };
 },[]);

 

const handleSubmit = async(e) =>{
  e.preventDefault();
  const permissions = [
    Permission.write(Role.user(user.$id)),
  ]

const payload = {
    user_id:user.$id,
    username:user.name,
    body:messageBody
}
  const response = await databases.createDocument(
   DATABASE_ID, 
   COLLECTION_ID_MESSAGES, 
   ID.unique(), 
   payload
  )
  console.log('Created',response);

  setMessages(prevState=>[response,...messages]);

  setMessageBody('');
}

const getMessage = async () => {

  const response = await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID_MESSAGES,
    [
      Query.orderDesc('$createdAt'),
      Query.limit(100),
    ]
  )

  const MsgResponse = response.documents;
  console.log(MsgResponse);
  
  setMessages(MsgResponse);

  console.log(messages);

}


const deleteMessage = async (message_id) => {
  await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
  setMessages(prevState => prevState.filter(message => message.$id !== message_id))
} 


return (
  <main className='container'>
  <div className='room--container'>
   <form className='message-form' onSubmit={handleSubmit}>
    <div>
      <textarea
      required
      maxLength="1000"
      placeholder="Say Something..."
      onChange={(e)=>{setMessageBody(e.target.value)}}
      value={messageBody}>

      </textarea>
    </div>
    <div className='send-btn--wrapper'>
      <button type="submit" className="btn btn--secondary">Send</button>
    </div>
    </form>
    <div>
      {messages.map(message =>(
        <div key={message.$id} className='message--wrapper'>
          <div className='message--body'>
          <span>{message.body}</span>
          </div>
          <div className='message--header'>
          <small className="message-timestamp"> {new Date(message.$createdAt).toLocaleString()}</small>
          <button onClick={()=>{deleteMessage(message.$id)}}>Delete</button>
          </div>
          </div>
          
       ))}
    </div>
   
  </div>
  </main>
)
}


export default Room

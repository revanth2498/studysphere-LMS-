import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from 'react'

import { ChatEngine, PeopleSettings, getOrCreateChat, } from 'react-chat-engine'
import './chat-engine.scss';
import {useParams} from 'react-router-dom';
import ChatFeed from './ChatFeed';

export const  ChatApp = () => {
    const [users,setUsers]=useState([]);
    const userName = sessionStorage.getItem('UserName');
    const params = useParams();
    const secret = userName + "@gmail.com"
    useEffect(() => {
        getProfessionals();
    }, [])

    function createDirectChat(creds) {
        const username = document.getElementById('searchForChat')
        getOrCreateChat(
            creds,
            { is_direct_chat: false, usernames: [username.value, userName], title: username.value },
            () => username.value = ''
        )
    }

    async function getProfessionals() {
        fetch(`http://localhost:8000/requests/userByCourse/${params.id}`) 
            .then((response) => {
                return response.json();
            })
            .then((data) => {                
                console.log(data)
                setUsers(data.filter((da)=>da!==userName))              
            })
            .catch((error) => {
                console.log(error)
            });
    }


    function renderChatForm(creds) {
        return (
            <div>
                {users.length && <div className="chat-search">
                    <Stack spacing={2} sx={{ width: 300 }}>
                        <Autocomplete onChange={(e) => console.log(e.target.value)}
                            id="searchForChat"
                            freeSolo
                            options={users}
                            renderInput={(params) => {
                                return <TextField size="small" {...params} label="Search" />
                            }}
                        />
                    </Stack>
                    <AddCircleIcon style={{ margin: '1em' }} onClick={() => createDirectChat(creds)} color="primary" />
                </div>}
            </div>
        )
    }



    return (
        <ChatEngine
            height='90vh'
            publicKey={'a5a420a9-49ba-47a3-b463-fba359323a7c'}
            userName={userName}
            userSecret={secret}
            renderNewChatForm={(creds) => renderChatForm(creds)}
            //renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}  
                  
        />
       
            
       
    );
}

export default ChatApp;







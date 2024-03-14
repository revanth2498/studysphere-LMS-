import axios from 'axios';

export const createUser = (user) => {

    axios.post('https://api.chatengine.io/users/', user
        ,
        {
            headers: {
                'PRIVATE-KEY': 'e13f1233-4d7b-47c4-90b5-a8eaad66af3e'
            }
        }
    )
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getUsers = () => {
    return axios.get('https://api.chatengine.io/users/', {
        headers: {
            'PRIVATE-KEY': 'e13f1233-4d7b-47c4-90b5-a8eaad66af3e'
        }
    })
} 
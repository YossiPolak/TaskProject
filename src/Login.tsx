import { FC, useState } from 'react'
import axios from 'axios'

interface user{
    id:number,
    username:string,
    password:string,
    email:string,
    name:{},
    address:{},
    phone:string
}
interface loginProps{handleLogin:() => void}
const Login:FC<loginProps> = props => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('')

    function handleUserInput(value: string) {
        setUserName(value);
    }

    function handlePasswordInput(value: string) {
        setPassword(value);
    }

    async function handleLogin() {
        if(userName == "" || password == "") setError('Missing username or password')
        else{

            
            var res = await axios.get('https://fakestoreapi.com/users')
                //     username: "johnd",
                //     password: "m38rmF$"
                console.log(res)
                const users:user[] = res.data
                var usr = users.find(x => x.username == userName)
                if (!usr) setError('no userName exist')
                else{
                    if(usr.password != password) setError('Password is incorrect')
                    else props.handleLogin();
                }
            }
    }
    return <div>
        <div>
            <input name='usrnam' value={userName} onChange={e => handleUserInput(e.currentTarget.value)} placeholder='User Name'/>
        </div>
        <div>
            <input name='pswrd' value={password} onChange={e => handlePasswordInput(e.currentTarget.value)} placeholder='Password' />
        </div>
        <div>
            <input type='button' value='Submit' onClick={e => handleLogin()} />
        </div>
        <p>{error}</p>
    </div>
}
export default Login
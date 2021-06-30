import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'; //1

const Signup = (props) => {
    const [username, setUsername] = useState(''); //2
    const [password, setPassword] = useState('');

let handleSubmit = (event) => { //1
    event.preventDefault();
    fetch("http://localhost:3000/user/register", {
        method: 'POST',
        body: JSON.stringify({user:{username: username, password: password}}),
        headers: new Headers({
                'Content-Type': 'application/json'
        })
    }).then(
        (response) => response.json()
    ).then((data) => {
        props.updateToken(data.sessionToken)
    })
}

    return(
        <div>
            <h1>Sign up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='username'>Username</Label>   
                    <Input onChange={(e) => setUsername(e.target.value)} name='username' value={username}/>  
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name='password' value={password}/>
                </FormGroup>
                <Button type='submit'>Sign up</Button>
            </Form>
        </div>
    )
}

export default Signup;

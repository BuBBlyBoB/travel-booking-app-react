import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from 'jquery';

function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
}

function validatePassword(password, confirmPass){ 
    var passwordReq = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordReq.test(password)) {
        if(password === confirmPass) {
            $('.errMsg').text('').css('display','none');;
            return true;
        }
        else{
            $('.errMsg').text('Passwords do not match').css('display','inline-block');
            return false;
        }        
    } else {
        $(".errMsg").text('').css('display','none');;
        $('.errMsg').append(`<h3>Password must be</h3>
        
            <p>at least 8 characters long</p>
            <p>include uppercase and lowercase letters</p>
            <p>include special characters, and digits</p>
                
        `).css('display','inline-block');
        return false;
    }
}
       
function generateUniqueId() {
    var random = Math.floor(Math.random() * 10000);
    var uniqueId =random;
    return uniqueId;
}




const RegistrationForm = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    
    const [users, setUsers] = useState([])
//To check for already made users
    useEffect(()=>{
        fetch('/getUsers')
        .then(res => res.json())
        .then(users => setUsers(users))
        .catch(err=> console.log('Error: '+ err))
    })
//----------------
const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;

    if (name === '' || email==='' || password==='' || confirmPass==='') {
        flag = false;
        $('.errMsg').text('ALL FIELDS ARE REQUIRED').css('display','inline-block');
    
    }
     if(name !=='' && email !=='' && password !=='' && confirmPass !==''){
        $('.errMsg').css('display','none');
        flag = true;
        if(!validateEmail(email)){
            $('.errMsg').text('EMAIL IS NOT VALID').css('display','inline-block')
            flag = false;
        }
        if(!validatePassword(password, confirmPass)){
            flag = false;
        }
//--------------------
        if(users.find(user => user.email === email)){
            $('.errMsg').text('');
            $('.errMsg').text('EMAIL ALREADY EXIST').css('display','inline-block')
            flag = false;
        }
		
//--------------------
		if(flag === true){
            let userID = generateUniqueId();
            axios.post('http://localhost:8082/addUser',
            {userID, name, email, password})
            .then(res=>console.log(res))
            .catch(err => console.log(err));

        //Make Modal to move user to login

        $(`#name`).val("");
        setName(e.target.value);
        $(`#email`).val("");
        setEmail(e.target.value);
        $(`#password`).val("");
        setPassword(e.target.value);
        $(`#confirmPassword`).val("");
        setConfirmPass(e.target.value);
    }
    }
}
return(
<>
<div className="wrapper" style={{
    height: "100vh",
    backgroundImage: 'url("https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
    }}>
    <div id="formContent">
        <form id="formSub" style={{padding: '5px'}}>
        <h1>Registration</h1>
            <div className="input-holder">
                <label htmlFor="firstName">Enter your name: </label>       
                <input type="text" name="name" id="name" 
                onChange={e =>setName(e.target.value) }/>
            
            </div>
            <div className="input-holder">
                <label htmlFor="email">Enter your email: </label>
                <input type="email" id="email" name="email" 
                onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className="input-holder">
                <label htmlFor="password">Create a password: </label>
                <input type="password" id="password" name="password" 
                onChange={e=>setPassword(e.target.value)}/>
            </div>  
            <div className="input-holder">
                <label htmlFor="confPassword">Confirm Password: </label>
                <input type="password" id="confirmPassword" name="confirmPassword"
                onChange={e=>setConfirmPass(e.target.value)}/>
            </div>
            <div className="errMsg">

            </div>

            <button onClick={handleSubmit}>Register</button>

        </form>
        <Link to={'/'}>
            <button className="backBtn" style={{marginBottom: '0px'}}>Back</button>
        </Link>    

    </div>
</div>
</>
    )
}

export default RegistrationForm;
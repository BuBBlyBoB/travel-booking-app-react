import { React, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import '../style/style.css';
const Login = () =>{

    const[values, setValues] = useState({
        Email: "",
        Pass: ""
    })

    const navigate = useNavigate();

    const handleSubmit = (e) =>{

        e.preventDefault();
        
        let flag = true;
        if(values.Email === '' || values.Pass === ''){
            $('.errMsg').text('Both Fields Are Required').css('display','inline-block');
            flag = false;    
        }
        if(flag === true){
            $('.errMsg').text('');
            axios.post('http://localhost:8082/login',values)
            .then(res =>{
                if(res.data.Message === "User Not registered"){
                    $('.errMsg').text('Invalid Creditentials').css('display','inline-block');
                }
                else{
                    navigate(`/Dashboard`,{state:
                        {userID: res.data[0].UserID, name: res.data[0].Name}});

            }
        })
        .catch(err => console.log(err))
        }
    };
    
    return(
    <>
    <div className="wrapper" style={{
    height: "100vh",
    backgroundImage: 'url("https://images.pexels.com/photos/716421/pexels-photo-716421.jpeg?auto=compress&cs=tinysrgb&w=600")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
    }}>
        <div id="formContent">
            <h2 className="active">This is Login</h2>
            <div id="formSub" >
                    <input type="email" placeholder="Email"
                    id="email" name="Email" 
                    onChange={e=>setValues({...values, [e.target.name]: e.target.value})} 
                    />
                    <input type="password" placeholder="Password" 
                    id="password" name="Pass" 
                    onChange={e=>setValues({...values, [e.target.name]: e.target.value})}/>
                <div className="errMsg">
                    <h2>Hello</h2>
                </div>

                <button onClick={handleSubmit}>Login</button>
                <Link to={'/registration'}><button className="SignUpBtn">Register</button></Link>
                
            </div>
            <div id="formFooter">
                <Link to={'#'} style={{
color: "#008080",
display: "inline-block",
textDecoration: "none",
fontWeight: "400",
width: "100%",
                }}>Forgot Password?</Link>
            </div>

            <Link to={'/'} className="backBtn" style={{
            }}>Back To Home</Link>    
        </div>
    </div>

    </>
    )
    }

export default Login;
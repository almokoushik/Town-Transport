import React, { useContext, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { signInWithPopUp, signInWithFB, createUserWithMail, updateUsername, logInWithEmail } from "./LoginManager"
import { Button } from 'bootstrap';
import Header from '../Header/Header';
const Login = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passMatch: true,
        new: true
    })
    let history = useHistory();
    let location = useLocation();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    let { from } = location.state || { from: { pathname: "/" } };

    const blurHandle = (event) => {
        let isPassValid = false;
        let isMailValid = false;
        if (event.target.name === "name") {
            user["name"] = event.target.value
        }
        if (event.target.name === "email") {
            isMailValid = /\S+@\S+\.\S+/.test(event.target.value)
            if (isMailValid) {
                user["email"] = event.target.value
            }
        }
        if (event.target.name === "password") {
            isPassValid = /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(event.target.value)
            if (isPassValid) {
                user["password"] = event.target.value
            }
        }
        if (event.target.name === "rePassword") {
            isPassValid = /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(event.target.value)
            if (isPassValid) {
                user["passMatch"] = (event.target.value === user.password)
                console.log(user.passMatch)
            }

        }
    }
    const submitHandle = (e) => {
        if (user.passMatch && user.email) {
            if (user.new){
                console.log("This is user:", user.name, user.email, user.password)
                createUserWithMail(user.email, user.password)
                    .then(data => {
                        updateUsername(user.name)
                            .then(data2 => {
                                setReg()
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })

            }
            else{
                logInWithEmail(user.email,user.password)
                .then(data=>{
                    console.log(data)
                    setUser(data)
                    const newUser={...data}
                    newUser.name=data.displayName
                    setLoggedInUser(newUser)
                    history.replace(from);
                })

            }
        }
        e.preventDefault()
    }
    const googleLogIn = () => {
        signInWithPopUp()
            .then(data => {
                setUser(data)
                setLoggedInUser(data)
                console.log(data)
                history.replace(from);
            })
            .catch(error => {
                console.log(error)
            })
    }
    const fbLogIn = () => {
        signInWithFB()
            .then(data => {
                setUser(data)
                setLoggedInUser(data)
                console.log(data)
                history.replace(from);
            })
            .catch(error=>{
                console.log(error)
            })
    }
    const setReg = () => {
        const newUser = { ...user }
        newUser["new"] = !user.new
        setUser(newUser)
    }
    return (
        
        <div className="" style={{ textAlign: "center" }}>
            <Header></Header>
            <form action="">
                {/* {
                    user.new && <input onBlur={blurHandle} required type="text" name="name" placeholder="Enter Your name" id="" />
                }
                <br /><br /> */}
                <Form className="mx-auto" style={{border:"1px solid navy" ,width:"55%",borderRadius:"10px",backgroundColor:"lightgray" ,marginBottom:"20px",marginTop:"20px"}}>
                
                {
                        user.new &&<Col xs={12}>
                        <Form.Group className="mx-auto" controlId="formBasicEmail" size="sm">
                      <Form.Label>Name</Form.Label>
                                <Form.Control onBlur={blurHandle} required type="text" name="name"  placeholder="Enter Your Name" />
                      </Form.Group>
                        </Col>
                }
                
            
                <Col xs={12}>
                        <Form.Group className="mx-auto" controlId="formBasicEmail" size="sm">
                        <Form.Label>Email</Form.Label>
                            <Form.Control onBlur={blurHandle} type="email" name="email" placeholder="Enter email" />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                        <Form.Group className="mx-auto" controlId="formBasicEmail" size="sm">
                        <Form.Label>Password</Form.Label>
                            <Form.Control onBlur={blurHandle} required  type="password" name="password" placeholder="Password Length 8 and one special chacter" />
                    </Form.Group>
                </Col>
                {
                        user.new && <Col xs={12}>
                            <Form.Group className="mx-auto" controlId="formBasicEmail" size="sm">
                                <Form.Label>Retype Password</Form.Label>
                                <Form.Control onBlur={blurHandle} required type="password" name="rePassword"placeholder="ReEnter Password" />
                            </Form.Group>
                        </Col>
                }

                        <Col xs={12}>
                            <Form.Group className="mx-auto" controlId="formBasicEmail" size="sm">
                            <Form.Label>
                            {
                                (user.passMatch === false) && <p style={{color:"red"}}>Password Didn't Match</p>
                            }
                            </Form.Label>

                            <Form.Control onClick={submitHandle}type="submit" value={user.new?"Create New Account":"Log In"}/>
                            </Form.Group>
                        </Col>
                </Form>



                {/* <input onBlur={blurHandle} required type="text" name="email" id="" placeholder="Enter Your Username or Email" /><br /><br /> */}

                {/* <input onBlur={blurHandle} required type="password" name="password" id="" placeholder="Password 8 Char and One Special Character " /><br /><br /> */}
                {/* {
                    user.new && <input onBlur={blurHandle} required type="password" name="rePassword" placeholder="Enter Password Again" id="" />
                } */}
                {/* {
                    (user.passMatch === false) && <p>Password Didn't Match</p>
                } */}
                {/* <br /><br /> */}
                {/* {
                    user.new ? <button onClick={submitHandle}>Create An Account</button> : <button onClick={submitHandle}>Log In</button>
                } */}
            </form>




            {/* <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                   </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
  </Button>
            </Form> */}

            <p>Already Have an Account?<span>
                {
                    user.new ? <Link onClick={setReg}>Login</Link > : <Link onClick={setReg}>Create An Account</Link >
                }
            </span> </p>
            {/* <button className="btn-lg " onClick={googleLogIn}><FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon> LogIn With Google</button> <br />
            <button className="btn-lg" onClick={fbLogIn}><FontAwesomeIcon icon={faFacebook} />Login With Facebook</button> */}

            <Col xs={4}  className="mx-auto" style={{ textAlign: "center",marginBottom:"20px" }}>
                <button onClick={googleLogIn} className="btn btn-secondary btn-lg btn-block bg-light text-dark" ><FontAwesomeIcon style={{ marginRight: "20px" }} size="lg" icon={faGoogle}></FontAwesomeIcon>
                    Login With Google
                </button>

                <button onClick={fbLogIn} className="btn btn-secondary btn-lg btn-block bg-light text-dark" ><FontAwesomeIcon  style={{marginRight:"20px"}} size="lg" icon={faFacebook} />
                    Login With Facebook
                </button>
            </Col>
        </div>

    );
}; export default Login;
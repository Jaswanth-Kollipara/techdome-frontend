import { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect, Link } from 'react-router-dom'
import './index.css'

class AdminLogin extends Component{
    state={
        name: '',
        password: '',
        showErrorMessage: false,
        nameError: false,
        passwordError: false,
        errorMsg: '', 
    }

    onSubmitSuccess=id=>{
        const {history}=this.props;
        this.setState({showErrorMessage: false});
        Cookies.set("id", id, {expires: 30, path: "/adminhome",});
        history.replace("/adminhome");
    }

    onSubmitFailure=errorMsg=>{
        this.setState({showErrorMessage: true,errorMsg});
    }

    onSubmitForm=async (event)=>{
        event.preventDefault();
        const {name,password}=this.state;
        if(name===''){
            this.setState({nameError: true});
        }
        else if(password===''){
            this.setState({passwordError: true});
        }
        else{
            const url="https://techdom-backend.onrender.com/login";
            const options={
                method: "POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({name: name, password: password}),
            }
            const response=await fetch(url,options);
            const data=await response.json();
            if(response.ok===true){
                this.onSubmitSuccess(data.id);
            }
            else{
                this.onSubmitFailure(data.error_msg);
            }
        }
    }

    onChangeName=event=>{
        if(event.target.value===''){
            this.setState({name: event.target.value, nameError: true});
        }
        this.setState({name: event.target.value, nameError: false});
    }

    onChangePassword=event=>{
        if(event.target.value===''){
            this.setState({password: event.target.value, passwordError: true});
        }
        this.setState({password: event.target.value, passwordError: false});
    }

    onBlurName=event=>{
        if(event.target.value===''){
            this.setState({nameError: true});
        }
        this.setState({nameError: false});
    }

    onBlurPassword=event=>{
        if(event.target.value===''){
            this.setState({passwordError: true});
        }
        this.setState({passwordError: false});
    }

    renderName=()=>{
        const {name,nameError}=this.state;
        return(
            <div className="form-inner-container">
                <label className="label" htmlFor="name">Name:</label>
                <br/>
                <input type="text" id="name" className="input" placeholder="Enter name" value={name} onChange={this.onChangeName} onBlur={this.onBlurName}/>
                {nameError?(<p className="p-error">*Required</p>):null}
            </div>
        )
    }

    renderPassword=()=>{
        const {password,passwordError}=this.state;
        return(
            <div className="form-inner-container">
                <label className="label" htmlFor="password">Password:</label>
                <br/>
                <input type="password" id="password" className="input" placeholder="Enter password" value={password} onChange={this.onChangePassword} onBlur={this.onBlurPassword}/>
                {passwordError?(<p className="p-error">*Required</p>):null}
            </div>
        )
    }

    render(){
        const {showErrorMessage, errorMsg} = this.state;
        const id=Cookies.get("id");
        if(id!==undefined){
            return <Redirect to="/adminhome" />;
        }
        return(
            <div className="admin-login-container">
                <form className="form-container" onSubmit={this.onSubmitForm}>
                    <h1 className="form-headding">Admin Login Form</h1>
                    {this.renderName()}
                    {this.renderPassword()}
                    <button type="submit" className="admin1-button">Login</button>
                    {showErrorMessage?(<p className="error-message">*{errorMsg}</p>):null}
                    <div className="link-container">
                        <Link to="/signup" className="link">
                            <button className="sign-up-button">Sign Up</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default AdminLogin
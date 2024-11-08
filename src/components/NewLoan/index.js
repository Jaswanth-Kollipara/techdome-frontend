import { Component } from "react";
import Header from "../Header";
import Cookies from 'js-cookie'
import './index.css'

class NewLoan extends Component{
    state={
        amount: '',
        term: '',
        amountError: false,
        termError: false,
        showErrorMessage: false,
        errorMsg: '', 
    }

    onSubmitFailure=errorMsg=>{
        this.setState({showErrorMessage: true,errorMsg});
    }

    onSubmitForm=async (event)=>{
        event.preventDefault();
        const {amount,term}=this.state;
        if(amount===''){
            this.setState({amountError: true});
        }
        else if(term===''){
            this.setState({termError: true});
        }
        else{
            const id = Cookies.get("id");
            const url="https://techdom-backend.onrender.com/loan";
            const options={
                method: "POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({amount: amount, term: term, isApproved: false,id: id,date: '8-11-24'}),
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

    onChangeAmount=event=>{
        if(event.target.value===' '){
            this.setState({amount: event.target.value, amountError: true});
        }
        this.setState({amount: Number(event.target.value), amountError: false});
    }

    onChangeTerm=event=>{
        if(event.target.value===' '){
            this.setState({term: event.target.value, termError: true});
        }
        this.setState({term: Number(event.target.value), termError: false});
    }

    onBlurAmount=event=>{
        if(event.target.value===" "){
            this.setState({amountError: true});
        }
        this.setState({amountError: false});
    }

    onBlurTerm=event=>{
        if(event.target.value===''){
            this.setState({termError: true});
        }
        this.setState({termError: false});
    }

    renderAmount=()=>{
        const {amount,amountError}=this.state;
        return(
            <div className="form-inner-container">
                <label className="label" htmlFor="amount">Amount:</label>
                <br/>
                <input type="text" id="amount" className="input" placeholder="Enter Amount" value={amount} onChange={this.onChangeAmount} onBlur={this.onBlurAmount}/>
                {amountError?(<p className="p-error">*Required</p>):null}
            </div>
        )
    }

    renderTerm=()=>{
        const {term,termError}=this.state;
        return(
            <div className="form-inner-container">
                <label className="label" htmlFor="term">Term:</label>
                <br/>
                <input type="text" id="term" className="input" placeholder="Enter term" value={term} onChange={this.onChangeTerm} onBlur={this.onBlurTerm}/>
                {termError?(<p className="p-error">*Required</p>):null}
            </div>
        )
    }

    render(){
        const {showErrorMessage, errorMsg} = this.state;
        return(
            <>
                <Header/>
                <div className="loan-container">
                    <form className="form-container" onSubmit={this.onSubmitForm}>
                        <h1 className="form-headding">Loan Form</h1>
                        {this.renderAmount()}
                        {this.renderTerm()}
                        <button type="submit" className="submit-button">Submit</button>
                        {showErrorMessage?(<p className="error-message">*{errorMsg}</p>):null}
                    </form>
                </div>
            </>
        )
    }
}

export default NewLoan
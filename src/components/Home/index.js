import { Component } from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import LoanCard from '../LoanCard'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

class Home extends Component{
    state={
        loanData:[],
        apiStatus: apiStatusConstants.initial,
    }

    componentDidMount() {
        this.getLoanDeals()
    }

    onClickRetry=()=>{
        this.getLoanDeals()
    }

    getLoanDeals = async () => {
        this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })
        const id = Cookies.get('id')
        const apiUrl = `https://techdom-backend.onrender.com/id/:${id}`
        const response = await fetch(apiUrl)
        if (response.ok === true) {
          const fetchedData = await response.json()
          const updatedData = fetchedData.map(val => ({
           loanId: val.loan_id,
           amount: val.amount,
           term: val.term,
           termPending: val.term_pending,
           isApproved: val.is_approved,
           date: val.date,
           amountRemain: val.amount_remain,
          }))
          this.setState({
            loanData: updatedData,
            apiStatus: apiStatusConstants.success,
          })
        } else if (response.status === 401) {
          this.setState({
            apiStatus: apiStatusConstants.failure,
          })
        }
      }

    renderLoanList = () => {
        const {loanData} = this.state
        const len=loanData.length>0
        return(
            <>
                <Header />
                <div className="home-container">
                    {len?(<div className="home-container">
                            <h1 className="home-headding">Loan Details:</h1>
                            <ul className="loan-list">
                                <li>
                                    <h1>Term</h1>
                                    <h1>Term Pending</h1>
                                    <h1>Amount</h1>
                                    <h1>Amount Remain</h1>
                                    <h1>Status</h1>
                                    <h1>Date</h1>
                                    <h1>View</h1>
                                </li>
                                {loanData.map(val => (
                                <LoanCard loanData={val} key={val.loanId} />
                                ))}
                            </ul>
                         </div>):(
                            <div>
                                <h1>No Loans are taken at this point of time</h1>
                            </div>
                        )
                    }
                </div>
            </>
        )
      }

    renderFailureView = () => (
        <div>
            <h1 className="error-headding">Oops! Something went wrong please try again....</h1>
            <button className="error-button" onClick={this.onClickRetry}>Retry</button>
        </div>
    )

    renderLoadingView = () => (
        <div className="products-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
    )

    render(){
        const {apiStatus} = this.state
        switch (apiStatus) {
        case apiStatusConstants.success:
            return this.renderLoanList()
        case apiStatusConstants.failure:
            return this.renderFailureView()
        case apiStatusConstants.inProgress:
            return this.renderLoadingView()
        default:
            return null
        }
    }
}

export default Home
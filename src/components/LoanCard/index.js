import './index.css'

const LoanCard=props=>{
    const {loanId, amount, term, termPending, isApproved, date, amountRemain}=props

    return(
        <li>
            <p>{amount}</p>
            <p>{term}</p>
            <p>{termPending}</p>
            <p>{isApproved}</p>
            <p>{date}</p>
            <p>{amountRemain}</p>
            <p>{loanId}</p>
        </li>
    )
}

export default LoanCard
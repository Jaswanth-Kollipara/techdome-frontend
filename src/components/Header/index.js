import { Link, withRouter } from "react-router-dom";
import Cookies from 'js-cookie'
import './index.css'

const Header = props =>{
    const onClickLogout = () => {
        Cookies.remove('id')
        const {history} = props
        history.replace('/login')
    }

    return(
        <nav className="header-container">
            <Link to="/" className="nav-link">
                <h1 className="nav-headder">Home</h1>
            </Link>
            <Link to="/newloan" className="nav-link">
                <h1 className="nav-headder">New Loan</h1>
            </Link>
            <button className="logout-btn" onClick={onClickLogout}>
            Logout
            </button>
        </nav>
    )
}

export default withRouter(Header)
import {Route, Redirect} from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute=(props)=>{
    const token = Cookies.get("id");
    if(token===undefined){
        return <Redirect to="/login" />;
    }
    return <Route {...props} />
}

export default ProtectedRoute
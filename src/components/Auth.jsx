import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {logIn} from "../redux/AuthReduces";
import s from "./Auth.module.css"

class Auth extends React.Component{
    onSubmit = (formData) => {
        this.props.logIn(formData.email, formData.password)
    }
    render() {
        if(this.props.isAuth){
            return ""
        }
        return (
            <div>
                <span>Log in</span>
                <AuthReduxForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}
let authForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field type="text" name={"email"} component={"input"} className={s.input}/></div>
            <div><Field type="text" name={"password"} component={"input"} className={s.input}/></div>
            <button className={s.loginBtn}>Log in</button>
        </form>

    )
}
let AuthReduxForm = reduxForm({
    form: "authForm"
})(authForm)
let mapStateToProps = (state)=>{
    return{
        isAuth: state.Auth.isAuth
    }
}

export default connect(mapStateToProps, {logIn})(Auth)
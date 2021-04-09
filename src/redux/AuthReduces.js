import {Api} from "../dal/api";
import {setCompaniesDataSucsess, setSelectedCompanyId} from "./CompaniesReducer";

let SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA"

let authDefaulState = {
    isAuth: false
}
export const authReducer = (state = authDefaulState, action) => {
    let copyState;
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            copyState = {
                ...state,
                ...action.userAuthdata
            }
            return copyState
        default:
            return state
    }
}
export let setAuthUserDataSucsess = (isAuth) => ({
    type: SET_AUTH_USER_DATA,
    userAuthdata: {isAuth}
})

export let logIn = (login, password) => {
    return (dispatch) => {
        Api.auth.logIn(login, password).then(response => {
                dispatch(setAuthUserDataSucsess(true))
                Api.houseData.getCompanies().then(response => {
                        dispatch(setCompaniesDataSucsess(response.data.data))
                        dispatch(setSelectedCompanyId(response.data.data[0].id))
                    }
                )
            }
        )
    }
}
window.authDefaulState = authDefaulState



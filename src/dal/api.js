import * as axios from "axios";

const instanse = axios.create({
    baseURL: "http://test-alpha.reestrdoma.ru/api/",
    withCredentials: true

})
let token = ""

export const Api = {
    houseData: {
        getCompanies() {
            return instanse.get(`reestrdoma/companies/`, {
                headers: {'Authorization': `Bearer ${token}`}
            })
        },
        getHouse(company_id = 1714, page = 1, perPage = 10) {
            return instanse.get(`reestrdoma/company/houses/${company_id}/?page=${page}&perPage=${perPage}`, {
                headers: {'Authorization': `Bearer ${token}`}
            })
        }
    },
    auth: {
        logIn(email, password) {
            return instanse.post(`login/`, {
                "username": `${email}`,
                "password": `${password}`
            }).then(response => {
                token = response.data.data.token.access
                return token
            })
        }
    }
}


window.Api = Api
window.token = token
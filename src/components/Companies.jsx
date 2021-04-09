import React from "react";
import {connect} from "react-redux";
import {
    metaDataHouseToNull,
    setHouseData,
    setSelectedCompanyId
} from "../redux/CompaniesReducer";
import s from "./Companies.module.css"


class Companies extends React.Component {
    state = {
        companiesField: this.props.companiesData.map((el) => <option id={el.id}>{el.name}</option>),
        houseField: this.props.isAuth ? this.props.houseData.map((el) =>
            <div>{el.address}</div>) : "Войдите в учетную запись для получения данных",
        currentCompanyId: this.props.currentCompanyId
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevState.companiesField.length != this.props.companiesData.length &&
            prevProps.currentCompanyId != this.props.currentCompanyId) ||
            prevState.houseField.length != this.props.houseData.length ||
            prevProps.currentCompanyId != this.props.currentCompanyId) {
            if (this.props.currentPage) {
                this.props.setHouseData(this.props.currentCompanyId, this.props.currentPage)
            } else {
                this.props.setHouseData(this.props.currentCompanyId)
            }
            this.setState({
                companiesField: this.props.companiesData.map((el) => <option id={el.id}>{el.name}</option>),
                currentCompanyId: this.props.currentCompanyId,
                houseField: this.props.houseData.map((el) => <tr>
                    <td>{el.id}</td>
                    <td className={s.tdAdress}>{el.address}</td>
                    <td>{el.reestrFlatCount}</td>
                    <td>{el.createdAt.slice(8, 10)}.{el.createdAt.slice(5, 7)}.{el.createdAt.slice(0, 4)}</td>
                </tr>)
            })
        } else if (prevProps.currentPage != this.props.currentPage ||
                    prevProps.lastPage != this.props.lastPage) {
            this.setState({
                houseField: this.props.houseData.map((el) => <tr>
                    <td>{el.id}</td>
                    <td className={s.tdAdress}>{el.address}</td>
                    <td>{el.reestrFlatCount}</td>
                    <td>{el.createdAt.slice(8, 10)}.{el.createdAt.slice(5, 7)}.{el.createdAt.slice(0, 4)}</td>
                </tr>)
            })
        }
    }

    render() {
        if(!this.props.isAuth){
            return ""
        }
        return (
            <div className={s.page}>
                <select className={s.CompanySelect}
                    onChange={(e) => {
                        console.log(e.target.selectedOptions[0].id)
                        this.props.metaDataHouseToNull()
                        this.props.setSelectedCompanyId(+e.target.selectedOptions[0].id)
                    }}>
                    {this.state.companiesField}
                </select>
                {this.state.houseField.length ?
                    <table className={s.table}>
                        <tr>
                            <th>Id</th>
                            <th>Адресс</th>
                            <th>Кол-вл квартир</th>
                            <th>Дата добавления</th>
                        </tr>
                        {this.state.houseField}
                    </table>: <div>У компании нет адресов</div>}

                <div className={s.paginatorBox}>
                    <button className={`${s.button} ${s.buttonLeft}`} onClick={() => {
                        this.props.setHouseData(this.props.currentCompanyId, 1)
                    }
                    }>{`<<`}
                    </button>
                    <button className={`${s.button} ${s.buttonLeft}`} onClick={() => {
                        this.props.setHouseData(this.props.currentCompanyId, this.props.prevPage)
                    }
                    }>{`<`}
                    </button>
                    {this.props.currentPage}...{this.props.lastPage}
                    <button className={`${s.button} ${s.buttonRigth}`} onClick={() => {
                        this.props.setHouseData(this.props.currentCompanyId, this.props.nextPage)
                    }
                    }>>
                    </button>
                    <button className={`${s.button} ${s.buttonRigth}`} onClick={() => {
                        this.props.setHouseData(this.props.currentCompanyId, this.props.lastPage)
                    }
                    }>>>
                    </button>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth,
        companiesData: state.Companies.companiesData,
        houseData: state.Companies.houseData,
        currentCompanyId: state.Companies.currentCompanyId,
        prevPage: state.Companies.prevPage,
        currentPage: state.Companies.currentPage,
        nextPage: state.Companies.nextPage,
        lastPage: state.Companies.lastPage
    }
}
export default connect(mapStateToProps, {setSelectedCompanyId, setHouseData, metaDataHouseToNull})(Companies)

window.state = Companies.state
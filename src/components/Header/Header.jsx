import { Component } from "react";
import styles from "./Header.styles.module.css"
import logo from "./assets/logo.png"
import { FetchData } from "../../utils/fetchDATA";
import { Link } from "react-router-dom";
import Categorylist from "../CategoryList";
import Currencies from "../Currencies";
import CartComponent from "../Cart.component";
export default class Header extends Component{
    
    constructor(props){
        super(props)
        this.state={
            loading:false,
            currencyNames:[],
            categoryList:{},
        }
        this.handleCatChange = this.handleCatChange.bind(this)
    }

    componentDidMount(){
        const getCurrencies = async ()=>{
            this.setState({loading:true})
            const {data} = await new FetchData().fetchCurrencies()
            this.setState({currencyNames:data,loading:false})
            if(!data){
                console.log("FAILED TO FETCH CURRENCY LIST")
            }
        }
        const getCategories = async ()=>{
            this.setState({loading:true})
            const {data} = await new FetchData().fetchCategoryNames()
            this.setState({categoryList:data.categories, loading:false})
            if(!data){
                console.log("Failed to fetch category name.")
            }
        }
        getCategories()
        getCurrencies()
    }

    handleCatChange(el){
    this.setState({loading:true,category:el.toUpperCase(),data:{}})
    this.props.changeCategory(el)
    }
    

    render(){
        return(
            <div className={styles.header}>
                <Categorylist categoryList={this.state.categoryList} currCategory={this.props.category} handleCatChange={this.handleCatChange}/>

                <Link className={styles.logo} to='/categories'>
                    <img src={logo} className={styles.mainButton} alt=''/>
                </Link>

            <div className={styles.cart}>
                <Currencies changeCurrency={this.props.changeCurrency} currencyNames={this.state.currencyNames?.currencies} currency={this.props.currency} isOpen={this.props.isOpen} setIsOpen={this.props.setIsOpen}/>
                <CartComponent changeQuantity={this.props.changeQuantity} currency={this.props.currency} cartIsOpen={this.props.cartIsOpen} setCartIsOpen={this.props.setCartIsOpen} cart={this.props.cart}/>
            </div>

          </div>
        )
    }
}
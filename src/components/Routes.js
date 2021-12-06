import {Router, Route,Switch} from "react-router-dom"
import { Component } from "react"
import Categories from "../pages/CategoryPage/Categories"
import Product from "../pages/ProductPage/Product"
import { BrowserRouter } from "react-router-dom"
import Cart from "../pages/CartPage/Cart.jsx"
export default class Routes extends Component{
    constructor(props){
        super(props)
    }
    render(){
        window.location.pathname === "/" &&(
            window.location = "/categories"
        )
            
        return(
                <Switch>
                    <Route exact path="/categories" render={()=><Categories darken = {this.props.darken} currency={this.props.currency} category={this.props.category}/>}></Route>
                    <Route path="/product" render={()=><Product darken = {this.props.darken} cart={this.props.cart} setCart={this.props.setCart} currency={this.props.currency}/>}></Route>
                    <Route path="/cart" render={()=><Cart  darken = {this.props.darken} changeQuantity={this.props.changeQuantity} cart={this.props.cart} setCart={this.props.setCart} currency={this.props.currency}/>}></Route>
                </Switch>
        )
    }
}
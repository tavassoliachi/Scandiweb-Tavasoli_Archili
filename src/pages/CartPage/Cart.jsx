import { Component } from "react"
import styles from "./styles.module.css"
import Cartpageitem from "../../components/CartPageItem"
export default class Cart extends Component{
    render(){

        return(
            <div className={styles.container}>
                <h1  className={styles.brand}>CART</h1>
                <Cartpageitem cart={this.props.cart} currency={this.props.currency} changeQuantity={this.props.changeQuantity}/>     
            </div>
            
        )
    }
}
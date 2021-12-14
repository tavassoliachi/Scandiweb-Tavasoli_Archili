import { Component } from "react"
import styles from "./styles.module.css"
import Cartpageitem from "../../components/CartPageItem"
export default class Cart extends Component{
    showCartItems(){
        return this.props.cart.map((el)=>{
            return <Cartpageitem item={el} currency={this.props.currency} changeQuantity={this.props.changeQuantity}/>     
         })
    }
    render(){
        return(
            <div className={styles.container}>
                <h1  className={styles.brand}>CART</h1>
                {this.showCartItems()}
            </div>
            
        )
    }
}
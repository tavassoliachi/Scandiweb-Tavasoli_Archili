import React, { Component } from 'react';
import styles from "./Cart.styles.module.css"
import cart from "./Header/assets/cart.png"
import { Link } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map';
import Cartitems from "./CartItems"
class CartComponent extends Component {
    render() {
        var itemCount = 0
        this.props.cart.forEach((el)=>itemCount+=el.quantity)
        return (
            <div>
                <div onClick={()=>!Boolean(window.location.pathname==="/cart") ? this.props.setCartIsOpen(!this.props.cartIsOpen) : ''} >
                    <img className={styles.cartImg} src={cart} alt=''/>
                    <div className={styles.cartLENGTH} style={!itemCount ? {display:"none"} : undefined}>
                        <p>{itemCount}</p>
                    </div>  
                </div>

                <div className={styles.cartItems} style={this.props.cartIsOpen ? undefined : {display:"none"}} >
                    <p className={styles.cartLength}>My Bag, {itemCount} items</p>
                    <Cartitems cart={this.props.cart} currency={this.props.currency} changeQuantity={this.props.changeQuantity}/>
                    <div className={styles.buttons}>
                        <Link to="/cart" onClick={()=>this.props.setCartIsOpen(!this.props.cartIsOpen)} className={styles.viewBAG}>VIEW BAG</Link>
                        <Link to="/cart" onClick={()=>this.props.setCartIsOpen(!this.props.cartIsOpen)} className={styles.checkOUT}>CHECK OUT</Link>
                    </div>

                </div>
            </div>
        );
    }
}

export default CartComponent;

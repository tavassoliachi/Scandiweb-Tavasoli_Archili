import React, { Component } from 'react';
import styles from "./Cart.styles.module.css"
import cart from "./Header/assets/cart.png"
import { Link } from 'react-router-dom';
import Cartitems from "./CartItems"
class CartComponent extends Component {
    constructor(){
        super()
        this.itemCount=0
    }
    cartLOGO(){
        const handleClick=()=>{!Boolean(window.location.pathname==="/cart") && this.props.setCartIsOpen(!this.props.cartIsOpen)}
        return  <div onClick={handleClick} >
                    <img className={styles.cartImg} src={cart} alt=''/>
                    <div className={`${styles.cartLENGTH} ${!this.itemCount ? styles.hide : ''}`}>
                        <p>{this.itemCount}</p>
                    </div>  
                </div>
    }
    cartButtons(){
        const handleClick = () => { this.props.setCartIsOpen(!this.props.cartIsOpen) }
        return  <div className={styles.buttons}>
                    <Link to="/cart" onClick={handleClick} className={styles.viewBAG}>VIEW BAG</Link>
                    <Link to="/cart" onClick={handleClick} className={styles.checkOUT}>CHECK OUT</Link>
                </div>
    }
    render() {
        this.itemCount = 0
        this.props.cart.forEach((el)=>this.itemCount+=el.quantity)
        return (
            <div>
                
                {this.cartLOGO()}

                <div className={`${styles.cartItems} ${this.props.cartIsOpen ? '' : styles.hide}`} >
                    <p className={styles.cartLength}>My Bag, {this.itemCount} items</p>
                    <Cartitems cart={this.props.cart} currency={this.props.currency} changeQuantity={this.props.changeQuantity}/>
                    {this.cartButtons()}
                </div>

            </div>
        );
    }
}

export default CartComponent;

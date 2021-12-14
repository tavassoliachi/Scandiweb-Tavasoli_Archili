import React, { Component } from 'react';
import ProductOptions from './ProductOptions';
import styles from "./CartItems.styles.module.css"
import getSymbolFromCurrency from 'currency-symbol-map';
class Cartitems extends Component {
    constructor(){
        super()
        this.totalPrice=0
    }
    mapCart(){
        this.totalPrice=0
        const {cart} = this.props
        return cart.map(this.renderCart)
        
    }
    renderCart=(el)=>{
        const price = (el.prices.filter((el1)=>el1.currency===this.props.currency)[0].amount).toFixed(2)
        const priceANDsymbol = `${getSymbolFromCurrency(this.props.currency)} ${price}`
        this.totalPrice += price*el.quantity
       return <div className={styles.item} key={el.id}>
                    <div className={styles.info1}>
                        <h1>{el.brand}</h1> 
                        <h1>{el.name}</h1> 
                        <p>{priceANDsymbol}</p>
                        {this.renderAttributes(el)}
                    </div>
                    {this.quantityControl(el)}
                </div>
    }
    
    renderAttributes(el){
        return el.attributes.map(element=>{
            return  <div  key={element.name} >
                    <p  className={styles.subTitle}>{element.name.toUpperCase()}:</p>
                    <div className={styles.attribute}>
                        <ProductOptions data={element} handleSelect={()=>{}} selections={el.options} type="header_cart"/>
                    </div>
                </div>
    })}
    
    quantityControl(el){
        const changeQuantity=(id,state)=>{this.props.changeQuantity(id,state)} 
         return <div className={styles.quantityChange}>
                    <div className={styles.quantity}>
                            <span onClick={()=>changeQuantity(el.id,+1)}>+</span>
                            <p>{el.quantity}</p>
                            <span onClick={()=>changeQuantity(el.id,-1)}>-</span>
                    </div>
                    <div style={{backgroundImage:`url(${el.gallery[0]})`}} className={styles.cartImage}/>
                </div>
               

    }
    countTotalPrice(){
        return  <div className={styles.totalPrice}>
                    <p>TOTAL</p>
                    <p>{getSymbolFromCurrency(this.props.currency)}{this.totalPrice.toFixed(2)}</p>
                </div>
    }
    
    render() {
        return (
            <div>
                    {this.mapCart()}
                    {this.countTotalPrice()}
            </div>
        );
    }
}

export default Cartitems;

import React, { Component } from 'react';
import ProductOptions from './ProductOptions';
import styles from "./CartItems.styles.module.css"
import getSymbolFromCurrency from 'currency-symbol-map';
class Cartitems extends Component {
    render() {
        var totalN=0
        return (
            <div>
                {this.props.cart.map((el)=>{
            return  <div className={styles.item} key={el.id}>
                            <span className={styles.calc}>{totalN+=el.prices.filter((el1)=>el1.currency===this.props.currency)[0].amount*el.quantity}</span>
                            <div className={styles.info1}>
                                <h1>{el.brand}</h1> 
                                <h1>{el.name}</h1> 
                                <p>{getSymbolFromCurrency(this.props.currency)}{(el.prices.filter((el1)=>el1.currency===this.props.currency)[0].amount).toFixed(2)}</p>
                                {el.attributes.map((element)=>{
                                  return  <div  key={element.name} >
                                        <p  className={styles.subTitle}>{element.name.toUpperCase()}:</p>
                                        <div className={styles.attribute}>
                                            <ProductOptions data={element} handleSelect={()=>{}} selections={el.options} type="header_cart"/>
                                        </div>
                                    </div>
                                })}
                            </div>

                            <div className={styles.quantityChange}>
                                <div className={styles.quantity}>
                                        <span onClick={()=>this.props.changeQuantity(el.id,+1)}>+</span>
                                        <p>{el.quantity}</p>
                                        <span onClick={()=>this.props.changeQuantity(el.id,-1)}>-</span>
                                </div>
                                <div style={{backgroundImage:`url(${el.gallery[0]})`}} className={styles.cartImage}/>
                            </div>
                    </div>
                  })}
                     <div className={styles.totalPrice}>
                      <p>TOTAL</p>
                      <p>{getSymbolFromCurrency(this.props.currency)}{totalN.toFixed(2)}</p>
                  </div>
            </div>
        );
    }
}

export default Cartitems;

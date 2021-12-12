import getSymbolFromCurrency from 'currency-symbol-map';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./EachProduct.styles.module.css"
import cart from "./assets/circleWcart.png"
class EachProduct extends Component {
    render() {
        const el = this.props.el
        const inStock = Boolean(el.inStock)
        
        const handleSelect=(e)=>{
            if(e.target.id==='toCart'){
                if(el.attributes.length===0){
                    e.preventDefault();
                    this.props.setCart(
                        {
                        name:el?.name,
                        gallery:el?.gallery,
                        prices:el?.prices,
                        brand:el?.brand,
                        quantity:1,
                        options:[],
                        id: Date.now(),
                        attributes:[]
                        } )
                }
            }
        }
        return (
            <Link key={el.gallery[0]} id='link' className={styles.productCard}  to={`/product?id=${el.id}`}
             onClick={(e)=>handleSelect(e)}
             >

                <div className={styles.outOfStock} style={inStock ? {display:"none"} : undefined } >
                    <p>OUT OF STOCK</p>
                </div>
                
                <div className={styles.item}>

                    <div className={styles.productTopSide}>
                        <img alt='' src={el.gallery[0]} className={styles.mainIMG}/>
                        <img alt='' src={cart} className={styles.cart} id='toCart' onClick={handleSelect} style={inStock ? undefined : {visibility:"hidden",pointerEvents:"none"}}/>
                    </div>
                        
                    <div className={styles.info}>
                        <p className={styles.itemTitle}>{el.brand}</p>
                        <p className={styles.itemTitle}>{el.name}</p>
                        <p className={styles.itemPrice}>{getSymbolFromCurrency(this.props?.currency)}{el.prices.filter((el1)=>el1.currency===this.props.currency)[0].amount.toFixed(2)}</p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default EachProduct;

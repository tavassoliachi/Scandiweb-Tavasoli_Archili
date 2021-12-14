import getSymbolFromCurrency from 'currency-symbol-map';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./EachProduct.styles.module.css"
import cart from "./assets/circleWcart.png"
class EachProduct extends Component {

    handleSelect(e){
        const el = this?.props?.el
        if(e.target.id==='toCart'){
            if(el?.attributes.length===0){
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
    
    displayImages(){
        const el = this.props.el
        return  <div className={styles.productTopSide}>
                    <img alt='' src={el.gallery[0]} className={styles.mainIMG}/>
                    <img alt='' src={cart} className={`${styles.cart} ${el.inStock ? '' : styles.visibility}`} id='toCart' onClick={this.handleSelect}/>
                </div>
    }
    itemInfo(){
        const {brand,name,prices} = this.props.el
        return  <div className={styles.info}>
                    <p className={styles.itemTitle}>{brand}</p>
                    <p className={styles.itemTitle}>{name}</p>
                    <p className={styles.itemPrice}>{getSymbolFromCurrency(this.props?.currency)}{prices.filter((el1)=>el1.currency===this.props.currency)[0].amount.toFixed(2)}</p>
                </div>
    }
    render() {
        const el = this.props.el
        const inStock = Boolean(el.inStock)

        return (
            <Link key={el.gallery[0]} id='link' className={styles.productCard}  to={`/product?id=${el.id}`}
             onClick={(e)=>this.handleSelect(e)}
             >

                <div className={`${styles.outOfStock} ${inStock ? styles.hide : ''}`}>
                    <p>OUT OF STOCK</p>
                </div>
                
                <div className={styles.item}>
                    {this.displayImages()}
                    {this.itemInfo()}
                </div>

            </Link>
        );
    }
}

export default EachProduct;

import React, { Component } from 'react';
import styles from "./CartPageItem.styles.module.css"
import getSymbolFromCurrency from 'currency-symbol-map';
import GenerateOptions from './GenerateOptions';
import Vector from "./assets/Vector (8).png"
class Cartpageitem extends Component {
    
    render() {
        const nextImage = (el) =>{
            const activeIndex = el?.gallery.indexOf(document.getElementById(el.id).style?.backgroundImage.substring(5,document.getElementById(el.id).style.backgroundImage.length-2))
            const lastIndex = el.gallery.length - 1
            document.getElementById(el.id).style.backgroundImage = `url(${el?.gallery[lastIndex === activeIndex ? 0 : activeIndex+1]})`
        }
        const previousImage = (el) =>{
            const activeIndex = el?.gallery.indexOf(document.getElementById(el.id).style?.backgroundImage.substring(5,document.getElementById(el.id).style.backgroundImage.length-2))
            const lastIndex = el.gallery.length - 1
            document.getElementById(el.id).style.backgroundImage = `url(${el?.gallery[activeIndex === 0 ? lastIndex : activeIndex-1]})`
        }
        return (
            <div>
                {this.props.cart?.map((el)=>{
                return <div className={styles.item}  key={el.brand+el.name+el.id}>
                    <div className={styles.leftSide}>
                        <h3 className={styles.brand}>{el.brand}</h3> 
                        <h4 className={styles.name}>{el.name}</h4> 
                        <div className={styles.prices}>
                            <p>{getSymbolFromCurrency(this.props.currency)}{(el.prices.filter((el1)=>el1.currency===this.props.currency)[0].amount).toFixed(2)}</p>
                        </div>

                        <GenerateOptions handleSelect={()=>{}} attributes={el.attributes} selections={el.options}/>

                    </div>
                    <div className={styles.rightSide}>
                        <div className={styles.quantity}>
                            <div className={styles.quantityChange}  onClick={()=>this.props.changeQuantity(el.id,+1)} >+</div>
                            <p>{el?.quantity}</p>
                            
                            <div className={styles.quantityChange}  onClick={()=>this.props.changeQuantity(el.id,-1)} >-</div>
                        </div>
                        <div className={styles.itemImg} id={el?.id} style={{backgroundImage:`url(${el?.gallery[0]})`}}>
                                <img src={Vector} alt='' className={styles.vectors} onClick={()=>previousImage(el)} style={el?.gallery.length>1 ? undefined : {display:"none"}}/>
                                <img src={Vector} alt='' className={styles.vectors} onClick={()=>nextImage(el)} style={el?.gallery.length>1 ? undefined : {display:"none"}}/>
                        </div>
                    </div>
                </div>

    })}
            </div>
        );
    }
}

export default Cartpageitem;

import React, { Component } from 'react';
import styles from "./CartPageItem.styles.module.css"
import getSymbolFromCurrency from 'currency-symbol-map';
import GenerateOptions from './GenerateOptions';
import Vector from "./assets/Vector (8).png"
class Cartpageitem extends Component {
    leftSide(){
        const el = this.props.item
        return <div className={styles.leftSide}>
                    <h3 className={styles.brand}>{el.brand}</h3> 
                    <h4 className={styles.name}>{el.name}</h4> 
                    <div className={styles.prices}>
                        <p>{getSymbolFromCurrency(this.props.currency)}{(el.prices.filter((el1)=>el1.currency===this.props.currency)[0].amount).toFixed(2)}</p>
                    </div>
                    <GenerateOptions handleSelect={()=>{}} attributes={el.attributes} selections={el.options}/>
                </div>
    }
    rightSide(){
        const el = this.props.item
        const changeImage = (el,state) =>{
            const activeIndex = el?.gallery.indexOf(document.getElementById(el.id).style?.backgroundImage.substring(5,document.getElementById(el.id).style.backgroundImage.length-2))
            const lastIndex = el.gallery.length - 1
            var index = activeIndex+state
            if(index>lastIndex){index=0}
            if(index<0){index=lastIndex}
            document.getElementById(el.id).style.backgroundImage = `url(${el?.gallery[index]})`
        }
        return  <div className={styles.rightSide}>
                    {this.quantity()}
                    <div className={styles.itemImg} id={el?.id} style={{backgroundImage:`url(${el?.gallery[0]})`}}>
                            <img src={Vector} alt='' className={`${styles.vectors} ${el?.gallery.length>1 ? '' : styles.hide}`} onClick={()=>changeImage(el,+1)} />
                            <img src={Vector} alt='' className={`${styles.vectors} ${el?.gallery.length>1 ? '' : styles.hide}`} onClick={()=>changeImage(el,-1)}/>
                    </div>
                </div>
    }
    quantity(){
        const el = this.props.item
        const handleClick = (id,state) =>{this.props.changeQuantity(id,state)}
        return <div className={styles.quantity}>
                    <div className={styles.quantityChange}  onClick={()=>handleClick(el.id,+1)} >+</div>
                    <p>{el?.quantity}</p>
                    <div className={styles.quantityChange}  onClick={()=>handleClick(el.id,-1)} >-</div>
                </div>
    }

    render() {

        const el = this.props.item
        return (
            <div className={styles.item}  key={el.brand+el.name+el.id}>
                {this.leftSide()}
                {this.rightSide()}
            </div>
        );
    }
}

export default Cartpageitem;

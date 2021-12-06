import { Component } from "react"
import { FetchData } from "../../utils/fetchDATA"
import styles from "./styles.module.css"
import getSymbolFromCurrency from 'currency-symbol-map'
import ProductOptions from "../../components/ProductOptions"
import { Link } from "react-router-dom"
import { queryByLabelText } from "@testing-library/dom"
import Vector from "../../components/assets/Vector (8).png"

export default class Cart extends Component{
    constructor(props){
        super(props)
    }
  

    render(){
        const nextImage = (el) =>{
            const activeIndex = el?.gallery.indexOf(document.getElementById(el.id).style?.backgroundImage.substring(5,document.getElementById(el.id).style.backgroundImage.length-2))
            const lastIndex = el.gallery.length - 1
            console.log(activeIndex,lastIndex)
            document.getElementById(el.id).style.backgroundImage = `url(${el?.gallery[lastIndex == activeIndex ? 0 : activeIndex+1]})`
        }
        const previousImage = (el) =>{
            const activeIndex = el?.gallery.indexOf(document.getElementById(el.id).style?.backgroundImage.substring(5,document.getElementById(el.id).style.backgroundImage.length-2))
            const lastIndex = el.gallery.length - 1
            console.log(activeIndex,lastIndex)
            document.getElementById(el.id).style.backgroundImage = `url(${el?.gallery[activeIndex == 0 ? lastIndex : activeIndex-1]})`
        }
        return(
            <div className={styles.container}>
                       {/* {
             this.props.darken &&(
                <div style={{position:"absolute",height:"100%",width:"100%"}}>
                    <div className={styles.darken}/>
                </div>
             )   
            } */}
                <h1  className={styles.brand}>CART</h1>
            {this.props.cart?.map((el)=>{
                return <div className={styles.item}>
                    <div className={styles.leftSide}>
                        <h3 className={styles.brand}>{el.brand}</h3> 
                        <h4 className={styles.name}>{el.name}</h4> 
                        {/* <p>{el.quantity}</p> */}
                        <div className={styles.prices}>
                            <p>{getSymbolFromCurrency(this.props.currency)}{(el.prices.filter((el1)=>el1.currency==this.props.currency)[0].amount*el.quantity).toFixed(2)}</p>
                        </div>
                        {el.attributes.map((element)=>
                        <>
                            <p className={styles.subTitle}>{element.name.toUpperCase()}:</p>
                            <div className={styles.attribute}>
                                <ProductOptions data={element} handleSelect={()=>{}} selections={el.options}/>
                            </div>
                        </>
                        )}
                    </div>
                    <div className={styles.rightSide}>
                        <div className={styles.quantity}>
                            <div className={styles.quantityChange}  onClick={()=>this.props.changeQuantity(el.id,+1)} >+</div>
                            <p style={{textAlign:"center",paddingRight:"10px",fontWeight:"bold",fontSize:"23px"}}>
                                {el?.quantity}
                            </p>
                            <div className={styles.quantityChange}  onClick={()=>this.props.changeQuantity(el.id,-1)} >-</div>
                        </div>
                        <div className={styles.itemImg} id={el?.id} style={{backgroundImage:`url(${el?.gallery[0]})`,width:"300px",minHeight:"350px",backgroundSize:"100%",backgroundRepeat:"no-repeat"}}>
                            <img src={Vector} onClick={()=>previousImage(el)}/>
                            <img src={Vector} onClick={()=>nextImage(el)}/>
                            
                        </div>
                    </div>
                </div>

            })}

                       
                    </div>
            
        )
    }
}
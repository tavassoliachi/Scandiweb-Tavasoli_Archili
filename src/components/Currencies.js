import React, { Component } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import vector from "./Header/assets/Vector.png"
import styles from "./Currencies.styles.module.css"

class Currencies extends Component {
    constructor(props) {
        super(props);
        this.symbol = getSymbolFromCurrency(`${this.props.currency}`)
        this.handleClick = this.handleClick.bind(this)
    }
    

    componentDidMount(){
        console.log(this.props)
        document.addEventListener("click", (e)=>{
            if(this.props.isOpen){
                if(e.target.id !== 'currency'){
                    if(this.props.isOpen){
                        this.props.setIsOpen(false)
                    }
                }
            }
        });
    }
    generateCurrencies(){
        const currencies = this.props.currencyNames || []
        const handleClick=(el)=>{
            this.props.changeCurrency(el)
            this.props.setIsOpen(false)
            this.symbol = getSymbolFromCurrency(`${el}`)
        }
    return currencies.map((el)=>{
                var priceWITHsymbol=`${el} ${this.symbol}`
                return <div key={el}  id='currency' onClick={()=>handleClick(el)} 
                className={styles.currencyItem}>{priceWITHsymbol}</div>
      })

    }
    handleClick(){
        this.props.setIsOpen(!this.props.isOpen)
    }
    render() {
        return (
            <div>
                <span className={styles.currSymbol} id='currency' onClick={this.handleClick}>{this.symbol}</span>
                <div className={`${styles.currency} ${this.props.isOpen ? '' : styles.hide}`}>
                    {this.generateCurrencies()}
                </div>
              <img src={vector} alt=''  id='currency'  className={`${styles.vector} ${this.props.isOpen ? styles.rotation : ''}`} onClick={this.handleClick}/>
            </div>
        );
    }
}

export default Currencies;

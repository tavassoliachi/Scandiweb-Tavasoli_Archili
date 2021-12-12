import React, { Component } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import vector from "./Header/assets/Vector.png"
import styles from "./Currencies.styles.module.css"

class Currencies extends Component {
    
    handleClick(el){
        this.props.changeCurrency(el)
        this.props.setIsOpen(false)
    }
    componentDidMount(){
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

    render() {
        const currencies = this.props.currencyNames || []
        return (
            <div>
                <span className={styles.currSymbol} id='currency' onClick={()=>this.props.setIsOpen(!this.props.isOpen)}>{getSymbolFromCurrency(`${currencies.filter((el)=>el === this.props.currency)}`)}</span>
              
              <div style={this.props.isOpen ? undefined : {display:"none"}} className={styles.currency}>
                  {
                  currencies.map((el)=>{
                    return <div key={el}  id='currency' onClick={()=>this.handleClick(el)} className={styles.currencyItem}>{el}{getSymbolFromCurrency(`${el}`)}</div>
                  })
                  }
              </div>
              <img src={vector} alt=''  id='currency'  className={styles.vector} style={this.props.isOpen ? {transform:"rotate(180deg)"} : undefined} onClick={()=>this.props.setIsOpen(!this.props.isOpen)}/>
            </div>
        );
    }
}

export default Currencies;

import {Component} from "react"
import styles from "./ProductOptions.styles.module.css"
export default class ProductOptions extends Component{
    generateOptions(el,selections,handleSelect){
        const cartMenu = Boolean(this.props?.type)
        switch (el.type){
            case "text": 
            return el.items?.map((item)=>{
                        const isActive = selections.filter((e)=> e.name===el.name).filter((el)=>el.value===item.value).length>0
                      return <div key={item.displayValue} className={isActive ? cartMenu ? styles.attr1 : styles.attr2 : ''}
                                  onClick={()=>handleSelect(el,item)}>{cartMenu ? item.displayValue.length>3 ? item.displayValue[0] : item.displayValue : item.displayValue}
                             </div>

                            
                  })
            case "swatch":
                return el.items?.map((item)=>{
                    const isActive = selections.filter((e)=> e.name===el.name).filter((el)=>el.value===item.value).length>0
                    return <div key={item.value} className={isActive ? styles.activeColor : ''} onClick={()=>handleSelect(el,item)}><div className={styles.colorCont} style={{backgroundColor:`${item.value}`}}/></div>
                })
             default:
                 return 0;
         }
    }
    render(){

        return(
            <div>
                {this.generateOptions(this.props.data,this.props.selections,this.props.handleSelect )}
            </div>
        )
    }
}
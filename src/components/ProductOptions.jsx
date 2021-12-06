import {Component} from "react"
import selected from "./assets/selected.png"
export default class ProductOptions extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const cartMenu = Boolean(this.props?.type)
        function generateOptions(el,selections,handleSelect){

            switch (el.type){
                case "text": 
                return el.items?.map((item)=>{
                            const isActive = selections.filter((e)=> e.name==el.name).filter((el)=>el.value==item.value).length>0
                           
                          return <><div style={isActive ? cartMenu ? {backgroundColor:"#A6A6A633",color:"#A6A6A6"} : {backgroundColor:"black",color:"white"} : undefined}
                                      onClick={()=>handleSelect(el,item)}>{cartMenu ? item.displayValue.length>3 ? item.displayValue[0] : item.displayValue : item.displayValue}
                                 </div>

                                 </>
                      })
                case "swatch":
                    return el.items?.map((item)=>{
                        const isActive = selections.filter((e)=> e.name==el.name).filter((el)=>el.value==item.value).length>0
                    return <div style={isActive ? {backgroundColor:"black"} : undefined} onClick={()=>handleSelect(el,item)}><div style={{height:"20px",width:"20px",backgroundColor:`${item.value}`,border:`1px solid #1D1F22`}}/></div>
                    })
                 default:
                     return 0;
             }
        }
        return(
            <div>
                {generateOptions(this.props.data,this.props.selections,this.props.handleSelect )}
                {/* <button onClick={()=>console.log(this.props.selections)}>selections</button> */}
            </div>
        )
    }
}
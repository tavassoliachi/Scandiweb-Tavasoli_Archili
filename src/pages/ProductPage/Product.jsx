import { Component } from "react"
import { FetchData } from "../../utils/fetchDATA"
import styles from "./styles.module.css"
import dompurify from 'dompurify'
import getSymbolFromCurrency from 'currency-symbol-map'
import GenerateOptions from "../../components/GenerateOptions"
export default class Product extends Component{
    constructor(props){
        super(props)
        this.state={
            product:{},
            erroredImages:[],
            selections:[],
            notSelected:false
        }
    }
    async componentDidMount(){
        const id = window.location.search.substring(4)
        const {data} = await new FetchData().fetchProduct(id)
        this.setState({product:data.product})
    }
    render(){
        var sideIMAGES = []
        var mainImage = []
        this.state.product?.gallery?.forEach((el,index)=>{
            if(index>0){
               sideIMAGES.push(el) 
            }else{
                mainImage.push(el)
            }
        })
        function imageChange(e,index){
            const src1 = e.target.src
            const src2 = document.getElementById("mainImage").src
            document.getElementById(index).src = src2
            document.getElementById("mainImage").src = src1
        }
         const sanitizeHTML=()=>{
            const txt = this.state?.product?.description;
            const sanitizer = dompurify.sanitize;
            return <div dangerouslySetInnerHTML={{__html: sanitizer(txt)}} />;
        }
        const handleSelect=(el,item)=>{
            const list = this.state.selections
            const newList=list.filter((n)=> !Boolean(n.name===el.name)).concat({name:el.name,value:item.value}) 
            this.setState({selections:[...newList]})
        }
        const addToCart=()=>{
            const product = this.state.product
            if(this.state.selections.length===product.attributes.length){
                this.props.setCart(
                {
                name:product?.name,
                gallery:product?.gallery,
                prices:product?.prices,
                brand:product?.brand,
                quantity:1,
                options:this.state?.selections,
                id: Date.now(),
                attributes:product?.attributes
                } )
                if(this.state.notSelected === true){
                    this.setState({notSelected:false})
                }
            }else{
                this.setState({notSelected:true})
            }
            
        }
        return(

            <div className={styles.productCont}>

            <div className={styles.subCont}>

                <div className={styles.sideIMAGES}>
                    {sideIMAGES.map((el,index)=>{
                       return <img key={el} alt=''
                                   src={el} style={this.state.erroredImages.includes(el) ? {display:"none"} : undefined} 
                                   onError={()=>this.setState({erroredImages:[el,...this.state.erroredImages] }) } 
                                   onClick={(e)=>imageChange(e,index)} id={index}
                              />
                    })}
                </div>

                <div className={styles.mainImage}>
                    <img src={mainImage[0]} id="mainImage" alt=''/>
                </div>

                <div className={styles.info}>
                    <h1 className={styles.brand}>{this.state.product?.brand}</h1>
                    <h3 className={styles.name}>{this.state.product?.name}</h3>

                <GenerateOptions handleSelect={handleSelect} attributes={this.state.product.attributes} selections={this.state.selections}/>

                    <div className={styles.prices}>
                        <h3 className={styles.subTitle} >PRICE:</h3>
                        <p>{getSymbolFromCurrency(this.props.currency)}
                        {this.state.product.prices?.filter((el)=>el.currency===this.props.currency)[0].amount.toFixed(2)}
                        </p>
                    </div>
                    
                    <p style={this.state.notSelected ? {color:"red",fontWeight:"bold"} : {display:"none"}}>PLEASE SELECT ALL THE FIELDS</p>

                    <button className={styles.addToCart}  onClick={()=>addToCart()} disabled={!this.state.product.inStock}>
                       {this.state.product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                    </button>

                    <div className={styles.description}>{ sanitizeHTML() }</div>
                </div>
                </div>
            </div>
        )
    }
}
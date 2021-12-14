import { Component } from "react"
import { FetchData } from "../../utils/fetchDATA"
import styles from "./styles.module.css"
import dompurify from 'dompurify'
import getSymbolFromCurrency from 'currency-symbol-map'
import GenerateOptions from "../../components/GenerateOptions"
import ProductPageImages from "../../components/ProductPageImages"
export default class Product extends Component{
    constructor(props){
        super(props)
        this.state={
            product:{},
            selections:[],
            notSelected:false
        }
        this.handleSelect = this.handleSelect.bind(this)
    }
    async componentDidMount(){
        const id = window.location.search.substring(4)
        const {data} = await new FetchData().fetchProduct(id)
        this.setState({product:data.product})
    }
    sanitizeHTML(){
        const txt = this.state?.product?.description;
        const sanitizer = dompurify.sanitize;
        return <div dangerouslySetInnerHTML={{__html: sanitizer(txt)}} />;
    }
    handleSelect(el,item){
        const list = this.state?.selections
        const newList=list.filter((n)=> !Boolean(n.name===el.name)).concat({name:el.name,value:item.value}) 
        this.setState({selections:[...newList]})
    }
    generatePrices(){
        const symbol = getSymbolFromCurrency(this.props.currency)
        const price = this.state.product.prices?.filter((el)=>el.currency===this.props.currency)[0].amount.toFixed(2)
        return <div className={styles.prices}>
                    <h3 className={styles.subTitle} >PRICE:</h3>
                    <p>{symbol}{price}</p>
                </div>
    }

    addToCart(){
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
    render(){
         
       
        return(
            <div className={styles.productCont}>
                <div className={styles.subCont}>
                    <ProductPageImages images={this.state.product?.gallery}/>

                    <div className={styles.info}>
                        <h1 className={styles.brand}>{this.state.product?.brand}</h1>
                        <h3 className={styles.name}>{this.state.product?.name}</h3>
                        <GenerateOptions handleSelect={this.handleSelect} attributes={this.state.product.attributes} selections={this.state.selections}/>
                        {this.generatePrices()}

                        <p className={this.state.notSelected ? styles.validation : styles.hide}>PLEASE SELECT ALL THE FIELDS</p>

                        <button className={styles.addToCart}  onClick={()=>this.addToCart()} disabled={!this.state.product.inStock}>
                            {this.state.product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                        </button>

                        <div className={styles.description}>{ this.sanitizeHTML() }</div>
                    </div>
                </div>
            </div>
        )
    }
}
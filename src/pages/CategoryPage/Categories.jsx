import { Component } from "react"
import { FetchData } from "../../utils/fetchDATA"
import styles from "./styles.module.css"
import getSymbolFromCurrency from 'currency-symbol-map'
import { Link } from "react-router-dom"
import cart from "./../../components/assets/circleWcart.png"
export default class Categories extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: {},
            loading: false,
            category: this.props.category,
            currencyCURRENT:this.props.currency

        }
    }
    async componentDidMount(){
        await this.getDATA(this.state.category) // FETCH PRODUCT LIST FROM API

    }
    async getDATA(el){
        this.setState({loading:true,data:{}})
        const { data } = await new FetchData().fetchCategories(el?.toLowerCase())
        this.setState({data:data, loading:false})
        if(!data){
            console.log("Failed to fetch product list.")
        }
    }
    render(){

        return(
            <div style={{position:"relative",paddingBottom:"15px"}}>
                      {/* {
             this.props.darken &&(
                <div style={{position:"absolute",height:"100%",width:"100%"}}>
                    <div className={styles.darken}/>
                </div>
             )   
            } */}
                {this.state.loading ? 
                        <h4>Loading...</h4>   
                     : <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"}}>
                         {/* <div>{this.state.data?.category?.name}</div> */}
                         {
                             this.state.data?.category?.products.map((el)=>{
                                 const inStock = Boolean(el.inStock)
                                return <Link key={el.gallery[0]} className={styles.productCard} to={`/product?id=${el.id}`} style={inStock ? undefined : {pointerEvents:"none"}}>
                                                <div className={styles.outOfStock} style={inStock ? {display:"none"} : undefined }>
                                                    <p>OUT OF STOCK</p>
                                                </div>
                                            <div style={{height:"444px",margin:"40px",cursor:"pointer",position:"relative"}} className={styles.item}>
                                                    <div style={{width:"max-content",height:"max-content",position:"relative"}}>
                                                        <img src={el.gallery[0]} style={{maxWidth:"400px",height:"270px"}}/>
                                                        <img src={cart} className={styles.cart}/>
                                                    </div>
                                                    
                                                    <div className={styles.info}>
                                                        <p style={{width:"200px",color:"black"}}>{el.name}</p>
                                                        <p style={{fontWeight:"bold" ,color:"black"}}>{getSymbolFromCurrency(this.state?.currencyCURRENT)}{el.prices.filter((el1)=>el1.currency==this.state.currencyCURRENT)[0].amount.toFixed(2)}</p>
                                                    </div>
                                            </div>
                                        </Link>
                              })
                         }
                                    
                        </div>
                }
            </div   >
            
        )
    }
}
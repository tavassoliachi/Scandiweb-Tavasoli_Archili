import { Component } from "react"
import { FetchData } from "../../utils/fetchDATA"
import styles from "./styles.module.css"
import EachProduct from "../../components/EachProduct"
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
            <div className={styles.mainCont}>

                {this.state.loading ? 
                        <h4>Loading...</h4>   
                     : <div className={styles.subCont}>
                         {
                             this.state.data?.category?.products.map((el)=>{
                                return <EachProduct setCart={this.props.setCart} key={el.gallery[0]} el={el} currency={this.state.currencyCURRENT}/>
                              })
                         }
                                    
                        </div>
                }
            </div   >
            
        )
    }
}
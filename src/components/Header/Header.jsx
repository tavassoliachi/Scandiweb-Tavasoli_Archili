import { Component } from "react";
import styles from "./Header.styles.module.css"
import logo from "./assets/logo.png"
import cart from "./assets/cart.png"
import vector from "./assets/Vector.png"
import { FetchData } from "../../utils/fetchDATA";
import getSymbolFromCurrency from 'currency-symbol-map'
import ProductOptions from "../ProductOptions"
import { Link } from "react-router-dom";
export default class Header extends Component{
    
    constructor(props){
        super(props)
        this.state={

            loading:false,
            currencyNames:[],
            categoryList:{},

        }
    }
    async componentDidMount(){
        this.setState({loading:true})
        const {data,error} = await new FetchData().fetchCurrencies()
        this.setState({currencyNames:data,loading:false})
        if(!data){
            console.log("FAILED TO FETCH CURRENCY LIST")
        }
        this.getCategories()
    }
    async getCategories(){
        this.setState({loading:true})
        const {data} = await new FetchData().fetchCategoryNames()
        this.setState({categoryList:data.categories, loading:false})
        if(!data){
            console.log("Failed to fetch category name.")
        }
    }
    handleClick(el){
        this.props.changeCurrency(el)
        this.props.setIsOpen(false)
    }
    async handleCatChange(el){
        this.setState({loading:true,category:el.toUpperCase(),data:{}})
        this.props.changeCategory(el)  
    }

    render(){
        const currencies = this.state.currencyNames?.currencies || []
        if(window.location.pathname == "/cart" && this.props.cartIsOpen){
            this.props.setCartIsOpen(false)
        }
        //--ADDING CATEGORY NAMES IN ARRAY, TO DYNAMICLY RENDER THEM
            const catFetchedList = this.state.categoryList
            const catList = ["all"]
            catFetchedList &&(
                Object.keys(catFetchedList).map((el)=>
                    catList.push(catFetchedList[el].name)
                )
            )
        //-----------------------------------------------------------
        var totalN=0
        return(
            <div className={styles.header}>
            <div className={styles.categories}>
                 {catList.map((el)=>{
                    return <div key={el} onClick={()=>this.handleCatChange(el)} className={this.props.category==el?.toLowerCase() ? styles.activeCategory : styles.category}>{el.toUpperCase()}</div>
                })}
            </div>
                <Link className={styles.logo} to='/categories'>
                    <img src={logo}className={styles.mainButton}/>
                </Link>

            <div className={styles.cart}>
               <span style={{textAlign:"center",fontSize:"20px",cursor:"pointer",paddingBottom:"7px"}} onClick={()=>this.props.setIsOpen(!this.props.isOpen)}>{getSymbolFromCurrency(`${currencies.filter((el)=>el == this.props.currency)}`)}</span>
              
              <div style={this.props.isOpen ? undefined : {display:"none"}} className={styles.currency}>
                  {
                  currencies.map((el)=>{
                    return <div key={el} onClick={()=>this.handleClick(el)} style={{padding:"5px 0"}}>{el}{getSymbolFromCurrency(`${el}`)}</div>
                  })
                  }
              </div>
              <img src={vector} className={styles.vector} style={this.props.isOpen ? {transform:"rotate(180deg)"} : undefined} onClick={()=>this.props.setIsOpen(!this.props.isOpen)}/>
             
             <div className={styles.cartCont} onClick={()=>window.location.pathname!=="/cart" ? this.props.setCartIsOpen(!this.props.cartIsOpen) : ''} >
                <img style={{width:"25px",height:"25px"}} src={cart} />
                <div className={styles.cartLENGTH} style={!this.props.cart.length ? {display:"none"} : undefined}>
                    <p style={{transform:"translateY(-17px)"}}>{this.props.cart.length}</p>
                </div>  
            </div>
            <div className={styles.cartItems} style={this.props.cartIsOpen ? undefined : {display:"none"}} >
                <p className={styles.cartLength}>My Bag, {this.props.cart.length} items</p>
                  {this.props.cart.map((el)=>{
                      return  <div className={styles.item}
                       key={el.id}
                       >
                            <span style={{display:"none"}}>{totalN+=el.prices.filter((el1)=>el1.currency==this.props.currency)[0].amount*el.quantity}</span>
                            <div className={styles.info1}>
                                <h1>{el.brand}</h1> 
                                <h1>{el.name}</h1> 
                                <p>{getSymbolFromCurrency(this.props.currency)}{(el.prices.filter((el1)=>el1.currency==this.props.currency)[0].amount*el.quantity).toFixed(2)}</p>
                                {el.attributes.map((element)=>{
                                  return  <div  key={element.name} >
                                        <p  className={styles.subTitle}>{element.name.toUpperCase()}:</p>
                                        <div className={styles.attribute}>
                                            <ProductOptions data={element} handleSelect={()=>{}} selections={el.options} type="header_cart"/>
                                        </div>
                                    </div>
                                })}
                            </div>

                            <div style={{display:"flex",flexDirection:"row",height:"100%",justifyContent:"center"}}>
                                <div className={styles.quantity}>
                                        <span onClick={()=>this.props.changeQuantity(el.id,+1)}>+</span>
                                        <p>{el.quantity}</p>
                                        <span onClick={()=>this.props.changeQuantity(el.id,-1)}>-</span>
                                </div>
                                <div style={{marginTop:"10px",backgroundImage:`url(${el.gallery[0]})`,width:"150px",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}/>
                            </div>
                        </div>
                  })}
                  <div className={styles.totalPrice}>
                      <p>TOTAL</p>
                      <p>{getSymbolFromCurrency(this.props.currency)}{totalN.toFixed(2)}</p>
                  </div>
                  <div style={{width:"100%",height:"max-content",marginBottom:"25px"}} className={styles.buttons}>
                    <Link to="/cart" onClick={()=>this.props.setCartIsOpen(!this.props.cartIsOpen)} className={styles.viewBAG}>VIEW BAG</Link>
                    <Link to="/cart" onClick={()=>this.props.setCartIsOpen(!this.props.cartIsOpen)} className={styles.checkOUT}>CHECK OUT</Link>
                  </div>
            </div>
            
            </div>
            
          </div>
        )
    }
}
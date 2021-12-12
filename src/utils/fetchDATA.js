import { baseURL } from "./baseURL";
import { Component } from "react";
export class FetchData extends Component{
      async fetchCurrencies(){
        const query = `{currencies}`
        const { data } = await this.callAPI(query) // CALLING THE FUNCTION THAT FETCHES CURRENCY LIST
        return {data}
      }
      async fetchCategoryNames(){
        const query = `{categories { name } }`
        const { data } = await this.callAPI(query) // CALLING THE FUNCTION THAT FETCHES CATEGORY LIST
        return { data }
      }
      async fetchProduct(id){
        const query = `{product(id:"${id}"){   
          id
          name
          gallery
          description
          inStock
          attributes{
            name
            type
            items{
              displayValue
              value
            }
          }
          prices{
            amount
            currency
          }
          brand
          
        }
        }`
        const { data } = await this.callAPI(query) // CALLING THE FUNCTION THAT FETCHES PRODUCT
        return { data }
      }
      async fetchCategories(category){
          const query = `{category(input:{title:"${category === 'all' ? '' : category}"}){
            name
            products {
              id
              gallery
              brand
              name
              inStock
              attributes{
                items{
                  value
                }
              }
              prices{
                currency
                amount
              }
            }
          }}`
          const { data } = await this.callAPI(query) // CALLING THE FUNCTION THAT FETCHES PRODUCT LIST
          return { data }
      }

  async callAPI(query){
    var data = []
    var error = ""

    await fetch(baseURL,
      { 
        method:"POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify({query:query })
      })
      .then(res => res.json())
      .then(res2 => data=res2.data)
      .catch(err => { error="Failed to fetch data" } )
    return {data,error}
}

}
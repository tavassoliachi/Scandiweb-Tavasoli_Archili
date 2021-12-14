import React, { Component } from 'react';
import styles from "./ProductPageImages.styles.module.css"
class ProductPageImages extends Component {
    constructor(){
        super()
        this.state={
            erroredImages:[]
        }
        this.mainImage=[]
        this.sideIMAGES=[]
    }
    makeIMGarray(){
        this.sideIMAGES=[]
        this.mainImage=[]
        this.props.images?.forEach((el,index)=>{
            if(index>0){
               this.sideIMAGES.push(el) 
            }else{
                this.mainImage.push(el)
            }
        })
    }
    mapSideImages(){
        this.makeIMGarray()
        return this.sideIMAGES.map((el,index)=>{return this.renderImages(el,index)})
    }
    renderImages(el,index){
        const imageChange=(e,index)=>{
            const src1 = e.target.src
            const src2 = document.getElementById("mainImage").src
            document.getElementById(index).src = src2
            document.getElementById("mainImage").src = src1
        }
        return <img key={el} alt='' 
        src={el} className={this.state.erroredImages.includes(el) ? styles.hide : ''}
        onError={()=>this.setState({erroredImages:[el,...this.state.erroredImages] }) } 
        onClick={(e)=>imageChange(e,index)} id={index}
   />
    }
    render() {

        return (
            <>
                <div className={styles.sideIMAGES}>
                    {this.mapSideImages()}
                </div>

                <div className={styles.mainImage}>
                    <img src={this.mainImage[0]} id="mainImage" alt=''/>
                </div>
            </>
        );
    }
}

export default ProductPageImages;

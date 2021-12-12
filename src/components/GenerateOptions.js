import React, { Component } from 'react';
import ProductOptions from './ProductOptions';
import styles from "./GenerateOptions.styles.module.css"
class GenerateOptions extends Component {
    render() {
        return (
            <div>
                {this.props.attributes?.map((el)=>{
                return <div  key={el.name+el.brand}>
                            <h4 className={styles.subTitle}>{el.name.toUpperCase()}:</h4>
                            <div className={styles.attribute}>
                                <ProductOptions 
                                key={this.props.selections} 
                                data={el} handleSelect={this.props.handleSelect} selections={this.props.selections || []}/>
                            </div>
                        </div>

                        
                })} 
            </div>
        );
    }
}

export default GenerateOptions;

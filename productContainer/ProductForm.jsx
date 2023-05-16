import { useState} from "react";

const intialValue = {
    prodName: "",
    prodImage: "",
    prodPrice: ""
}

function ProductForm({handleFormSubmit}){
    const [product, setProduct] = useState(intialValue)
    const handleProduct=(e)=>{
        setProduct({...product, [e.target.name]: e.target.value})
        console.log(product)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        handleFormSubmit(product)
        setProduct(intialValue)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label >
                Product Name:
                <input type="text" placeholder="Product Name" onChange={handleProduct} value ={product.prodName} name="prodName"/>
                </label>
                <br /><br />
                <label >
                Product image
                <input type="text" placeholder="Product image" onChange={handleProduct} value={product.prodImage} name='prodImage'/>
                </label>
                <br /><br />
                <label >
                Product Price:
                <input type="number" placeholder="Product Price" onChange={handleProduct} value={product.prodPrice} name='prodPrice'/>
                </label>
                <br /><br />
                <input type="Submit" defaultValue='CREATE PRODUCT'/>
            </form>
        </div>
    )
}

export default ProductForm;
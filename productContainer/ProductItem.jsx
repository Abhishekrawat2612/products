function ProductItem({prodImage, prodName, prodPrice}){
    return (
        <div style={{border: "1px solid grey"}} >
                    <img src={prodImage} alt="productImage" height="200px" width="200px"/>
                    <h3>Title: {prodName}</h3>
                    <h3>Price: {prodPrice}</h3>
                </div>
    )
}

export default ProductItem;

import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductItem from "./ProductItem";



const getData = async (url)=>{

    try{
        const res = await fetch(url)
        const data = await res.json()
        return {
            totalCountVAlue: +res.headers.get(`X-Total-Count`),data
        }
    }
    catch(error){
        console.log(error)
    }

    return fetch(url).then((res)=>{
        console.log(res)
        return res.json()
    })
}

function Product(){
    
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)    
    const [user, setUser] = useState([])
    const [page, setPage] = useState(1)
    const [count , setTotalCount] = useState(0)
//================================================
    const fetchAndUpdateData = async (page)=>{
        setLoading(true)
        try{
            let res = await getData(`http://localhost:8080/products?_page=${page}&_limit=3`)
            const {totalCountVAlue, data} = res
            setUser(data)
            setTotalCount(totalCountVAlue)
            setLoading(false)
        }
        catch(err){
            setErr(true)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAndUpdateData(page)
    }, [page])




    // for submit the data
    const handleFormSubmit=(formData)=>{
        setLoading(true)
        fetch(`http://localhost:8080/products`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((res)=>res.json())
        .then(()=>{
            setLoading(false)
            fetchAndUpdateData(page)
        })
        .catch((err)=> {
            setErr(true)
            setLoading(false)
        })
    }
    console.log("user", user)

    
    
    // /pagination 
    const handleClick= (val)=>{
        setPage(page+val)
    }

    
    return loading ? <h1>...Loading</h1>: err ? <h1>...Something went wrong</h1> : (
        <div>
            <h1>Prodct List with Items</h1>
            <ProductForm handleFormSubmit={handleFormSubmit}/>

            <br />
            <hr />
            <h1>display Produxts</h1>
            <div style = {{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "30px", textAlign: "center"}}>
                {user.map((el)=>(
                <ProductItem key={el.id} {...el}/>
           ))}
            </div>

            {/* pagination */}
            <button disabled={page === 1} onClick={()=>handleClick(-1)}>Prev</button>
            <button disabled >{page}</button>
            <button disabled={page === Math.ceil(count/3)} onClick={()=>handleClick(1)}>Next</button>
        </div>
        
    )
}

export default Product;















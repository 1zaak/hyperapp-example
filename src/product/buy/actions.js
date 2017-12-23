import client from "../../_main/api-client"

export default {
    fetchProduct: productId => async (state, actions) => {  
        actions.toggleFetching(true)         
        actions.setProduct(await client.getItem('product', productId)
            .then(res => {
                actions.toggleFetching(false)  
                return res.data
            })
            .catch(err => {
                actions.toggleFetching(false)  
                console.log('fetchProduct error',err)
            })
        )
    },
    setProduct: product => state => ({ product })
}
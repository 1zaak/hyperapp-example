import client from "../_main/api-client"

export default {
    fetchProducts: query => async (state, actions) => {   
        console.log('fetchProducts')
        actions.toggleFetching(true)
        actions.setProducts(await client.getItems('product')
            .then(res => {
                actions.toggleFetching(false)    
                return res.data
            })
            .catch(err => {
                actions.toggleFetching(false)
                console.log('products error',err)
            })
        )
    },
    setProducts: (products) => state => ({ products })
}
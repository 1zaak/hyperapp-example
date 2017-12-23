import client from "../_main/api-client"

export default {
    fetchAllProducts: query => async (state, actions) => {   
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
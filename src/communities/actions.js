import client from "../_main/api-client"

export default {
    fetchAllProducts: query => async (state, actions) => {   
        actions.setProducts(await client.getItems('product')
            .then(res => {
                return res.data
            })
            .catch(err => console.log('products error',err))
        )
    },
    setProducts: (products) => state => ({ products })
}
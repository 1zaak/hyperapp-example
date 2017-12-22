import client from "../../_main/api-client"

export default {
    fetchProduct: productId => async (state, actions) => {   
        console.log('fetchProduct')
        actions.setProduct(await client.getItem('product', productId)
            .then(res => {
                console.log('fetchProduct res',res)
                return res.data
            })
            .catch(err => console.log('fetchProduct error',err))
        )
    },
    setProduct: product => state => ({ product })
}
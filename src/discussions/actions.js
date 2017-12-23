import client from "../_main/api-client"

export default {
    fetchDiscussions: query => async (state, actions) => {   
        console.log('fetchDiscussions')
        actions.toggleFetching(true)
        actions.setDiscussions(await client.getItems('discussion')
            .then(res => {
                console.log('fetch discussions', res)
                actions.toggleFetching(false)    
                return res.data
            })
            .catch(err => {
                actions.toggleFetching(false)
                console.log('discussions error',err)
            })
        )
    },
    fetchDiscussion: discussionId => async (state, actions) => {  
        actions.toggleFetching(true)         
        actions.setDiscussion(await client.getItem('discussion', discussionId)
            .then(res => {
                console.log('response discussion', res)
                actions.toggleFetching(false)  
                return res.data
            })
            .catch(err => {
                actions.toggleFetching(false)  
                console.log('discussion error',err)
            })
        )
    },
    setDiscussions: discussions => state => ({ discussions })
}
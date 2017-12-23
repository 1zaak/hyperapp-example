import client from "../_main/api-client"

export default {
    fetchDiscussions: () => async (state, actions) => {           
        actions.toggleFetching(true)
        actions.setDiscussions(await client.getItems('discussion')
            .then(res => {                
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
                actions.toggleFetching(false)  
                return res.data
            })
            .catch(err => {
                actions.toggleFetching(false)  
                console.log('discussion error',err)
            })
        )
    },
    setDiscussions: discussions => state => ({ discussions }),
    fetchMessages: discussionId => async (state, actions) => {           
        actions.toggleFetching(true)
        actions.setMessages(await client.getItems('message', {
            'filters[from_discussion]': discussionId
        }).then(res => {                
                actions.toggleFetching(false)   
                console.log('messages',res) 
                return res.data
            })
            .catch(err => {
                actions.toggleFetching(false)
                console.log('messages error',err)
            })
        )
    },
    setMessages: messages => state => ({ messages }),
}
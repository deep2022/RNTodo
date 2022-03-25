const endpoint = {
    gather : 'https://merchantpanel-staging.freecharge.in/api/txn/v1/get/merchant/current/txn/count/and/amount?startDate=1647887400452&endDate=1647949051452'
}
// API ENDPOINT FOR FETCHING DETAILS OF THE USER
export const fetchData = async (user) => {
    const response = await fetch(endpoint.gather,{
        method : 'GET',
        headers : { 
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Content-Length': 57,
            'Acess-Control-Allow-Origin': '*',
            'Accept-Encoding': ['gzip','deflate', 'br'],
            'connection': 'keep-alive',
            'token': user.token,
            'entityId': user.entityId,
            'entityType': user.entityType

        }
    })

    if(!response.ok) throw new Error('Something Went Wrong!!');
    
    const responseData = await response.json()
    return responseData
}
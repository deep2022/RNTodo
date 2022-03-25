const endpoint = {
    login : 'https://merchantpanel-staging.freecharge.in/api/session/v2/login'
}
// API ENDPOINT TO SUCCESSFULLY LOGGING IN THE USER

export const userLogin = async (user) => {
    const response = await fetch(endpoint.login,{
        method : 'POST',
        headers : { 
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Content-Length': 57,
            'Acess-Control-Allow-Origin': '*',
            'Accept-Encoding': ['gzip','deflate', 'br'],
            'Origin': 'https://merchantpanel-staging.freecharge.in',
            'Referer': 'https://merchantpanel-staging.freecharge.in/',
            'connection': 'keep-alive'

        },
        body : JSON.stringify({
            loginName: user.email,
            password: user.password
        })
    })

    if(!response.ok) throw new Error('Something Went Wrong!!');
    
    const responseData = await response.json()
    return responseData
}
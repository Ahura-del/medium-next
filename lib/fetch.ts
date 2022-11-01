
export const getPosts = async ()=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?populate=*`)
    const result = await response.json()
    return result
}

export const getPost = async (id:number)=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}?populate=*`)
    const result = await response.json()
    return result
}

export const getComment = async()=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`)
    const result = await response.json()
    return result
}
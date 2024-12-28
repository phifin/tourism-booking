import http from '~/utils/http'

const baseUrl = 'cloudinary'

export const cloudinaryApi = {
    //   getAllPosts() {
    //     return http.get<PostList>(URLGetAll).then((response) => {
    //       const cloudinarys = response.data
    //       return cloudinarys
    //     })
    //   }
    uploadImage(file: File) {
        const formData = new FormData()
        formData.append('file', file)
        return http.post(`${baseUrl}/uploadImage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
    }
}


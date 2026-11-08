import cloudinary from '../config/cloudinary.js'

 export const uploadImage = (file) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'jewelry-products'
            },
            (error, result) => {
                if (error) return reject(error)
                resolve({image_url: result.secure_url, public_id: result.public_id})
            }
        )

        stream.end(file.buffer)
    })
}

export const deleteImage = (public_id) => {
    return new Promise((resolve, reject) => {

        cloudinary.uploader.destroy(public_id, (error, result) => {
            if (error) return reject(error)
            resolve(result)
        })

    })
}
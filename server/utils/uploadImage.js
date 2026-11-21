import cloudinary from '../config/cloudinary.js'

 export const uploadMedia = (file, resource_type = 'image') => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'jewelry-products',
                resource_type: resource_type
            },
            (error, result) => {
                if (error) return reject(error)
                resolve({url: result.secure_url, public_id: result.public_id})
            }
        )

        stream.end(file.buffer)
    })
}

export const deleteMedia = (public_id, resource_type = 'image') => {
    return new Promise((resolve, reject) => {

        cloudinary.uploader.destroy(public_id, {resource_type}, (error, result) => {
            if (error) return reject(error)
            resolve(result)
        })

    })
}
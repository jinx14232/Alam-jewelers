import cloudinary from '../config/cloudinary.js'

const uploadImage = (file) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'jewelry-products'
            },
            (error, result) => {
                if (error) return reject(error)

                resolve(result.secure_url)
            }
        )

        stream.end(file.buffer)
    })
}

export default uploadImage
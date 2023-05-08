import React, { useState } from 'react'
import { UserAuth } from '../../../components/contexts/AuthContext'

function ImageUploader(props) {

    const { uploadImages, getImages, images, getDownloadURL } = UserAuth();
    const [imageUrl, setImageUrl] = useState('');
    console.log(imageUrl)

    const handleSubmitFile = async (e) => {

       
        uploadImages(e.target.files[0]).then((res) => getDownloadURL(res.ref).then((url) => props.onGetUrl(url)));
        
        // console.log(images)
    }


    return (
        <div>
            <input type="file" name="photo" id="photo-file" onChange={(e) => handleSubmitFile(e)}/>
        </div>
    )
}

export default ImageUploader;
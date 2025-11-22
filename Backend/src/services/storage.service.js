import ImageKit from '@imagekit/nodejs';
import fs from 'fs';


const foodItemImageUpload = async (file, filename) => {
    
    const client = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
    
    const response = await client.files.upload({
      file: file.buffer.toString('base64'),
      fileName: filename,
      folder : "/Foodview/FoodItem"
    });

    return response;

}

const partnerProfileImageUpload = async (file, filename, Id) => {
    
    const client = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });

    if (Id) {
      console.log(Id)
    try {
      await client.files.deleteFile(Id);
      console.log("Old image deleted");
    } catch (err) {
      console.log("Delete error:", err);
    }
  }
    
    const response = await client.files.upload({
      file: file.buffer.toString('base64'),
      fileName: filename,
      folder : "/Foodview/PartnerProfileImage",
    });

    return response;

}

export {foodItemImageUpload, partnerProfileImageUpload}
import axios from 'axios';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'rowshanara');

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/drbtvputr/image/upload`, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    toast.error('Failed to upload image');
    return null;
  }
};

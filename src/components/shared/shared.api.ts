import axios from '../../shared/config/axios-interceptor';
import { IUploadResponse } from '../../shared/models/upload.model';

// export const uploadImage = async (image: File) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', image);
//     const { data }: AxiosResponse<{ url: string }> = await axios.post(`files`, formData);
//     return data.url;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// interface IImage {
//   url: string;
// }

// export const uploadPrivateImage = async (image: File) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', image);
//     const { data }: AxiosResponse<IImage> = await axios.post(`files/private`, formData);
//     return data.url;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

export const uploadImage = async (image: string, name: string) => {
  try {
    const prefixApi = `attmnt?repositoryId=1002&mimeType=Text`;
    const data = `--zzzzz\r\nContent-Disposition: form-data; name="payload"\r\nContent-Type: application/xml; CHARACTERSET=UTF-8\r\n\r\n<attmnt>\r\n  <repository id="1002"></repository>\r\n  <orig_file_name>${name}.text</orig_file_name>\r\n  <attmnt_name>${name}.text</attmnt_name>\r\n <description>Upload using REST</description>\r\n</attmnt>\r\n\r\n--zzzzz\r\nContent-Disposition: form-data; name="${name}.text"\r\nContent-Type: application/octet-stream\r\nContent-Transfer-Encoding: binary\r\n\r\n${image}\r\n\r\n--zzzzz--`;
    const headers = {
      'Content-Type': 'multipart/form-data; BOUNDARY=zzzzz',
    };
    const response = await axios.post<IUploadResponse>(`${prefixApi}`, `${data}`, { headers });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

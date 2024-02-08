// import { PutBlobResult } from "@vercel/blob";

// export const uploadImage = async ({ file, url }: { file: File; url?: string }): Promise<string> => {    
  
//   if(url){
//     const deleteImg = await fetch(
//           `/api/images`,
//           {
//             method: 'DELETE',
//             body: JSON.stringify({
//               url,
//             }),
//           }
//         );
//   }

//   let imgUrl = '';
//   const response = await fetch(
//       `/api/upload?filename=${file.name}`,
//     {
//       method: 'POST',
//       body: file,
//     }
//   );
  
//   const newBlob = await response.json();
//   const putBlobResult = newBlob as PutBlobResult;
//   imgUrl = putBlobResult.url;

//   return imgUrl;
// }
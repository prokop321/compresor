// src/index.ts
var resizeImage = async (image, maxDimension, quality, format) => {
  let img = document.createElement("img");
  img.src = URL.createObjectURL(image);
  await new Promise((resolve, reject) => {
    img.onload = () => {
      resolve();
    };
  });
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let width = img.width;
  let height = img.height;
  let scale = 1;
  if (img.width > maxDimension || img.height > maxDimension) {
    scale = maxDimension / Math.max(width, height);
  }
  width *= scale;
  height *= scale;
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  let dataURI = canvas.toDataURL("image/" + format, quality);
  return await dataURItoBlob(dataURI, image.name);
};
var dataURItoBlob = async (dataURI, fileName) => {
  let byteString = atob(dataURI.split(",")[1]);
  let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  let blob = new Blob([ab], { type: mimeString });
  return new File([blob], fileName, { type: mimeString });
};
export {
  resizeImage
};

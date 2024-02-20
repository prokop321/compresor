export const compressImage = async (
  image: File,
  maxDimension: number,
  quality: number = 0.7,
  format: "webp" | "jpeg" | "png" = "jpeg"
) => {
  if (quality < 0 || quality > 1) {
    console.log(
      "Invalid quality value of compression. range is 0 to 1. Defaulting value 0.7"
    );
    quality = 0.7;
  }

  let img = document.createElement("img");
  img.src = URL.createObjectURL(image);
  await new Promise((resolve: Function, reject) => {
    img.onload = () => {
      resolve();
    };
  });

  let width = img.width;
  let height = img.height;
  let scale = 1;

  if (img.width > maxDimension || img.height > maxDimension) {
    scale = maxDimension / Math.max(width, height);
  }

  width *= scale;
  height *= scale;

  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx: any = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  let dataURI = canvas.toDataURL("image/" + format, quality);
  return await dataURItoBlob(dataURI, image.name);
};

const dataURItoBlob = async (dataURI: string, fileName: string) => {
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

export const compressImage = async (image: File, maxDimension: number, quality: number = 0.7, format: "webp" | "jpeg" | "png" = "jpeg"): Promise<null | File> => {
  try {
    if (quality < 0 || quality > 1) {
      console.warn("Invalid quality value of compression. range is 0 to 1. Defaulting value 0.7");
      quality = 0.7;
    }

    const fileName = image.name;
    const lastDot = fileName.lastIndexOf(".");
    const ext = fileName.substring(lastDot + 1);

    let imgSrc: string;

    if (ext === "heic" || ext === "HEIC" || ext === "heif" || ext === "HEIF") {
      const heic2any = (await import("heic2any")).default;
      const convertedBlob = await heic2any({
        blob: image,
        quality: 1,
        toType: "image/jpeg",
      });
      imgSrc = URL.createObjectURL(convertedBlob as Blob);
    } else {
      imgSrc = URL.createObjectURL(image);
    }

    let img = document.createElement("img");
    img.src = imgSrc;

    await new Promise((resolve: Function, reject) => {
      img.onload = () => {
        resolve();
      };
      img.onerror = (e) => {
        reject(e);
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
  } catch (e) {
    return null;
  }
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

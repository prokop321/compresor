"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  compressImage: () => compressImage
});
module.exports = __toCommonJS(src_exports);
var compressImage = async (image, maxDimension, quality = 0.7, format = "jpeg") => {
  if (quality < 0 || quality > 1) {
    console.log(
      "Invalid quality value of compression. range is 0 to 1. Defaulting value 0.7"
    );
    quality = 0.7;
  }
  let img = document.createElement("img");
  img.src = URL.createObjectURL(image);
  await new Promise((resolve, reject) => {
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
  let ctx = canvas.getContext("2d");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compressImage
});

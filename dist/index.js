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
  resizeImage: () => resizeImage
});
module.exports = __toCommonJS(src_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resizeImage
});

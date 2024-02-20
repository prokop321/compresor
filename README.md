# Image Compression Function

## `compressImage(image: File, maxDimension: number, quality: number = 0.7, format: "webp" | "jpeg" | "png" = "jpeg")`

This function compresses an image to a specified maximum dimension and quality. It also allows you to specify the format of the compressed image.

### Parameters

- `image`: The image file to be compressed.
- `maxDimension`: The maximum dimension (width or height) for the compressed image.
- `quality`: The quality of the compressed image. It should be a number between 0 and 1. Default is 0.7.
- `format`: The format of the compressed image. It can be "webp", "jpeg", or "png". Default is "jpeg".

### Returns

This function returns a Promise that resolves to a `File` object representing the compressed image.

### Example

```ts
const compressedImage = await compressImage(imageFile, 800, 0.8, "jpeg");
```

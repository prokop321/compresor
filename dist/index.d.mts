declare const compressImage: (image: File, maxDimension: number, quality?: number, format?: "webp" | "jpeg" | "png") => Promise<File>;

export { compressImage };

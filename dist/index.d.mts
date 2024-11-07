declare const compressImage: (image: File, maxDimension: number, quality?: number, format?: "webp" | "jpeg" | "png") => Promise<null | File>;

export { compressImage };

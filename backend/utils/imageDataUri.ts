// Cloudinary's upload() treats any string that isn't a URL or a base64 data URI
// as a file path on this server and uploads that file. Only ever pass it a
// string that passed this check.
const IMAGE_DATA_URI =
    /^data:(image\/(jpeg|jpg|png|gif|webp|heic|heif|avif|bmp)|application\/octet-stream);base64,/i;

export const isImageDataUri = (value: unknown): value is string =>
    typeof value === 'string' && IMAGE_DATA_URI.test(value);

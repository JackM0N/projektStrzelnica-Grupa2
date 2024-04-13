
// Function for checking if the supplied url is a valid image
export function isImageValid(url: string): boolean {
    return (url != null && url != '' && /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url));
}

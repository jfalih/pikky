/**
 * Resizes Picsum Photos image URLs to specified dimensions with WebP format
 * @param url - The original Picsum Photos URL
 * @param imageWidth - Desired image width
 * @param imageHeight - Desired image height
 * @returns Resized image URL with WebP format
 */
export const resizePicsumImage = (
  url: string,
  imageWidth: number,
  imageHeight: number,
): string => {
  // Handle Picsum Photos URLs: https://picsum.photos/id/{id}/{width}/{height}
  const picsumMatch = url.match(/\/picsum\.photos\/id\/(\d+)\/\d+\/\d+/);
  const photoId = picsumMatch?.[1];
  
  if (!photoId) {
    // Return original URL if pattern doesn't match
    return url;
  }
  
  return `https://picsum.photos/id/${photoId}/${imageWidth}/${imageHeight}.webp`;
};


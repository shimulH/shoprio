export const isValidImage = (file: File | null): boolean => {
  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/avif",
    "image/webp",
  ];
  if (!file) return false;
  return validTypes.includes(file.type);
};

// Function to convert any image to WebP
export const convertImageToWebP = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0, img.width, img.height);

        // Convert to WebP
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpFile = new File(
                [blob],
                file.name.replace(/\.[^.]+$/, ".webp"),
                { type: "image/webp" }
              );
              resolve(webpFile);
            } else {
              reject(new Error("Failed to convert image to WebP"));
            }
          },
          "image/webp",
          0.8 // Compression quality (0 to 1)
        );
      };
    };

    reader.onerror = (error) => reject(error);
  });
};

// Function to check if the image URL is valid for fallback
export const isValidImageUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return /\.(jpeg|jpg|gif|png|webp|svg|avif)$/.test(parsedUrl.pathname);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return false;
  }
};

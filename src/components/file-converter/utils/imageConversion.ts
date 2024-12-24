export const convertImageFile = async (
  file: File,
  setProgress: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const base64Data = e.target?.result as string;
        
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setProgress(i);
        }
        
        const img = new Image();
        img.src = base64Data;
        
        await new Promise((resolve) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Could not get canvas context');
            
            ctx.drawImage(img, 0, 0);
            
            const newFormat = file.type === 'image/png' ? 'image/jpeg' : 'image/png';
            const convertedDataUrl = canvas.toDataURL(newFormat, 0.8);
            
            resolve(convertedDataUrl);
          };
        });
        
        resolve(img.src);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsDataURL(file);
  });
};
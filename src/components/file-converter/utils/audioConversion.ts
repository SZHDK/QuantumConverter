import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export const convertMediaFile = async (
  inputFile: File,
  setProgress: (progress: number) => void
): Promise<string> => {
  console.log('Starting audio conversion...', { 
    fileType: inputFile.type, 
    fileSize: inputFile.size,
    fileName: inputFile.name 
  });
  
  const ffmpeg = new FFmpeg();
  
  try {
    console.log('Loading FFmpeg...');
    if (!ffmpeg.loaded) {
      console.log('FFmpeg not loaded, initializing...');
      await ffmpeg.load({
        coreURL: await toBlobURL('/ffmpeg-core.js', 'text/javascript'),
        wasmURL: await toBlobURL('/ffmpeg-core.wasm', 'application/wasm'),
        workerURL: await toBlobURL('/ffmpeg-worker.js', 'text/javascript'),
      });
    }
    console.log('FFmpeg loaded successfully');

    const inputData = await fetchFile(inputFile);
    console.log('Input file fetched successfully', { dataSize: inputData.byteLength });
    
    const inputFileName = 'input' + (inputFile.type === 'video/mp4' ? '.mp4' : '.mp3');
    const outputFileName = 'output' + (inputFile.type === 'video/mp4' ? '.mp3' : '.mp4');

    console.log('Writing input file:', inputFileName);
    await ffmpeg.writeFile(inputFileName, inputData);
    console.log('Input file written successfully');

    ffmpeg.on('progress', ({ progress }) => {
      console.log('Conversion progress:', progress * 100, '%');
      setProgress(Math.round(progress * 100));
    });

    console.log('Starting conversion process...', {
      from: inputFileName,
      to: outputFileName,
      command: inputFile.type === 'video/mp4' ? 
        '-i input.mp4 -vn -acodec libmp3lame output.mp3' :
        '-f lavfi -i color=c=black:s=1280x720 -i input.mp3 -shortest output.mp4'
    });

    if (inputFile.type === 'video/mp4') {
      await ffmpeg.exec([
        '-i', inputFileName,
        '-vn',
        '-acodec', 'libmp3lame',
        outputFileName
      ]);
    } else {
      await ffmpeg.exec([
        '-f', 'lavfi',
        '-i', 'color=c=black:s=1280x720',
        '-i', inputFileName,
        '-shortest',
        outputFileName
      ]);
    }
    console.log('Conversion completed successfully');

    const outputData = await ffmpeg.readFile(outputFileName);
    console.log('Output file read successfully', { outputSize: outputData.byteLength });
    
    const outputBlob = new Blob([outputData], { 
      type: inputFile.type === 'video/mp4' ? 'audio/mpeg' : 'video/mp4' 
    });
    
    console.log('Created output blob:', {
      type: outputBlob.type,
      size: outputBlob.size
    });
    
    const url = URL.createObjectURL(outputBlob);
    console.log('Created object URL for output:', url);
    
    return url;
  } catch (error) {
    console.error('FFmpeg error:', error);
    throw new Error('Failed to convert file: ' + (error as Error).message);
  }
};
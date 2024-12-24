import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export const convertMediaFile = async (
  inputFile: File,
  setProgress: (progress: number) => void
): Promise<string> => {
  const ffmpeg = new FFmpeg();
  
  try {
    if (!ffmpeg.loaded) {
      await ffmpeg.load({
        coreURL: await toBlobURL('/ffmpeg-core.js', 'text/javascript'),
        wasmURL: await toBlobURL('/ffmpeg-core.wasm', 'application/wasm'),
        workerURL: await toBlobURL('/ffmpeg-worker.js', 'text/javascript'),
      });
    }

    const inputData = await fetchFile(inputFile);
    const inputFileName = 'input' + (inputFile.type === 'video/mp4' ? '.mp4' : '.mp3');
    const outputFileName = 'output' + (inputFile.type === 'video/mp4' ? '.mp3' : '.mp4');

    await ffmpeg.writeFile(inputFileName, inputData);

    ffmpeg.on('progress', ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });

    if (inputFile.type === 'video/mp4') {
      await ffmpeg.exec([
        '-i', inputFileName,
        '-vn',
        '-acodec', 'libmp3lame',
        '-q:a', '2',
        outputFileName
      ]);
    } else if (inputFile.type === 'audio/mpeg') {
      await ffmpeg.exec([
        '-i', inputFileName,
        '-f', 'lavfi',
        '-i', 'color=c=black:s=1280x720',
        '-shortest',
        '-acodec', 'copy',
        outputFileName
      ]);
    }

    const outputData = await ffmpeg.readFile(outputFileName);
    const outputBlob = new Blob([outputData], { 
      type: inputFile.type === 'video/mp4' ? 'audio/mpeg' : 'video/mp4' 
    });
    
    return URL.createObjectURL(outputBlob);
  } catch (error) {
    console.error('FFmpeg error:', error);
    throw new Error('Failed to convert audio file');
  }
};
import Resizer from 'react-image-file-resizer';

const resizeFile = (file: any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1920,
      1080,
      'JPEG',
      65,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
    );
  });

const resizeFiles = (files: any) => {
  let uris: any = [];
  if (files !== []) {
    for (let i = 0; i < files.length; i++) {
      Resizer.imageFileResizer(
        files[i],
        1920,
        1080,
        'JPEG',
        65,
        0,
        (uri) => {
          uris.push(uri);
        },
        'file',
      );
    }
    return uris;
  } else return [];
};

export { resizeFile, resizeFiles };

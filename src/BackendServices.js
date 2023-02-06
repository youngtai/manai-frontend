import JSZip from "jszip";

const jsZip = new JSZip();

// const ROOT = 'http://192.168.86.28:5000';
const ROOT = 'http://localhost:5000';

const zippedFiles = (files) => {
  if (!files || files.length === 0) {
    return null;
  }
  const zipped = jsZip.file(files[0].name, files[0]);
  for (let i = 1; i < files.length; i++) {
    zipped.file(files[i].name, files[i]);
  }
  return zipped;
}

class Service {
  async uploadFiles(files) {
    const zipFile = await zippedFiles(files).generateAsync({type: 'blob'});
    const data = new FormData();
    data.append('images', zipFile, 'zipped-images.zip');
    return fetch(`${ROOT}/file-upload`, {method: 'POST', body: data})
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          const errorMessage = `Error uploading images`;
          return Promise.reject(errorMessage);
        }
      });
  }

  async startTraining() {
    return fetch(`${ROOT}/training`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          const errorMessage = `Error starting training`;
          return Promise.reject(errorMessage);
        }
      });
  }

  async doInference(text_prompt, params) {    
    const queryParams = Object.keys(params)
      .map(key => params[key] ? `${key}=${params[key]}` : null)
      .filter(e => e)
      .join('&');
    
    return fetch(`${ROOT}/inference?${queryParams}`, {method: 'POST', body: text_prompt})
      .then(response => {
        if (response.ok) {
          return response.arrayBuffer();
        } else {
          const errorMessage = `Error running inference`;
          return Promise.reject(errorMessage);
        }
      })
      .then(buf => new JSZip().loadAsync(buf))
      .then(zip => {
        const imageBlobs = [];
        const imageDetails = [];
        zip.forEach((filename, file) => {
          if (filename.endsWith('.png')) {
            file.async('blob').then(blob => imageBlobs.push(blob));
          } else if (filename.endsWith('.json')) {
            file.async('text').then(detailsString => imageDetails.push(JSON.parse(detailsString)));
          }
        });
        return {imageBlobs, imageDetails};
      });
  }
}

export default Service;

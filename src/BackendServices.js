import JSZip from "jszip";

const ROOT = 'http://localhost:5000';
const jsZip = new JSZip();

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
          const errorMessage = `Error starting traing`;
          return Promise.reject(errorMessage);
        }
      });
  }

  async doInference() {
    return fetch(`${ROOT}/inference`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          const errorMessage = `Erroring running inference`;
          return Promise.reject(errorMessage);
        }
      });
  }
}

export default Service;

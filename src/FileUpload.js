import React from 'react';
import { FormControl, Input } from '@mui/material';

function FileUpload({
                      onChange,
                      onError = (msg => console.error(msg)),
                      allowedExtensions = ['.txt'],
                      maxNumFiles = 1
                    }) {

  const uploadRef = React.useRef(null);

  function handleFileChange() {
    const rawFiles = uploadRef.current.files;
    const keys = Object.keys(rawFiles);
    const files = keys.map(k => rawFiles[k]);

    if (files.length > maxNumFiles) {
      uploadRef.current.value = null; // Clear selected images
      onError("Exceeded maximum number of files to upload! (" + maxNumFiles + ")");
    }
    else {
      onChange(files);
    }
  }

  return (
    <div>
      <FormControl variant="outlined">
        <Input
          inputRef={uploadRef}
          type="file"
          onChange={handleFileChange}
          inputProps={{multiple: true, accept: allowedExtensions.join(',')}}>
        </Input>
      </FormControl>
    </div>
  );
}

export default FileUpload;

import PropTypes from 'prop-types';
// @mui
import React, { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';

import ImgCropDialog from './ImgCropDialog';

// ----------------------------------------------------------------------
ImgDropzone.propTypes = {
  children: PropTypes.node,
  accept: PropTypes.string,
  afterCrop: PropTypes.func,
  aspectRatio: PropTypes.number,
  lockAspectRatio: PropTypes.bool,
};

export default function ImgDropzone({ children, accept, afterCrop, aspectRatio, lockAspectRatio = true }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const onDrop = useCallback(([file]) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setOpen(true);
    };
    reader.readAsDataURL(file);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles: 1,
    maxSize: 4000000,
    minSize: 0,
    onDrop,
  });

  return (
    <>
      <Box {...getRootProps()} data-testid="img-dropzone-parent">
        <input {...getInputProps()} id="img-input" />
        {children}
      </Box>
      <ImgCropDialog
        open={open}
        DialogClose={() => {
          setOpen(false);
        }}
        image={image}
        afterCrop={afterCrop}
        aspectRatio={aspectRatio}
        lockAspectRatio={lockAspectRatio}
      />
    </>
  );
}

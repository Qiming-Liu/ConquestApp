import PropTypes from 'prop-types';
// @mui
import React, { useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ImageCropper from './ImgCropper';

// ----------------------------------------------------------------------
ImgCropDialog.propTypes = {
  open: PropTypes.bool,
  DialogClose: PropTypes.func,
  image: PropTypes.string,
  afterCrop: PropTypes.func,
  aspectRatio: PropTypes.number,
  lockAspectRatio: PropTypes.bool,
};

export default function ImgCropDialog({ open, DialogClose, image, afterCrop, aspectRatio, lockAspectRatio }) {
  const ImgCropRef = useRef();

  const handleSave = () => {
    DialogClose();
    afterCrop(ImgCropRef.current.getCropData());
  };
  return (
    <Dialog open={open} onClose={DialogClose}>
      <DialogTitle>Crop your picture</DialogTitle>
      <DialogContent>
        <ImageCropper aspectRatio={aspectRatio} src={image} lockAspectRatio={lockAspectRatio} ref={ImgCropRef} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

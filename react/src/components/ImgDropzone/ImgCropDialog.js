import React, { useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ImageCropper from './ImgCropper';

// eslint-disable-next-line react/prop-types
const ImgCropDialog = ({ open, DialogClose, img, afterCrop, aspectRatio, lockAspectRatio }) => {
  const ImgCropRef = useRef();
  return (
    <Dialog open={open} onClose={DialogClose}>
      <DialogTitle>Crop your picture</DialogTitle>
      <DialogContent>
        <ImageCropper aspectRatio={aspectRatio} src={img} lockAspectRatio={lockAspectRatio} ref={ImgCropRef} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            DialogClose();
            if (ImgCropRef.current) {
              afterCrop(ImgCropRef.current.getCropData());
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImgCropDialog;

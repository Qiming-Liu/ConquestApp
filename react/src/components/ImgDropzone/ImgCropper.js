import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

// eslint-disable-next-line react/display-name
const ImgCropper = forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { aspectRatio, lockAspectRatio, src } = props;
  const cropperRef = useRef();
  const [cropper, setCropper] = useState();

  useImperativeHandle(ref, () => ({
    getCropData: () => {
      try {
        return cropper.getCroppedCanvas().toDataURL();
      } catch (e) {
        return '';
      }
    },
  }));

  return lockAspectRatio ? (
    <Cropper
      src={src}
      style={{ height: 400, width: '100%' }}
      initialAspectRatio={aspectRatio}
      aspectRatio={aspectRatio}
      background
      autoCropArea={1}
      guides
      ref={cropperRef}
      scalable={false}
      movable={false}
      zoomable={false}
      zoomOnTouch={false}
      onInitialized={(instance) => {
        setCropper(instance);
      }}
    />
  ) : (
    <Cropper
      src={src}
      style={{ height: 400, width: '100%' }}
      background
      autoCropArea={1}
      guides
      ref={cropperRef}
      scalable={false}
      movable={false}
      zoomable={false}
      zoomOnTouch={false}
      onInitialized={(instance) => {
        setCropper(instance);
      }}
    />
  );
});

export default ImgCropper;

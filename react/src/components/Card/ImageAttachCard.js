// @mui
import React, { useState } from 'react';
import { Box, Card, CardHeader, CardContent, TextField, Typography, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// components
import ImgDropzone from '../ImgDropzone';
import Iconify from '../../theme/component/Iconify';

// form
import { useFormik } from 'formik';
import * as Yup from 'yup';
import hotToast from '../../utils/hotToast';

// services
import { addDocument, addDocumentBody, uploadBlob } from '../../services/Document';

// ----------------------------------------------------------------------

export default function ImageAttachCard() {
  const [image, setImage] = useState(undefined);
  const [imageBlob, setImageBlob] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  const handleCropImg = async (base64) => {
    setImage(base64);
    const file = await (await fetch(base64)).blob();
    setImageBlob(file);
  };

  const formik = useFormik({
    initialValues: {
      RequestID: '67',
    },
    validationSchema: Yup.object({
      RequestID: Yup.number().required('Request ID is required'),
    }),
    onSubmit: (values) => {
      if (!imageBlob) {
        hotToast('error', 'Please select an image');
        return;
      }
      setLoading(true);

      const FileName = `${values.RequestID}_${Date.now()}.png`;
      const DocumentDescription = FileName;
      const ContentType = 'image/png';

      // get upload url
      addDocument(addDocumentBody(FileName, DocumentDescription, ContentType, values.RequestID))
        .then((response) => {
          console.log(response);
          // upload via url
          // It's UploadUri here not UploadUrl
          uploadBlob(response.data.UploadUri, response.data.UploadMethod, ContentType, imageBlob).then((response) => {
            setLoading(false);
            console.log(response);
            hotToast('success', `Attach Successed!`);
          });
        })
        .catch((error) => {
          setLoading(false);
          hotToast('error', `Something wrong: ${error.message}`);
        });
    },
  });

  return (
    <Grid item xs={12} md={12} lg={6}>
      <Card>
        <CardHeader title={'Image Attach'} />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              error={Boolean(formik.touched.RequestID && formik.errors.RequestID)}
              fullWidth
              helperText={formik.touched.RequestID && formik.errors.RequestID}
              label="Request ID"
              margin="normal"
              name="RequestID"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.RequestID}
              variant="outlined"
            />
            {image && (
              <Box sx={{ m: 2 }}>
                <img src={image} />
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <ImgDropzone accept="image/png" afterCrop={handleCropImg} lockAspectRatio={false}>
                <Box
                  sx={{
                    alignItems: 'center',
                    border: 1,
                    borderRadius: 1,
                    borderStyle: 'dashed',
                    borderColor: 'divider',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    outline: 'none',
                    p: 4.5,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      cursor: 'pointer',
                      opacity: 0.5,
                    },
                  }}
                >
                  <Iconify icon="carbon:cloud-upload" width={100} height={80} />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Upload Image</Typography>
                  </Box>
                </Box>
              </ImgDropzone>
            </Box>
            <Grid sx={{ py: 2 }}>
              <LoadingButton
                loading={isLoading}
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Attach
              </LoadingButton>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}

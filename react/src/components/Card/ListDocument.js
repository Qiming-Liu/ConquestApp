/* eslint-disable no-unused-vars */
// @mui
import React, { useState } from 'react';
import { Box, Card, CardHeader, CardContent, TextField, Typography, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// form
import { useFormik } from 'formik';
import * as Yup from 'yup';
import hotToast from '../../utils/hotToast';

// services
import {
  getDocumentList,
  getDocumentListBody,
  getDocumentThumbnail,
  getDocumentThumbnailBody,
} from '../../services/Document';

// ----------------------------------------------------------------------

export default function ListDocument() {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      RequestID: '67',
    },
    validationSchema: Yup.object({
      RequestID: Yup.number().required('Request ID is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      getDocumentList(getDocumentListBody(values.RequestID))
        .then((response) => {
          setLoading(false);
          setImageList([]);

          const DocumentList = response.data.documents;
          DocumentList.forEach((document, index) => {
            getDocumentThumbnail(getDocumentThumbnailBody(values.RequestID, document.DocumentID))
              .then((response) => {
                setImageList((oldArray) => [
                  ...oldArray,
                  {
                    DocumentID: DocumentList[index].DocumentID,
                    DocumentDescription: DocumentList[index].DocumentDescription,
                    Link: response.data.Link,
                  },
                ]);
              })
              .catch((error) => {
                // console.log(['the error',error]);
                if (error.response.data.code === 3) {
                  setImageList((oldArray) => [
                    ...oldArray,
                    {
                      DocumentID: DocumentList[index].DocumentID,
                      DocumentDescription: DocumentList[index].DocumentDescription,
                      Link: '',
                    },
                  ]);
                } else {
                  hotToast('error', `Something wrong: ${error.message}`);
                }
              });
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
        <CardHeader title={'List Documents'} />
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

            <Grid sx={{ py: 2 }}>
              <LoadingButton
                loading={isLoading}
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                List
              </LoadingButton>
            </Grid>
          </form>
        </CardContent>
      </Card>
      {imageList.length > 0 ? (
        <>
          {imageList.map((image) => (
            <Card key={image.Link} sx={{ mt: 2 }}>
              <CardHeader title={`${image.DocumentID}: ${image.DocumentDescription}`} />
              <CardContent>
                <img src={image.Link} alt="image" height={200} />
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <Typography variant="h4" sx={{ mt: 3 }}>
          No Document
        </Typography>
      )}
    </Grid>
  );
}

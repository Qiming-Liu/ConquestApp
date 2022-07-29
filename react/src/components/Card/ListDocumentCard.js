// @mui
import React, { useState } from 'react';
import { Button, Zoom, Card, CardHeader, CardContent, TextField, Typography, Grid, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// form
import { useFormik } from 'formik';
import * as Yup from 'yup';
import hotToast from '../../utils/hotToast';

// services
import {
  removeDocument,
  getDocumentList,
  getDocumentListBody,
  getDocumentThumbnail,
  getDocumentThumbnailBody,
} from '../../services/Document';

// ----------------------------------------------------------------------

export default function ListDocumentCard() {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [did, setDid] = useState(false);

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
          if (!DocumentList) {
            setDid(true);
          } else {
            DocumentList.forEach((document, index) => {
              getDocumentThumbnail(getDocumentThumbnailBody(values.RequestID, document.DocumentID))
                .then((response) => {
                  setImageList((oldArray) => [
                    ...oldArray,
                    {
                      RequestID: values.RequestID,
                      Document: DocumentList[index],
                      Link: response.data.Link,
                    },
                  ]);
                  setDid(true);
                })
                .catch((error) => {
                  if (error.response.data && error.response.data.code === 3) {
                    setImageList((oldArray) => [
                      ...oldArray,
                      {
                        RequestID: values.RequestID,
                        Document: DocumentList[index],
                        Link: '',
                      },
                    ]);
                  } else {
                    hotToast('error', `Something wrong: ${error.message}`);
                    localStorage.setItem('listDocument', error.message);
                  }
                  setDid(true);
                });
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          hotToast('error', `Something wrong: ${error.message}`);
          localStorage.setItem('listDocument', error.message);
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
      {did && (
        <div data-testid="image-list">
          <Divider sx={{ mt: 3 }} />
          {imageList.length > 0 ? (
            <>
              {[]
                .concat(imageList)
                .sort((a, b) => a.Document.Order - b.Document.Order)
                .map((image) => (
                  <Zoom in key={image.Document.DocumentID}>
                    <Card key={image.Link} sx={{ mt: 2 }}>
                      <CardHeader title={image.Document.DocumentDescription} />
                      <CardContent>
                        <img
                          alt={image.Document.DocumentID}
                          src={image.Link}
                          style={{
                            display: 'block',
                            margin: '0 auto',
                            maxWidth: '100%',
                            maxHeight: '100%',
                          }}
                        />
                        <Typography variant="subtitle2" sx={{ mt: 3 }}>
                          Order: {image.Document.Order}
                        </Typography>
                        <Typography variant="subtitle2">DocumentID: {image.Document.DocumentID}</Typography>
                        <Typography variant="subtitle2">CreatedBy: {image.Document.CreatedBy}</Typography>
                        <Button
                          sx={{ mt: 3 }}
                          color="primary"
                          fullWidth
                          size="large"
                          variant="contained"
                          onClick={() => {
                            removeDocument(image.RequestID, image.Document.DocumentID)
                              .then(() => {
                                hotToast('success', 'Document removed');
                                setImageList((oldArray) =>
                                  oldArray.filter((item) => item.Document.DocumentID !== image.Document.DocumentID)
                                );
                                localStorage.setItem('listDocument', [image.RequestID, image.Document.DocumentID]);
                              })
                              .catch((error) => {
                                hotToast('error', `Something wrong: ${error.message}`);
                                localStorage.setItem('listDocument', error.message);
                              });
                          }}
                        >
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  </Zoom>
                ))}
            </>
          ) : (
            <Typography variant="h6" sx={{ mx: 2, mt: 3, textAlign: 'center' }}>
              No Documents.
            </Typography>
          )}
        </div>
      )}
    </Grid>
  );
}

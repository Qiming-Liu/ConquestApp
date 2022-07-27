// @mui
import React, { useState } from 'react';
import { Button, Card, CardHeader, CardContent, TextField, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// components
import ImgDropzone from '../ImgDropzone';
import Iconify from '../Iconify';

// form
import { useFormik } from 'formik';
import * as Yup from 'yup';
import hotToast from '../../utils/hotToast';

// services
import { createRequestBody, createRequest } from '../../services/Request';

// ----------------------------------------------------------------------

const handleCropImg = async () => {
  // setCurrentProfileImg(base64);
  // const file = await (await fetch(base64)).blob();
  // const { data: img } = await upload(file).catch((error) => {
  //   hotToast('error', `Something wrong: ${error}`);
  // });
};

export default function ImageAttachCard() {
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      RequestDetail: 'Request from my app',
      RequestorName: 'Alan Liu',
      OrganisationUnitID: 13,
    },
    validationSchema: Yup.object({
      RequestDetail: Yup.string().required('Request Detail is required'),
      RequestorName: Yup.string().required('Requestor Name is required'),
      OrganisationUnitID: Yup.number().max(2, 'Must be 1 or 2 digits long').required('OrganisationUnitID is required'),
    }),
    onSubmit: (values) => {
      const { RequestDetail, RequestorName, OrganisationUnitID } = values;
      setLoading(true);
      createRequest(createRequestBody(RequestDetail, RequestorName, OrganisationUnitID))
        .then((response) => {
          setLoading(false);
          hotToast('success', `Login Success: ${response.data.message}`);
        })
        .catch((error) => {
          setLoading(false);
          hotToast('error', `Something wrong: ${error}`);
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
              error={Boolean(formik.touched.RequestDetail && formik.errors.RequestDetail)}
              fullWidth
              helperText={formik.touched.RequestDetail && formik.errors.RequestDetail}
              label="Request Detail"
              margin="normal"
              name="RequestDetail"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="string"
              value={formik.values.RequestDetail}
              variant="outlined"
            />
            <ImgDropzone accept="image/jpg,image/png, image/jpeg" afterCrop={handleCropImg} aspectRatio={2.5}>
              <Button
                startIcon={<Iconify icon="eva:menu-2-fill" />}
                sx={{
                  backgroundColor: '#3e3e3f',
                  bottom: {
                    lg: 24,
                    xs: 'auto',
                  },
                  color: 'common.white',
                  position: 'absolute',
                  right: 24,
                  top: {
                    lg: 'auto',
                    xs: 24,
                  },
                  visibility: 'hidden',
                  '&:hover': {
                    backgroundColor: '#3e3e3f',
                  },
                }}
                variant="contained"
              >
                Change Cover
              </Button>
            </ImgDropzone>
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

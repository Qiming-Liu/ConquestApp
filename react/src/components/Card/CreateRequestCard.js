// @mui
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, TextField, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// form
import { useFormik } from 'formik';
import * as Yup from 'yup';
import hotToast from '../../utils/hotToast';

// services
import { createRequestBody, createRequest } from '../../services/Request';

// ----------------------------------------------------------------------

export default function CreateRequestCard() {
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
      OrganisationUnitID: Yup.number().max(20, 'Max value is 20').required('OrganisationUnitID is required'),
    }),
    onSubmit: (values) => {
      const { RequestDetail, RequestorName, OrganisationUnitID } = values;
      setLoading(true);
      createRequest(createRequestBody(RequestDetail, RequestorName, OrganisationUnitID))
        .then((response) => {
          setLoading(false);
          hotToast('success', `Create Successed! Request ID: ${response.data}`);
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
        <CardHeader title={'Create Request'} />
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
            <TextField
              error={Boolean(formik.touched.RequestorName && formik.errors.RequestorName)}
              fullWidth
              helperText={formik.touched.RequestorName && formik.errors.RequestorName}
              label="Requestor Name"
              margin="normal"
              name="RequestorName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="string"
              value={formik.values.RequestorName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.OrganisationUnitID && formik.errors.OrganisationUnitID)}
              fullWidth
              helperText={formik.touched.OrganisationUnitID && formik.errors.OrganisationUnitID}
              label="Organisation Unit ID"
              margin="normal"
              name="OrganisationUnitID"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.OrganisationUnitID}
              variant="outlined"
            />
            <Grid sx={{ py: 3 }}>
              <LoadingButton
                loading={isLoading}
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}

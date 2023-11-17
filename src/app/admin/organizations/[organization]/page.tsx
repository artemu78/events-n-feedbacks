import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Link as MUILink,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { Organization } from '@/types';

import { getOrganizationData } from './action';

const Page = async ({ params }: { params: { organization: string } }) => {
  const organizationId = params.organization;
  const organizationData = (await getOrganizationData(
    organizationId,
  )) as Organization;
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Home
          </MUILink>
        </Link>
        <Link href="/admin/organizations" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Organizations
          </MUILink>
        </Link>
        <Typography color="text.primary">{organizationData?.title}</Typography>
      </Breadcrumbs>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Paper sx={{ p: 2, flexGrow: 1 }}>
          {/* <h1>Event: {params.event}</h1> */}
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={12} sm={2}>
              <Typography variant="body1" sx={{ color: '#757575' }}>
                Title
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography variant="body1">{organizationData?.title}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={12} sm={2}>
              <Typography variant="body1" sx={{ color: '#757575' }}>
                Description
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography variant="body1">
                {organizationData?.description}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={12} sm={2}>
              <Typography variant="body1" sx={{ color: '#757575' }}>
                Site
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <MUILink href={organizationData?.site} target="_blank">
                <Typography variant="body1">
                  {organizationData?.site}
                </Typography>
              </MUILink>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={12} sm={2}>
              <Typography variant="body1" sx={{ color: '#757575' }}>
                Instagram
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <MUILink href={organizationData?.instagram} target="_blank">
                <Typography variant="body1">
                  {organizationData?.instagram}
                </Typography>
              </MUILink>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={12} sm={2}>
              <Typography variant="body1" sx={{ color: '#757575' }}>
                Facebook
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10}>
              <MUILink href={organizationData?.facebook} target="_blank">
                <Typography variant="body1">
                  {organizationData?.facebook}
                </Typography>
              </MUILink>
            </Grid>
          </Grid>
        </Paper>
        <Box sx={{ flexShrink: 0 }} maxWidth={{ xs: '100%', md: '50%' }}>
          <img
            src={organizationData?.logoUrl}
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Stack>
    </>
  );
};

export default Page;

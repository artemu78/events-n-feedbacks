import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Link as MUILink,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { Organization } from '@/types';

import { getOrganizationData } from './action';

const OrgPage = async ({ params }: { params: { organization: string } }) => {
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
        <Link href="/organizations" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Organizations
          </MUILink>
        </Link>
        <Typography color="text.primary">{organizationData?.title}</Typography>
      </Breadcrumbs>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Card sx={{ flexGrow: 1 }}>
          {/* <h1>Event: {params.event}</h1> */}
          <CardContent>
            <Grid container spacing={2} sx={{ my: 1 }}>
              <Grid item xs={12} sm={2}>
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  Title
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Typography variant="body1">
                  {organizationData?.title}
                </Typography>
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
          </CardContent>
          <CardActions>
            <Button>Join</Button>
            <Link href={`/organizations/${organizationId}/members`} passHref>
              <Button>Members</Button>
            </Link>
            <Link href={`/organizations/${organizationId}/events`} passHref>
              <Button>Events</Button>
            </Link>
          </CardActions>
        </Card>
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

export default OrgPage;

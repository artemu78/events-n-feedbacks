import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  IconButton,
  Link as MUILink,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import OrganizationAction from '@/components/OrganizationActions';
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
            <Typography variant="h5" sx={{ mb: 1 }}>
              {organizationData?.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {organizationData?.description}
            </Typography>
            <MUILink href={organizationData?.site} target="_blank">
              <IconButton>
                <LanguageIcon />
              </IconButton>
            </MUILink>
            <MUILink href={organizationData?.instagram} target="_blank">
              <IconButton>
                <InstagramIcon />
              </IconButton>
            </MUILink>
            <MUILink href={organizationData?.facebook} target="_blank">
              <IconButton>
                <FacebookIcon />
              </IconButton>
            </MUILink>
          </CardContent>
          <OrganizationAction organizationId={organizationId} />
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

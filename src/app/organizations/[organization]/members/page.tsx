import {
  Breadcrumbs,
  Link as MUILink,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Organization } from '@/types';

import { getOrganizationData } from '../action';
export const metadata: Metadata = {
  title: "Events'n'Feedback / speakers",
  description: 'Event, speakers and their feedback',
};

const SpeakersPage = async ({
  params,
}: {
  params: { organization: string };
}) => {
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
        <Link href={`/organizations/${organizationId}`} passHref>
          <MUILink component="span" underline="hover" color="inherit">
            {organizationData?.title}
          </MUILink>
        </Link>
        <Typography color="text.primary">Members</Typography>
      </Breadcrumbs>

      <Typography sx={{ mb: 2 }} variant="h4">
        Members of {organizationData?.title}
      </Typography>

      <Typography sx={{ mb: 2 }} variant="body1">
        Page is under construction
      </Typography>
    </>
  );
};

export default SpeakersPage;

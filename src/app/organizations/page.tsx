'use server';
import { Breadcrumbs, Link as MUILink, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';
import Link from 'next/link';

import OrganizationCard from '@/components/organizationcard';
import { flattenJson } from '@/services/utils';
import { Organization } from '@/types';

import { getOrganizationsData } from './action';

// export const metadata: Metadata = {
//   title: "Events'n'Feedback / events",
//   description: 'Event, speakers and their feedback',
// };

export default async function OrganizationPage() {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link href="/" passHref>
          <MUILink component="span" underline="hover" color="inherit">
            Home
          </MUILink>
        </Link>
        <Typography color="text.primary">Organizations</Typography>
      </Breadcrumbs>

      <Typography sx={{ mb: 2 }} variant="h4">
        Organizations
      </Typography>

      <Organizations />
    </>
  );
}

export const Organizations = async () => {
  const organizations = await getOrganizationsData();
  const organizationsArray = flattenJson<Organization>(organizations.data);

  return (
    <Stack
      component="ul"
      sx={{
        listStyleType: 'none',
      }}
      useFlexGap
      flexWrap="wrap"
      direction="row"
      spacing={{ xs: 1, sm: 2 }}
    >
      {organizationsArray.map((organization) => {
        return (
          <Link
            key={organization.id}
            passHref
            href={`/admin/organizations/${organization.id}`}
          >
            <OrganizationCard
              id={organization.id}
              title={organization.title}
              description={organization.description}
              logo={organization.logoUrl}
              key={organization.id}
            />
          </Link>
        );
      })}
    </Stack>
  );
};

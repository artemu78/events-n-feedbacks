'use server';
import { Link as MUILink, Stack } from '@mui/material';
import Link from 'next/link';

import { getOrganizationsData } from '@/app/organizations/action';
import OrganizationCard from '@/components/organizationcard';
import { flattenJson } from '@/services/utils';
import { Organization } from '@/types';

const Organizations = async () => {
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

export default Organizations;

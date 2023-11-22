'use server';
import { Stack } from '@mui/material';

import { getOrganizationsData } from '@/app/organizations/action';
import OrganizationCard from '@/components/organizationcard';
import { flattenJson } from '@/services/utils';
import { Organization } from '@/types';

interface OrganizationsProps {
  joinmode?: boolean;
}

const Organizations = async ({ joinmode = false }: OrganizationsProps) => {
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
          <OrganizationCard
            key={organization.id}
            id={organization.id}
            title={organization.title}
            description={organization.description}
            logo={organization.logoUrl}
            joinmode={joinmode}
          />
        );
      })}
    </Stack>
  );
};

export default Organizations;

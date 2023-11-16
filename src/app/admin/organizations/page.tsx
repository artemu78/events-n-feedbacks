import { Paper, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';
import Link from 'next/link';

import { flattenJson } from '@/services/utils';
import { Organization } from '@/types';

import { getOrganizationsData } from './action';
export const metadata: Metadata = {
  title: "Events'n'Feedback / events",
  description: 'Event, speakers and their feedback',
};

const Page = () => {
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h4">
        Organizations
      </Typography>

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
        <Events />
      </Stack>
    </>
  );
};

const Events = async () => {
  const organizations = await getOrganizationsData();
  const organizationsArray = flattenJson<Organization>(organizations.data);

  return organizationsArray.map((organization) => {
    return (
      <Link
        key={organization.id}
        passHref
        href={`/admin/organizations/${organization.id}`}
      >
        <Paper
          sx={{
            height: '150px',
            width: '200px',
            borderColor: 'gray.500',
            p: 1,
            overflow: 'hidden',
          }}
          component="li"
        >
          <Typography variant="h6">{organization.title}</Typography>
          <Typography>{organization.description}</Typography>
        </Paper>
      </Link>
    );
  });
};

export default Page;

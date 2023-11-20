'use server';
import { Breadcrumbs, Link as MUILink, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';
import Link from 'next/link';

import OrganizationsList from '@/components/organizationslist';

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

      <OrganizationsList />
    </>
  );
}

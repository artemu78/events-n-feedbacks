'use client';
import { Button, CardActions, CircularProgress, Stack } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import organizations from '@/store/organizations';
import { joinOrganization, leaveOrganization } from '@/store/userslice';
import { LoadStatus } from '@/types/index';
interface OrganizationActionsProps {
  organizationId: string;
  joinmode?: boolean;
}

const OrganizationActions = ({
  organizationId,
  joinmode,
}: OrganizationActionsProps) => {
  const { joinstatus, joiningorganization, user } = useSelector(
    (state: RootState) => state.user,
  );

  const dispatch = useDispatch<AppDispatch>();
  if (!user) {
    return null;
  }

  const joinOrganizationHandle = async () => {
    dispatch(joinOrganization(organizationId));
  };

  const leaveOrganizationHandle = async () => {
    dispatch(leaveOrganization(organizationId));
  };

  const userHasThisOrganization = user.organizationsObj.find((organization) => {
    return organization.id === organizationId;
  });

  let buttons;
  if (joinmode && !userHasThisOrganization) {
    if (
      joinstatus === LoadStatus.LOADING &&
      joiningorganization === organizationId
    ) {
      buttons = (
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ width: 1 }}
        >
          <CircularProgress />
        </Stack>
      );
    } else {
      buttons = (
        <Button onClick={joinOrganizationHandle} variant="contained" fullWidth>
          Join
        </Button>
      );
    }
  } else {
    buttons = (
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ width: 1 }}
        direction={'row'}
      >
        {userHasThisOrganization ? (
          <Button onClick={leaveOrganizationHandle}>Leave</Button>
        ) : (
          <Button onClick={joinOrganizationHandle}>Join</Button>
        )}
        <Link href={`/organizations/${organizationId}/members`} passHref>
          <Button>Members</Button>
        </Link>
        <Link href={`/organizations/${organizationId}/events`} passHref>
          <Button>Events</Button>
        </Link>
      </Stack>
    );
  }
  return <CardActions>{buttons}</CardActions>;
};

export default OrganizationActions;

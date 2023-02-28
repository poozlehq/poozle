/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Select } from '@mantine/core';
import * as React from 'react';
import { UserContext } from 'store/user_context';

export function WorkspaceSelect() {
  const userDetails = React.useContext(UserContext);

  // Don't show the select if there are no workspaces
  if (!userDetails) {
    return null;
  }

  const selectData = userDetails.Workspace.map((workspace) => ({
    value: workspace.workspaceId,
    label: workspace.slug,
  }));

  return (
    <Select
      size="sm"
      value={userDetails.defaultWorkspace?.workspaceId}
      placeholder="Choose workspace"
      data={selectData}
      onSelect={(value) => console.log(value)}
    />
  );
}

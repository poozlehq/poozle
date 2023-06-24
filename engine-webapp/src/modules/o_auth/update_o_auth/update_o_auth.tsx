/** Copyright (c) 2023, Poozle, all rights reserved. **/

import * as React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

import { SideBarLayout } from 'layouts/sidebar_layout';
import { GetUserData } from 'wrappers/get_user_data';

export function UpdateOAuthApp() {
  return <></>;

  // return (
  //   <>
  //     <Header title="Update OAuth App" />
  //     <Container>
  //       <Paper mt="lg" className={styles.container}>
  //         <Group p="md">
  //           <Title order={5}>Update the OAuth App </Title>
  //         </Group>
  //         <Divider className={styles.divider} />

  //         <Group pt="md">
  //           <OAuthAppForm
  //             workspaceId={workspaceId as string}
  //             update
  //             initialValues={{
  //               clientId: integrationAuth.getIntegrationAuth.clientId,
  //               scopes: integrationAuth.getIntegrationAuth.scopes,
  //               integrationAuthName:
  //                 integrationAuth.getIntegrationAuth.integrationAuthName,
  //             }}
  //             onSubmit={(values) => {}}
  //           />
  //         </Group>
  //       </Paper>
  //     </Container>
  //   </>
  // );
}

UpdateOAuthApp.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <GetUserData>
        <SideBarLayout>{page}</SideBarLayout>
      </GetUserData>
    </SessionAuth>
  );
};

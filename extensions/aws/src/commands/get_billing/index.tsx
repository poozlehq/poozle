/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { useClipboard } from '@mantine/hooks';
import { Button } from '@mantine/core';
import { ExtensionSpecDataType, BasicView } from '@poozle/edk';
// import { open } from '@tauri-apps/api/shell';
import * as React from 'react';
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import styles from './index.module.scss';
// import { Issue } from '../utils';

// import {CostExplorerClient} from '@aws-sdk/client-cost-explorer';
import CostExplorer from 'aws-sdk/clients/costexplorer';
import { Group } from './utils';
import { integer } from 'aws-sdk/clients/cloudfront';
// import AWS from 'aws-sdk'
// import {fromIni} from '@aws-sdk/credential-providers';

// const queryClient = new QueryClient();

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

// const SearchPRs = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
//   const [searchText, setSearchText] = useDebouncedState('', 500);
//   const clipboard = useClipboard({ timeout: 500 });
//   // const {fromIni} = require("@aws-sdk/credential-providers");
//   const { isLoading, data }: any = useQuery(['searchPRs', searchText], async () => {
//     var costExplorer = new CostExplorer({
//       // region: 'us-east-1',
//       // accessKeyId: specData?.data.access_key,
//       // secretAccessKey: specData?.data.secret_key,
//       // credentials: fromIni({profile: 'staging'})
//       credentials: {
//         accessKeyId: specData?.data.access_key,
//         secretAccessKey: specData?.data.secret_key,
//       },
//       region: "us-east-1"
//     });

//     console.log(specData?.data.access_key)
//     // const SESConfig = {
//     //   apiVersion: "latest",
//     //   accessKeyId: specData?.data.access_key,
//     //   accessSecretKey: specData?.data.secret_key,
//     //   region: "us-east-1"
//     // }
//     // AWS.config.update(SESConfig);
    
//     const params = {
//       Metrics: ['BLENDED_COST'],
//       TimePeriod: {
//         End: '2022-11-12' /* Fill the end date */,
//         Start: '2022-11-01' /* Fill the start date  */,
//       },
//       Granularity: 'MONTHLY' /* MONTHLY or HOURLY */,
//       GroupBy: [
//         {
//           Key: 'LINKED_ACCOUNT',
//           Type: 'DIMENSION',
//         },
//       ],
//     };

//     costExplorer.getCostAndUsage(params, function (err: any, data: any) {
//       if (err) console.log(err, err.stack); // an error occurred
//       else console.log(data); // successful response
//     });
//     const repositories = `repo:${specData?.data.repos.replace(/,/g, '+repo:')}`;

//     const response = await fetch(
//       `https://api.github.com/search/issues?q=${`is:pull-request`} ${searchText} ${repositories}&per_page=10`,
//       {
//         // the expected response type
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `token ${specData?.data.api_key}`,
//         },
//       },
//     );
//     return await response.json();
//   });

//   const mappedResult =
//     isLoading || !data
//       ? []
//       : data?.items?.map((issue: Issue) => ({
//           id: issue.id,
//           title: issue.title,
//           description: `#${issue.number}`,
//           icon: issue.user.avatar_url,
//           // accessoryIcon: statusIcon(issue.fields.status),
//           // accessoryTitle: issue.fields.status.name,
//           url: issue.url,
//           onTrigger: async () => {
//             clipboard.copy(issue.html_url);
//             await open(issue.html_url);
//           },
//           linkText: issue.title,
//         }));

//   return (
//     <div className={styles.container}>
//       <SearchView
//         actions={mappedResult}
//         loading={isLoading}
//         placeholder=""
//         onQuery={(e) => setSearchText(e)}
//         onClose={() => {
//           resetCommand();
//         }}
//       />
//     </div>
//   );
// };

// eslint-disable-next-line import/no-anonymous-default-export, react/function-component-definition
// export default function (props: CommandProps) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <SearchPRs {...props} />
//     </QueryClientProvider>
//   );
// }



export const GetCosts = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [password, setPassword] = React.useState<string>('');
  const clipboard = useClipboard({ timeout: 500 });

  React.useEffect(() => {
    getCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getCost() {
    var costExplorer = new CostExplorer({
      // region: 'us-east-1',
      // accessKeyId: specData?.data.access_key,
      // secretAccessKey: specData?.data.secret_key,
      // credentials: fromIni({profile: 'staging'})
      credentials: {
        accessKeyId: specData?.data.access_key,
        secretAccessKey: specData?.data.secret_key,
      },
      region: "us-east-1"
    });

    console.log(specData?.data.access_key)
    // const SESConfig = {
    //   apiVersion: "latest",
    //   accessKeyId: specData?.data.access_key,
    //   accessSecretKey: specData?.data.secret_key,
    //   region: "us-east-1"
    // }
    // AWS.config.update(SESConfig);
    
    const params = {
      Metrics: ['BLENDED_COST'],
      TimePeriod: {
        End: '2022-11-12' /* Fill the end date */,
        Start: '2022-11-01' /* Fill the start date  */,
      },
      Granularity: 'MONTHLY' /* MONTHLY or HOURLY */,
      GroupBy: [
        {
          Key: 'LINKED_ACCOUNT',
          Type: 'DIMENSION',
        },
      ],
    };

    costExplorer.getCostAndUsage(params, function (err: any, data: any) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        console.log(data)

        let sum = !data ? '' : data?.ResultsByTime.Groups.reduce(function(prev: integer, current: Group) {
          return prev + +current.Metrics.Amount
        }, 0);

        console.log(sum)

        // const usedCost = !data ? '' : data?.ResultsByTime.map((result: Result) => {
        //   console.log(result.Groups.)

        //   // console.log(`group; ${group.Metrics}`)

        //   // return group?
        //   // console.log(group)
          

        // })
        // console.log(`usedCost: ${usedCost}`)
      }
    });
    // const pw = new Pass(
    //   {
    //     length: 24, // must set
    //     lowercase: true, // optional
    //     uppercase: true, // optional
    //     numbers: true, // optional
    //     special: true, // optional also possible to add own "" with symbols - when true: ~`!@#$%^&*()_-+={[}]|\:;"'<,>.?/
    //   },
    //   {
    //     minLength: 24, // must set
    //     maxLength: 24, // optional
    //     lowercase: true, // optional
    //     uppercase: true, // optional
    //     numbers: true, // optional
    //     special: true, // optional
    //   },
    // );
    // const password = pw.generate();
    const password = '';
    setPassword(password);
    clipboard.copy(password);
  }

  return (
    <BasicView onClose={() => resetCommand()}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.passwordContainer}>
            <div className={styles.password}>
              <h3>{password}</h3>
            </div>
            <div>
              <Button onClick={() => getCost()}> Generate </Button>
            </div>
          </div>
        </div>
      </div>
    </BasicView>
  );
};
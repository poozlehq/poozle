/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Button } from '@mantine/core';
import { ExtensionSpecDataType, BasicView } from '@poozle/edk';
import * as React from 'react';

import styles from './index.module.scss';
import { Group, Result } from './utils';

import CostExplorer from 'aws-sdk/clients/costexplorer'

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
  const [totalSpent, setTotalSpent] = React.useState<string>('');
  const [totalForecast, setTotalForecast] = React.useState<string>('');

  React.useEffect(() => {
    getCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getCost() {
    var costExplorer = new CostExplorer({
      credentials: {
        accessKeyId: specData?.data.access_key,
        secretAccessKey: specData?.data.secret_key,
      },
      region: specData?.data.region,
    });

    let today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      .toISOString()
      .split('T')[0];
    const currentDay = today.toISOString().split('T')[0];

    const params = {
      Metrics: ['BLENDED_COST'],
      TimePeriod: {
        End: lastDay,
        Start: firstDay,
      },
      Granularity: 'MONTHLY',
      GroupBy: [
        {
          Key: 'LINKED_ACCOUNT',
          Type: 'DIMENSION',
        },
      ],
    };

    const forcastParams = {
      Metric: 'BLENDED_COST',
      TimePeriod: {
        End: lastDay,
        Start: currentDay,
      },
      Granularity: 'MONTHLY',
    };

    costExplorer.getCostAndUsage(params, async function (err: any, data: any) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        const spent = !data
          ? ''
          : data.ResultsByTime.reduce(function (prev: number, current: Result) {
              return (
                prev +
                current.Groups.reduce(function (groupPrev: number, groupCurrent: Group) {
                  return groupPrev + parseInt(groupCurrent.Metrics.BlendedCost.Amount, 10);
                }, 0)
              );
            }, 0);
        setTotalSpent(spent);
      }
    });

    costExplorer.getCostForecast(forcastParams, async function (err: any, data: any) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        const forecastCost = !data ? '' : data?.Total.Amount;

        setTotalForecast(forecastCost);
      }
    });
  }

  return (
    <BasicView onClose={() => resetCommand()}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.passwordContainer}>
            <div className={styles.currentMtd}>
              <h1>Current MTD</h1>
              <h2>$ {totalSpent}</h2>
            </div>
            <div className={styles.forecast}>
              <h1>Total Forecast</h1>
              <h2>$ {parseInt(totalForecast, 10) + totalSpent}</h2>
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

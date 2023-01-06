/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Button } from '@mantine/core';
import { ExtensionSpecDataType, BasicView } from '@poozle/edk';
import CostExplorer from 'aws-sdk/clients/costexplorer';
import * as React from 'react';

import styles from './index.module.scss';
import { Group, Result } from './utils';

interface CommandProps {
  specData?: ExtensionSpecDataType;
  resetCommand: () => void;
}

export const GetCosts = ({ specData, resetCommand }: CommandProps): React.ReactElement => {
  const [totalSpent, setTotalSpent] = React.useState<string>('');
  const [totalForecast, setTotalForecast] = React.useState<string>('');

  React.useEffect(() => {
    getCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getCost() {
    const costExplorer = new CostExplorer({
      credentials: {
        accessKeyId: specData?.data.access_key,
        secretAccessKey: specData?.data.secret_key,
      },
      region: specData?.data.region,
    });

    const today = new Date();
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

    costExplorer.getCostAndUsage(params, async (err: any, data: any) => {
      if (err) {
        console.log(err, err.stack);
      } // an error occurred
      else {
        const spent = !data
          ? ''
          : data.ResultsByTime.reduce((prev: number, current: Result) => {
              return (
                prev +
                current.Groups.reduce((groupPrev: number, groupCurrent: Group) => {
                  return groupPrev + parseInt(groupCurrent.Metrics.BlendedCost.Amount, 10);
                }, 0)
              );
            }, 0);
        setTotalSpent(spent);
      }
    });

    costExplorer.getCostForecast(forcastParams, async (err: any, data: any) => {
      if (err) {
        console.log(err, err.stack);
      } // an error occurred
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

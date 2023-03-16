/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Duration {
  @Field()
  p75: number;

  @Field()
  p90: number;

  @Field()
  p95: number;

  @Field()
  p99: number;
}

@ObjectType()
export class OverTimeObject {
  @Field()
  date: string;

  @Field()
  value: number;
}

@ObjectType()
export class DurationOverTimeObject {
  @Field()
  date: string;

  @Field(() => Duration)
  duration: Duration;
}

@ObjectType()
export class GeneralStats {
  @Field()
  totalRequests: number;

  @Field()
  totalFailures: number;

  @Field()
  totalOperations: number;

  @Field(() => Duration)
  duration: Duration;

  @Field(() => [OverTimeObject])
  failuresOverTime: OverTimeObject[];

  @Field(() => [OverTimeObject])
  requestsOverTime: OverTimeObject[];

  @Field(() => [DurationOverTimeObject])
  durationOverTime: DurationOverTimeObject[];
}

@ObjectType()
export class Node {
  @Field()
  id: string;

  @Field()
  operationHash: string;

  @Field()
  name: string;

  @Field()
  kind: string;

  @Field()
  count: number;

  @Field()
  countOk: number;

  @Field()
  percentage: number;

  @Field(() => Duration)
  duration: Duration;
}

@ObjectType()
export class Operation {
  @Field(() => [Node])
  nodes: Node[];

  @Field()
  total: number;
}

@ObjectType()
export class OperationStats {
  @Field(() => [Operation])
  operations: Operation[];
}

/**
 * Input types
 */

@InputType()
export class StatsInput {
  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  workspace: string;
}

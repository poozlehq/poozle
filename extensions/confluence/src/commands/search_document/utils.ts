/** Copyright (c) 2022, Poozle, all rights reserved. **/

interface IssueType {
  id: string;
  name: string;
  iconUrl: string;
}

interface IssueStatus {
  name: string;
  statusCategory: {
    key: string;
  };
}

export interface Issue {
  id: string;
  key: string;
  fields: {
    summary: string;
    issuetype: IssueType;
    status: IssueStatus;
  };
}

export interface Issues {
  issues?: Issue[];
}

export const fields = 'summary,issuetype,status';

function isIssueKey(query: string): boolean {
  const issueKeyPattern = /^[a-z]+-[0-9]+$/i;
  return query.match(issueKeyPattern) !== null;
}

function buildCql(query: string): string {
  const spaceAndInvalidChars = /[ "]/;
  const terms = query.split(spaceAndInvalidChars).filter((term) => term.length > 0);

  const collectPrefixed = (prefix: string, terms: string[]): string[] =>
    terms
      .filter((term) => term.startsWith(prefix) && term.length > prefix.length)
      .map((term) => term.substring(prefix.length));
  const spaces = collectPrefixed('@', terms);
  const contentTypes = collectPrefixed('#', terms);
  const unwantedTextTermChars = /[-+!*&]/;
  const textTerms = terms
    .filter((term) => !'@#'.includes(term[0]))
    .flatMap((term) => term.split(unwantedTextTermChars))
    .filter((term) => term.length > 0);

  const escapeStr = (str: string) => `"${str}"`;
  const inClause = (entity: string, items: string[]) =>
    items.length > 0 ? `${entity} IN (${items.map(escapeStr)})` : undefined;
  const cqlConditions = [
    inClause('space', spaces),
    inClause('type', contentTypes),
    ...textTerms.map((term) => `text~"${term}*"`),
  ];

  const cql = cqlConditions.filter((condition) => condition !== undefined).join(' AND ');
  return `${cql} order by lastViewed desc`;
}

export function cqlFor(query: string): string {
  return isIssueKey(query) ? `key=${query}` : buildCql(query);
}

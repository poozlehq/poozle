/** Copyright (c) 2022, Poozle, all rights reserved. **/

export interface Repo {
  full_name: string;
  name: string;
  owner: {
    avatar_url: string;
  };
}

export interface Issue {
  url: string;
  html_url: string;
  id: BigInteger;
  title: string;
  body: string;
  user: {
    avatar_url: string;
  };
}

export interface Issues {
  items?: Issue[];
}

export const fields = 'summary,issuetype,status';

function isIssueKey(query: string): boolean {
  const issueKeyPattern = /^[a-z]+-[0-9]+$/i;
  return query.match(issueKeyPattern) !== null;
}

function buildJql(query: string): string {
  const spaceAndInvalidChars = /[ "]/;
  const terms = query.split(spaceAndInvalidChars).filter((term) => term.length > 0);

  const collectPrefixed = (prefix: string, terms: string[]): string[] =>
    terms
      .filter((term) => term.startsWith(prefix) && term.length > prefix.length)
      .map((term) => term.substring(prefix.length));
  const projects = collectPrefixed('@', terms);
  const issueTypes = collectPrefixed('#', terms);
  const unwantedTextTermChars = /[-+!*&]/;
  const textTerms = terms
    .filter((term) => !'@#'.includes(term[0]))
    .flatMap((term) => term.split(unwantedTextTermChars))
    .filter((term) => term.length > 0);

  const escapeStr = (str: string) => `"${str}"`;
  const inClause = (entity: string, items: string[]) =>
    items.length > 0 ? `${entity} IN (${items.map(escapeStr)})` : undefined;
  const jqlConditions = [
    inClause('project', projects),
    inClause('issueType', issueTypes),
    ...textTerms.map((term) => `text~"${term}*"`),
  ];

  const jql = jqlConditions.filter((condition) => condition !== undefined).join(' AND ');
  return `${jql} order by lastViewed desc`;
}

export function jqlFor(query: string): string {
  return isIssueKey(query) ? `key=${query}` : buildJql(query);
}

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

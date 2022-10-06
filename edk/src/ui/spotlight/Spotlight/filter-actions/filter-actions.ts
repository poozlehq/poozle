function getKeywords(keywords: string | string[]) {
  if (Array.isArray(keywords)) {
    return keywords
      .map((keyword) => keyword.trim())
      .join(',')
      .toLowerCase()
      .trim();
  }

  if (typeof keywords === 'string') {
    return keywords.toLowerCase().trim();
  }

  return '';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterActions(_query: string, actions: any[]) {
  const query = _query.trim().toLowerCase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const priorityMatrix: any = [[], []];
  actions.forEach((action) => {
    if (action.title?.toLowerCase().includes(query)) {
      priorityMatrix[0].push(action);
    } else if (
      action.description?.toLowerCase().includes(query) ||
      getKeywords(action.keywords).includes(query)
    ) {
      priorityMatrix[1].push(action);
    }
  });

  return priorityMatrix.flat();
}

export type Project = {
  name: string;
  key: string;
  id: string;
  avatarUrls: {
    "48x48": string;
  };
};

export type Projects = {
  values: Project[]
}

export type Issue = {
  self: string;
  id: string;
  key: string;
  fields: {
    summary: string;
    assignee: {
      avatarUrls: {
        "48x48": string;
      };
      displayName: string;
    };
    description: string;
  };
};

export type Issues = {
  issues: Issue[]
}

export type IssueType = {
  name: string;
  id: string;
  iconUrl: string;
}

export type Assignee = {
  displayName: string;
  accountId: string;
  avatarUrls: {
    "48x48": string;
  };
}
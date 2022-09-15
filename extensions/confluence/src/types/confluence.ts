
export type Space = {
  name: string;
  key: string;
  id: string;
  _expandable: {
    icon: string;
  };
};

export type Spaces = {
  results: Space[]
}

export type Content = {
  content: {
    _links: {
      self: string;
    },
    id: string;
  }
  title: string;
  excerpt: string;
}

export type Contents = {
  results: Content[];
}

export type Mention = {
  content: {
    _links: {
      self: string;
    },
    id: string;
    type: string;
  }
  title: string;
  excerpt: string;
}

export type Mentions = {
  results: Mention[];
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
export class Workspace {
  workspaceId: string;
  slug: string;
  userId: string;
  initialSetupComplete: boolean;
  anonymousDataCollection: boolean;
  deleted: Date | null;
}

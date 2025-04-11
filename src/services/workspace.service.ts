import api from './api';

export interface WorkspaceData {
  id: string;
  name: string;
  type: 'individual' | 'team';
  isOwner: boolean;
  createdAt: string;
  membersCount?: number;
}

export interface WorkspaceDetailData extends WorkspaceData {
  owner: string;
  settings: {
    preferredTheme: 'light' | 'dark';
    defaultPostStyle: 'standard' | 'formatted' | 'chunky' | 'short' | 'emojis';
    defaultLanguage: 'english' | 'german';
  };
  members?: WorkspaceMemberData[];
}

export interface WorkspaceMemberData {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: 'admin' | 'writer' | 'viewer';
  inviteAccepted: boolean;
  addedAt: string;
}

export interface CreateWorkspaceData {
  name: string;
  type: 'individual' | 'team';
}

export interface UpdateWorkspaceData {
  name?: string;
  settings?: {
    preferredTheme?: 'light' | 'dark';
    defaultPostStyle?: 'standard' | 'formatted' | 'chunky' | 'short' | 'emojis';
    defaultLanguage?: 'english' | 'german';
  };
}

export interface InviteUserData {
  email: string;
  role: 'admin' | 'writer' | 'viewer';
}

class WorkspaceService {
  /**
   * Get all workspaces for current user
   */
  async getWorkspaces(): Promise<{ workspaces: WorkspaceData[] }> {
    const response = await api.get('/workspaces');
    return response.data.data;
  }

  /**
   * Get workspace by ID
   */
  async getWorkspace(workspaceId: string): Promise<{ workspace: WorkspaceDetailData }> {
    const response = await api.get(`/workspaces/${workspaceId}`);
    return response.data.data;
  }

  /**
   * Create a new workspace
   */
  async createWorkspace(data: CreateWorkspaceData): Promise<{ workspace: WorkspaceData }> {
    const response = await api.post('/workspaces', data);
    return response.data.data;
  }

  /**
   * Update workspace
   */
  async updateWorkspace(workspaceId: string, data: UpdateWorkspaceData): Promise<{ workspace: Partial<WorkspaceDetailData> }> {
    const response = await api.put(`/workspaces/${workspaceId}`, data);
    return response.data.data;
  }

  /**
   * Delete workspace
   */
  async deleteWorkspace(workspaceId: string): Promise<void> {
    await api.delete(`/workspaces/${workspaceId}`);
  }

  /**
   * Invite user to workspace
   */
  async inviteUser(workspaceId: string, data: InviteUserData): Promise<{ message: string }> {
    const response = await api.post(`/workspaces/${workspaceId}/invite`, data);
    return response.data.data;
  }

  /**
   * Accept workspace invitation
   */
  async acceptInvitation(token: string): Promise<{ workspace: { id: string; name: string } }> {
    const response = await api.post(`/workspaces/invitations/${token}/accept`);
    return response.data.data;
  }
}

export default new WorkspaceService(); 
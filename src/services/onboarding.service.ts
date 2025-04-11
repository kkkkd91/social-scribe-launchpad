import api from './api';

export interface OnboardingData {
  workspaceType?: 'individual' | 'team' | null;
  preferredTheme?: 'light' | 'dark' | null;
  postStyle?: 'standard' | 'formatted' | 'chunky' | 'short' | 'emojis' | null;
  postFrequency?: number | null;
  language?: 'english' | 'german' | null;
  websiteLink?: string;
  inspirationProfiles?: string[];
}

export interface UserInfoData {
  firstName: string;
  lastName: string;
  mobileNumber?: string;
}

export interface CompleteOnboardingData {
  workspaceName: string;
}

class OnboardingService {
  /**
   * Update current onboarding step
   */
  async updateStep(step: number): Promise<{ currentStep: number }> {
    const response = await api.put('/users/onboarding/step', { step });
    return response.data.data;
  }

  /**
   * Update workspace type
   */
  async updateWorkspaceType(workspaceType: OnboardingData['workspaceType']): Promise<{ workspaceType: OnboardingData['workspaceType'] }> {
    const response = await api.put('/users/onboarding/workspace-type', { workspaceType });
    return response.data.data;
  }

  /**
   * Update preferred theme
   */
  async updatePreferredTheme(preferredTheme: OnboardingData['preferredTheme']): Promise<{ preferredTheme: OnboardingData['preferredTheme'] }> {
    const response = await api.put('/users/onboarding/preferred-theme', { preferredTheme });
    return response.data.data;
  }

  /**
   * Update post style
   */
  async updatePostStyle(postStyle: OnboardingData['postStyle']): Promise<{ postStyle: OnboardingData['postStyle'] }> {
    const response = await api.put('/users/onboarding/post-style', { postStyle });
    return response.data.data;
  }

  /**
   * Update post frequency
   */
  async updatePostFrequency(postFrequency: OnboardingData['postFrequency']): Promise<{ postFrequency: OnboardingData['postFrequency'] }> {
    const response = await api.put('/users/onboarding/post-frequency', { postFrequency });
    return response.data.data;
  }

  /**
   * Update language preference
   */
  async updateLanguage(language: OnboardingData['language']): Promise<{ language: OnboardingData['language'] }> {
    const response = await api.put('/users/onboarding/language', { language });
    return response.data.data;
  }

  /**
   * Update user information
   */
  async updateUserInfo(data: UserInfoData): Promise<{ firstName: string; lastName: string; mobileNumber?: string }> {
    const response = await api.put('/users/onboarding/user-info', data);
    return response.data.data;
  }

  /**
   * Update website link
   */
  async updateWebsiteLink(websiteLink: string): Promise<{ websiteLink: string }> {
    const response = await api.put('/users/onboarding/website-link', { websiteLink });
    return response.data.data;
  }

  /**
   * Update inspiration profiles
   */
  async updateInspirationProfiles(inspirationProfiles: string[]): Promise<{ inspirationProfiles: string[] }> {
    const response = await api.put('/users/onboarding/inspiration-profiles', { inspirationProfiles });
    return response.data.data;
  }

  /**
   * Complete onboarding and create workspace
   */
  async completeOnboarding(data: CompleteOnboardingData): Promise<{ 
    workspace: { 
      id: string; 
      name: string; 
      type: 'individual' | 'team' 
    },
    onboardingStatus: 'incomplete' | 'completed'
  }> {
    const response = await api.post('/users/onboarding/complete', data);
    return response.data.data;
  }
}

export default new OnboardingService(); 
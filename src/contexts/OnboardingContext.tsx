import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useAuth } from "./AuthContext";

interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  workspaceType: "team" | "individual" | null;
  preferredTheme: "light" | "dark" | null;
  postStyle: "standard" | "formatted" | "chunky" | "short" | "emojis" | null;
  postFrequency: number | null;
  language: "english" | "german" | null;
  userInfo: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
  };
  websiteLink: string;
  inspirationProfiles: string[];
  workspaceName: string;
  
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setWorkspaceType: (type: "team" | "individual") => void;
  setPreferredTheme: (theme: "light" | "dark") => void;
  setPostStyle: (style: "standard" | "formatted" | "chunky" | "short" | "emojis") => void;
  setPostFrequency: (frequency: number) => void;
  setLanguage: (language: "english" | "german") => void;
  setUserInfo: (info: { firstName: string; lastName: string; mobileNumber: string }) => void;
  setWebsiteLink: (link: string) => void;
  setInspirationProfiles: (profiles: string[]) => void;
  addInspirationProfile: (profile: string) => void;
  removeInspirationProfile: (index: number) => void;
  resetOnboarding: () => void;
  canNavigateBack: boolean;
  setWorkspaceName: (name: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  currentStep: 1,
  totalSteps: 9,
  workspaceType: null,
  preferredTheme: null,
  postStyle: null,
  postFrequency: null,
  language: null,
  userInfo: { firstName: "", lastName: "", mobileNumber: "" },
  websiteLink: "",
  inspirationProfiles: [],
  workspaceName: "",
  
  setCurrentStep: () => {},
  nextStep: () => {},
  prevStep: () => {},
  setWorkspaceType: () => {},
  setPreferredTheme: () => {},
  setPostStyle: () => {},
  setPostFrequency: () => {},
  setLanguage: () => {},
  setUserInfo: () => {},
  setWebsiteLink: () => {},
  setInspirationProfiles: () => {},
  addInspirationProfile: () => {},
  removeInspirationProfile: () => {},
  resetOnboarding: () => {},
  canNavigateBack: true,
  setWorkspaceName: () => {},
});

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const { onboardingComplete } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [workspaceType, setWorkspaceType] = useState<"team" | "individual" | null>(null);
  const [preferredTheme, setPreferredTheme] = useState<"light" | "dark" | null>(null);
  const [postStyle, setPostStyle] = useState<"standard" | "formatted" | "chunky" | "short" | "emojis" | null>(null);
  const [postFrequency, setPostFrequency] = useState<number | null>(null);
  const [language, setLanguage] = useState<"english" | "german" | null>(null);
  const [userInfo, setUserInfo] = useState<{ firstName: string; lastName: string; mobileNumber: string }>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
  });
  const [websiteLink, setWebsiteLink] = useState("");
  const [inspirationProfiles, setInspirationProfiles] = useState<string[]>([]);
  const [workspaceName, setWorkspaceName] = useState("");
  
  const totalSteps = 9;

  // User can navigate back only during onboarding
  const canNavigateBack = !onboardingComplete;

  const nextStep = useCallback(() => {
    console.log(`Moving from step ${currentStep} to ${currentStep + 1}`);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 1 && canNavigateBack) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, canNavigateBack]);

  const addInspirationProfile = useCallback((profile: string) => {
    setInspirationProfiles(prev => [...prev, profile]);
  }, []);

  const removeInspirationProfile = useCallback((index: number) => {
    setInspirationProfiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const resetOnboarding = useCallback(() => {
    setCurrentStep(1);
    setWorkspaceType(null);
    setPreferredTheme(null);
    setPostStyle(null);
    setPostFrequency(null);
    setLanguage(null);
    setUserInfo({ firstName: "", lastName: "", mobileNumber: "" });
    setWebsiteLink("");
    setInspirationProfiles([]);
    setWorkspaceName("");
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps,
        workspaceType,
        preferredTheme,
        postStyle,
        postFrequency,
        language,
        userInfo,
        websiteLink,
        inspirationProfiles,
        workspaceName,
        
        setCurrentStep,
        nextStep,
        prevStep,
        setWorkspaceType,
        setPreferredTheme,
        setPostStyle,
        setPostFrequency,
        setLanguage,
        setUserInfo,
        setWebsiteLink,
        setInspirationProfiles,
        addInspirationProfile,
        removeInspirationProfile,
        resetOnboarding,
        canNavigateBack,
        setWorkspaceName,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);

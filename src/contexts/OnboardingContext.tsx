
import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  workspaceType: "team" | "individual" | null;
  preferredTheme: "light" | "dark" | null;
  postStyle: "standard" | "formatted" | "chunky" | "short" | "emojis" | null;
  postFrequency: number | null;
  userInfo: {
    firstName: string;
    lastName: string;
  };
  websiteLink: string;
  inspirationProfiles: string[];
  
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setWorkspaceType: (type: "team" | "individual") => void;
  setPreferredTheme: (theme: "light" | "dark") => void;
  setPostStyle: (style: "standard" | "formatted" | "chunky" | "short" | "emojis") => void;
  setPostFrequency: (frequency: number) => void;
  setUserInfo: (info: { firstName: string; lastName: string }) => void;
  setWebsiteLink: (link: string) => void;
  setInspirationProfiles: (profiles: string[]) => void;
  addInspirationProfile: (profile: string) => void;
  removeInspirationProfile: (index: number) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  currentStep: 1,
  totalSteps: 7,
  workspaceType: null,
  preferredTheme: null,
  postStyle: null,
  postFrequency: null,
  userInfo: { firstName: "", lastName: "" },
  websiteLink: "",
  inspirationProfiles: [],
  
  setCurrentStep: () => {},
  nextStep: () => {},
  prevStep: () => {},
  setWorkspaceType: () => {},
  setPreferredTheme: () => {},
  setPostStyle: () => {},
  setPostFrequency: () => {},
  setUserInfo: () => {},
  setWebsiteLink: () => {},
  setInspirationProfiles: () => {},
  addInspirationProfile: () => {},
  removeInspirationProfile: () => {},
  resetOnboarding: () => {},
});

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [workspaceType, setWorkspaceType] = useState<"team" | "individual" | null>(null);
  const [preferredTheme, setPreferredTheme] = useState<"light" | "dark" | null>(null);
  const [postStyle, setPostStyle] = useState<"standard" | "formatted" | "chunky" | "short" | "emojis" | null>(null);
  const [postFrequency, setPostFrequency] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<{ firstName: string; lastName: string }>({
    firstName: "",
    lastName: "",
  });
  const [websiteLink, setWebsiteLink] = useState("");
  const [inspirationProfiles, setInspirationProfiles] = useState<string[]>([]);
  
  const totalSteps = 7;

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

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
    setUserInfo({ firstName: "", lastName: "" });
    setWebsiteLink("");
    setInspirationProfiles([]);
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
        userInfo,
        websiteLink,
        inspirationProfiles,
        
        setCurrentStep,
        nextStep,
        prevStep,
        setWorkspaceType,
        setPreferredTheme,
        setPostStyle,
        setPostFrequency,
        setUserInfo,
        setWebsiteLink,
        setInspirationProfiles,
        addInspirationProfile,
        removeInspirationProfile,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);

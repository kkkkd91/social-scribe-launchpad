
import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  workspaceType: "team" | "individual" | null;
  preferredTheme: "light" | "dark" | null;
  language: "english" | "german" | null;
  postStyle: "standard" | "formatted" | "chunky" | "short" | "emojis" | null;
  postFrequency: number | null;
  userInfo: {
    firstName: string;
    lastName: string;
  };
  
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setWorkspaceType: (type: "team" | "individual") => void;
  setPreferredTheme: (theme: "light" | "dark") => void;
  setLanguage: (lang: "english" | "german") => void;
  setPostStyle: (style: "standard" | "formatted" | "chunky" | "short" | "emojis") => void;
  setPostFrequency: (frequency: number) => void;
  setUserInfo: (info: { firstName: string; lastName: string }) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  currentStep: 1,
  totalSteps: 7,
  workspaceType: null,
  preferredTheme: null,
  language: null,
  postStyle: null,
  postFrequency: null,
  userInfo: { firstName: "", lastName: "" },
  
  setCurrentStep: () => {},
  nextStep: () => {},
  prevStep: () => {},
  setWorkspaceType: () => {},
  setPreferredTheme: () => {},
  setLanguage: () => {},
  setPostStyle: () => {},
  setPostFrequency: () => {},
  setUserInfo: () => {},
  resetOnboarding: () => {},
});

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [workspaceType, setWorkspaceType] = useState<"team" | "individual" | null>(null);
  const [preferredTheme, setPreferredTheme] = useState<"light" | "dark" | null>(null);
  const [language, setLanguage] = useState<"english" | "german" | null>(null);
  const [postStyle, setPostStyle] = useState<"standard" | "formatted" | "chunky" | "short" | "emojis" | null>(null);
  const [postFrequency, setPostFrequency] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<{ firstName: string; lastName: string }>({
    firstName: "",
    lastName: "",
  });
  
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

  const resetOnboarding = useCallback(() => {
    setCurrentStep(1);
    setWorkspaceType(null);
    setPreferredTheme(null);
    setLanguage(null);
    setPostStyle(null);
    setPostFrequency(null);
    setUserInfo({ firstName: "", lastName: "" });
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps,
        workspaceType,
        preferredTheme,
        language,
        postStyle,
        postFrequency,
        userInfo,
        
        setCurrentStep,
        nextStep,
        prevStep,
        setWorkspaceType,
        setPreferredTheme,
        setLanguage,
        setPostStyle,
        setPostFrequency,
        setUserInfo,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);

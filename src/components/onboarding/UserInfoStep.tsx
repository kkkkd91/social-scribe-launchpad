
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const UserInfoStep = () => {
  const { nextStep, userInfo, setUserInfo } = useOnboarding();
  const { user } = useAuth();

  useEffect(() => {
    // Pre-fill with user data if available
    if (user) {
      setUserInfo({
        firstName: user.firstName || userInfo.firstName,
        lastName: user.lastName || userInfo.lastName,
      });
    }
  }, [user, setUserInfo, userInfo.firstName, userInfo.lastName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Who would you like to create this account for?</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={userInfo.firstName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, firstName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={userInfo.lastName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, lastName: e.target.value })
              }
              required
            />
          </div>
        </div>

        <Button type="submit" className="mt-8">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default UserInfoStep;

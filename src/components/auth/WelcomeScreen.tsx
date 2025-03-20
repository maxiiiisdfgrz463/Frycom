import React from "react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted?: () => void;
  onLogin?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted = () => {},
  onLogin = () => {},
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 p-6 rounded-[40px]">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-8"></div>

        <h1 className="text-5xl mb-4 font-bold flex text-[#00b4d8]">FRYCOM</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-16">
          Where every thought finds a home.
        </p>

        <div className="w-full max-w-md space-y-4">
          <Button
            onClick={onGetStarted}
            className="w-full h-14 text-lg hover:bg-emerald-500 text-white rounded-[40] rounded-[40] rounded-[10px] bg-[00b4d5] bg-[#00b4d8]"
          >
            Getting Started
          </Button>

          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an Account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold text-[#00b4d8]"
                onClick={onLogin}
              >
                Login
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

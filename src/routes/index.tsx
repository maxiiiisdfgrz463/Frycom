import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import WelcomeScreen from "@/components/auth/WelcomeScreen";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import FeedScreen from "@/components/feed/FeedScreen";
import ProfileScreen from "@/components/profile/ProfileScreen";
import CreatePostScreen from "@/components/feed/CreatePostScreen";

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { user, signIn, signOut, isLoading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  // Auth handlers
  const handleLogin = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    if (!error) {
      navigate("/feed");
    }
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // The actual signup is handled in the SignupForm component
    // This is just for navigation after successful signup
    navigate("/feed");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  // Navigation handlers
  const navigateToLogin = () => navigate("/login");
  const navigateToSignup = () => navigate("/signup");
  const navigateToWelcome = () => navigate("/");
  const navigateToFeed = () => navigate("/feed");
  const navigateToProfile = () => navigate("/profile");
  const navigateToCreatePost = () => navigate("/create-post");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/feed" replace />
          ) : (
            <WelcomeScreen
              onGetStarted={navigateToSignup}
              onLogin={navigateToLogin}
            />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/feed" replace />
          ) : (
            <LoginForm
              onLogin={handleLogin}
              onNavigateToSignup={navigateToSignup}
            />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/feed" replace />
          ) : (
            <SignupForm
              onSignup={handleSignup}
              onNavigateToLogin={navigateToLogin}
            />
          )
        }
      />
      <Route
        path="/feed"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : (
            <FeedScreen
              onCreatePost={navigateToCreatePost}
              onProfile={navigateToProfile}
            />
          )
        }
      />
      <Route
        path="/profile"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : (
            <ProfileScreen onBack={navigateToFeed} onLogout={handleLogout} />
          )
        }
      />
      <Route
        path="/create-post"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : (
            <CreatePostScreen
              onBack={navigateToFeed}
              onPost={(content, media) => {
                console.log("New post:", { content, media });
                navigateToFeed();
              }}
            />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;

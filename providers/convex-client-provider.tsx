"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { dark } from "@clerk/themes";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import { Loading } from "@/components/auth/loading";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkPublishableKey) {
    throw new Error("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not defined");
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} appearance={{baseTheme: dark}}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>
        {children}
        </Authenticated>
        <AuthLoading>
          <Loading/>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import Loader from "@/components/Loader";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SessionHandler>{children}</SessionHandler>
    </SessionProvider>
  );
}

function SessionHandler({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name ?? undefined,
        profilePic: session.user.profilePic ?? undefined,
        plan: session.user.plan,
        basicCredits: session.user.basicCredits,
        aiCredits: session.user.aiCredits,
      });
    }
  }, [session, setUser]);

  if (status === "loading") return <Loader />;

  return <>{children}</>;
}

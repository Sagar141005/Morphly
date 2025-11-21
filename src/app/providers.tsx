"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";

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
  const { data: session } = useSession();
  const setPlan = useUserStore((state) => state.setPlan);

  useEffect(() => {
    if (session?.user?.plan) {
      const planLower = session.user.plan.toLowerCase() as
        | "free"
        | "plus"
        | "pro";
      setPlan(planLower);
    }
  }, [session, setPlan]);

  return <>{children}</>;
}

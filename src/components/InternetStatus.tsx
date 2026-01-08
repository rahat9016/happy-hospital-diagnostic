"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InternetStatus() {
  const router = useRouter();

  useEffect(() => {
    const STORAGE_KEY = "lastPathBeforeOffline";

    function getCurrentFullPath() {
      if (typeof window === "undefined") return "/";
      return window.location.pathname + window.location.search + window.location.hash;
    }

    function goOffline() {
      try {
        const current = getCurrentFullPath();
        // don't overwrite if already set and avoid saving /offline itself
        if (current !== "/offline") {
          try {
            sessionStorage.setItem(STORAGE_KEY, current);
          } catch (e) {
            // ignore storage errors
          }
        }
        router.replace("/offline");
      } catch (e) {
        // ignore
      }
    }

    function goOnline() {
      try {
        if (typeof window === "undefined") return;
        const last = (() => {
          try {
            return sessionStorage.getItem(STORAGE_KEY);
          } catch (e) {
            return null;
          }
        })();

        // if currently on /offline, restore previous path when available
        if (window.location.pathname === "/offline") {
          if (last) {
            // clear before navigation to avoid loops
            try {
              sessionStorage.removeItem(STORAGE_KEY);
            } catch (e) {
              // ignore
            }
            router.replace(last);
            return;
          }
          // fallback to home
          router.replace("/");
        } else {
          // if user already left /offline manually, just clear stored value
          if (last) {
            try {
              sessionStorage.removeItem(STORAGE_KEY);
            } catch (e) {
              // ignore
            }
          }
        }
      } catch (e) {
        // ignore
      }
    }

    if (typeof window !== "undefined" && !navigator.onLine) {
      goOffline();
    }

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, [router]);

  return null;
}

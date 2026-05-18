import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback, useEffect, useState } from "react";

export function useRecaptcha(action: string) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(typeof executeRecaptcha === "function");
  }, [executeRecaptcha]);

  const getToken = useCallback(async (): Promise<string | null> => {
    if (!executeRecaptcha) return null;
    try {
      return (await executeRecaptcha(action)) ?? null;
    } catch (err) {
      console.error("reCAPTCHA execute error:", err);
      return null;
    }
  }, [executeRecaptcha, action]);

  return { getToken, ready };
}

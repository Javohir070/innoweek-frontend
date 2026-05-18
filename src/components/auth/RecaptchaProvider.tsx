import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { getRecaptchaSiteKey, isRecaptchaEnabled } from "@/lib/recaptcha";
import type { ReactNode } from "react";

export default function RecaptchaProvider({ children }: { children: ReactNode }) {
  const siteKey = getRecaptchaSiteKey();

  if (!isRecaptchaEnabled()) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      language="uz"
      scriptProps={{ async: true, defer: true, appendTo: "body" }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}

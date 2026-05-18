import {
  Link as RouterLink,
  useNavigate,
  useParams,
  type LinkProps,
} from "react-router-dom";
import { type ReactNode } from "react";
import { locales, type Locale } from "@/i18n";

function useLocaleParam(): Locale {
  const { locale } = useParams<{ locale: string }>();
  if (locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return "uz";
}

function localizePath(path: string, locale: string): string {
  if (path.startsWith("http") || path.startsWith("#")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}

type AppLinkProps = Omit<LinkProps, "to"> & {
  href?: string;
  to?: string;
  children: ReactNode;
};

export function Link({ href, to, children, ...props }: AppLinkProps) {
  const locale = useLocaleParam();
  const target = href ?? to ?? "/";
  return (
    <RouterLink to={localizePath(target, locale)} {...props} className="text-decoration-none !text-inherit" >
      {children}
    </RouterLink>
  );
}

export function useRouter() {
  const navigate = useNavigate();
  const locale = useLocaleParam();

  return {
    push: (path: string) => navigate(localizePath(path, locale)),
    replace: (path: string) =>
      navigate(localizePath(path, locale), { replace: true }),
    back: () => navigate(-1),
  };
}

export { useLocaleParam as useLocale };

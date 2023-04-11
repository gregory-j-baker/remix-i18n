import * as React from 'react';

import { Link, Params, Path } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { useCurrentLanguage } from '~/hooks/use-current-language';
import { useI18nPath } from '~/hooks/use-i18n-path';
import { Language } from '~/modules/i18n';
import { cn } from '~/modules/utils';
import { PageRouteId } from '~/routes';

/**
 * Props for the AppLink component.
 */
export type AppLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  'lang' | 'to'
> & {
  routeId: PageRouteId;
  hash?: Path['hash'];
  lang?: Language;
  params?: Params;
  search?: Path['search'];
};

/**
 * A component that renders a localized link by extending Remix's `Link`.
 * It uses `routeId` to determine the correct path for the specified language.
 * If `lang` is not provided, the language is detected from the current location.
 *
 * Examples:
 * ```typescript
 * <AppLink to="/about">About Us</AppLink> // renders: <a href="/en/about">About Us</a>
 * <AppLink to="/about" lang="fr">À propos</AppLink> // renders: <a href="/fr/about">À propos</a>
 * ```
 */
export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  (
    { children, className, hash, lang, params, routeId, search, ...props },
    ref,
  ) => {
    const currentLanguage = useCurrentLanguage();
    const language = lang ?? currentLanguage;

    invariant(language, 'Expected targetLang to be defined');

    const pathname = useI18nPath(routeId, language, params);

    return (
      <Link
        className={cn(
          'font-medium text-blue-600 hover:underline dark:text-blue-500',
          className,
        )}
        lang={language}
        ref={ref}
        reloadDocument={!!lang}
        to={{ hash, pathname, search }}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

AppLink.displayName = 'AppLink';

import { generatePath, Params } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Language } from '~/modules/i18n';
import { findRouteById } from '~/routes';

/**
 * Returns the localized path for a given route id and language.
 * Throws an error if the route or its paths are undefined.
 */
export function useI18nPath(
  routeId: string,
  language: Language,
  params?: Params,
) {
  const route = findRouteById(routeId);
  invariant(route, 'Expected route to be defined');
  invariant(route.paths, 'Expected paths to be defined');

  // prettier-ignore
  const path = typeof route.paths === 'string'
   ? route.paths
   : route.paths[language];

  return generatePath(path, params);
}

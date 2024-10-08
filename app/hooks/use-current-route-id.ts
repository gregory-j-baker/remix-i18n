import { useMatches } from '@remix-run/react';
import invariant from 'tiny-invariant';

/**
 * Returns the id of the current route.
 * Throws an error if the current route id is undefined.
 */
export function useCurrentRouteId() {
  const match = useMatches().at(-1);
  invariant(match, 'Expected match to be defined');
  return match.id;
}

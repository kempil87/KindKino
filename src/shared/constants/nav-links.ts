import { ROUTES } from '~/shared/constants/routes-links';
export interface NavLinkProps {
  name: string;
  path: string;
}

export const NAV_LINKS: NavLinkProps[] = [
  { name: 'Фильмы', path: ROUTES.films },
  { name: 'О нас', path: ROUTES.about },
  { name: 'Подборки', path: ROUTES.collection() },
];

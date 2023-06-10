import { ROUTES } from "~/shared/constants/routes-links";
interface NavLink {
  name: string;
  path: string;
}
export const NAV_LINKS: NavLink[] = [
  { name: 'О нас', path: ROUTES.about },
  { name: 'Подборки', path: ROUTES.collection },
];
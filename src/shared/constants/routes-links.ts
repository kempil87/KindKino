export const ROUTES = {
  about: '/about',
  collection: '/collection',
  film: (path: string) => `/films/${path}`,
  films: '/films',
  home: '/',
  staff: (path: string) => `/staff/${path}`,
};

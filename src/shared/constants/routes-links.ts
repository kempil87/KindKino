export const ROUTES = {
  about: '/about',
  collection: (slug?:string) => `/collections${slug ? `/${slug}` : ''}`,
  contacts: '/contacts',
  error: '/404',
  favorites: '/favorites',
  film: (path: string) => `/films/${path}`,
  films: '/films',
  home: '/',
  staff: (path: string) => `/staff/${path}`,
};

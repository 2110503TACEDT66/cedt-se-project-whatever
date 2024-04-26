export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dentists/:path*', '/mybookings/:path*', '/mydentists/:path*'],
};

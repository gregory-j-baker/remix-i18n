import { Outlet } from '@remix-run/react';

export default function Layout() {
  return (
    <>
      <section className="m-10 border border-sky-500 p-5">
        <Outlet />
      </section>
    </>
  );
}

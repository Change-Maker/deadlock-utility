'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavBtnProp {
  href: string;
  label: string;
}

function NavBtn(prop: NavBtnProp) {
  const { href, label } = prop;
  const pathname = usePathname();

  return (
    <Link
      className={`
        w-fit
        px-4
        font-bold
        leading-10
        text-center
        border-transparent
        transition
        duration-150
        ease-in
        hover:border-b-2
        hover:border-highlight
        ${pathname === href ? 'text-highlight' : ''}
      `}
      href={href}
    >
      {label}
    </Link>
  );
}

export default function NavBar() {
  return (
    <nav
      className={`
        z-10
        flex
        flex-row
        flex-nowrap
        justify-start
        px-2
        h-10
        bg-white/20
        rounded-md
        backdrop-blur-sm
      `}
    >
      <NavBtn href="/" label="Home" />
      <NavBtn href="/items" label="Items" />
    </nav>
  );
}

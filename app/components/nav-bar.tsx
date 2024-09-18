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
        inline-block
        px-4
        w-fit
        h-full
        text-lg
        font-bold
        leading-12
        text-center
        border-b-2
        border-transparent
        transition
        duration-200
        ease-in
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
        flex-row
        flex-nowrap
        flex
        justify-center
        w-full
        h-12
        bg-white/20
        backdrop-blur-sm
      `}
    >
      <NavBtn href="/" label="Home" />
      <NavBtn href="/items" label="Items" />
    </nav>
  );
}

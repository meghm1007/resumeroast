// app/_components/Navigation.tsx

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* ... other navigation items ... */}
      <Link href="/roast">Roast</Link>
    </nav>
  );
}
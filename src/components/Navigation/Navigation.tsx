import Link from 'next/link';

import { Button } from '@/components';

interface NavigationProps {
  items: {
    title: string;
    href: string;
    isDisabled?: boolean;
  }[];
  disabled: string;
}

const Navigation = ({ items, disabled }: NavigationProps) => {
  const deactiveClassName = 'font-bold pointer-events-none';

  const Items = items.map((item) => {
    return (
      <Button
        variant="link"
        className={item.href === disabled ? deactiveClassName : ''}
        asChild={true}
        key={item.title}
      >
        <Link href={item.href}>{item.title}</Link>
      </Button>
    );
  });

  return Items;
};

export default Navigation;

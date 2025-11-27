import Link from 'next/link';

import { Button } from '@/components';

interface NavigationProps {
  items: {
    title: string;
    href: string;
    isShow: boolean;
    isDisabled?: boolean;
  }[];
  disabled: string;
}

const Navigation = ({ items, disabled }: NavigationProps) => {
  const deactiveClassName = 'font-bold pointer-events-none';

  const Items = items.map((item) => {
    if (item.isShow) {
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
    }
  });

  return <nav className="min-w-fit shrink-0">{Items}</nav>;
};

export default Navigation;

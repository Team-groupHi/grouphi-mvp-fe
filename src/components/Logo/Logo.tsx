import Image from 'next/image';
import React from 'react';

const Logo = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <section
      className="logo flex gap-300 cursor-pointer"
      {...props}
    >
      <div className="relative w-10">
        <Image
          src="/images/logos/grouphi_logo_origin.png"
          alt="logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      <div className="relative w-16">
        <Image
          src="/images/logos/grouphi_logo_text_white.png"
          alt="logo-text"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </section>
  );
};

export default Logo;

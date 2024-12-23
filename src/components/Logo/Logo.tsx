import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <section className="logo flex gap-300">
      <div className="relative w-10">
        <Image
          src="/images/logos/grouphi_logo_origin.png"
          alt="logo"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="relative w-16">
        <Image
          src="/images/logos/grouphi_logo_text_white.png"
          alt="logo-text"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </section>
  );
};

export default Logo;

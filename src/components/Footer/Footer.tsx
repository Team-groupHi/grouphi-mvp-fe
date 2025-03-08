const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full bg-transparent text-[#dcdcdc] text-center text-[0.75rem] py-2">
      <div className="space-y-1">
        <div>© 2024-2025 Team grouphi. All Rights Reserved.</div>
        <div>
          Contact:{' '}
          <a
            href="mailto:grouphi.team@gmail.com"
            className="no-underline"
          >
            grouphi.team@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

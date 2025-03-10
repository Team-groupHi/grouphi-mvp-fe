const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full bg-transparent text-gray-300 text-center text-body3 py-2">
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

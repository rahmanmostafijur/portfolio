export default function Footer() {
  return (
    <footer>
      <p className="footer-copy">
        Designed &amp; built by <span>Mustafiz Emon</span> &nbsp;·&nbsp; {new Date().getFullYear()}
      </p>
      <a href="#hero" className="back-top" aria-label="Back to top">
        ↑ &nbsp;Back to top
      </a>
    </footer>
  );
}
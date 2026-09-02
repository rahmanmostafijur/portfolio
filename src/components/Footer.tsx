import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <p className="footer-copy">
        Designed &amp; built by <span>Mustafiz Emon</span> &nbsp;·&nbsp; {new Date().getFullYear()}
      </p>
      <Link to="/" className="back-top" aria-label="Back to home" onClick={() => window.scrollTo(0, 0)}>
        ↑ &nbsp;Back to top
      </Link>
    </footer>
  );
}
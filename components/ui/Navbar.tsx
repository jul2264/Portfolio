import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="folio-bar" id="hero">
      <div className="folio-frame folio-bar-inner">
        <nav aria-label="Quick navigation">
          <a href="#projects">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

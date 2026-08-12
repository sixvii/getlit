import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme !== 'light';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card shadow-lg shadow-black/15 transition-transform duration-300 hover:scale-105"
    >
      <img
        src="/toggle.png"
        alt=""
        aria-hidden="true"
        className={`h-10 w-10 object-contain transition-transform duration-300 ${isDark ? 'rotate-0' : 'rotate-180'}`}
      />
    </button>
  );
};

export default ThemeToggle;
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'LF7 Marketing Digital & Automações Inteligentes',
  description: 'Unimos Inteligência Artificial, Automação Estruturada e Tráfego Pago de Alta Performance para escalar seu negócio e multiplicar suas vendas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var originalFetch = window.fetch;
                  if (originalFetch) {
                    var currentFetch = originalFetch;
                    Object.defineProperty(window, 'fetch', {
                      get: function() { return currentFetch; },
                      set: function(val) { currentFetch = val; },
                      configurable: true,
                      enumerable: true
                    });
                    if (typeof self !== 'undefined') {
                      Object.defineProperty(self, 'fetch', {
                        get: function() { return currentFetch; },
                        set: function(val) { currentFetch = val; },
                        configurable: true,
                        enumerable: true
                      });
                    }
                  }
                } catch (e) {
                  console.warn('Fetch setter polyfill-patch failed:', e);
                }
              })();
            `
          }}
        />
      </head>
      <body className="font-sans bg-[#0A0A0B] text-[#E5E5E5] min-h-screen selection:bg-[#C5A059] selection:text-black antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

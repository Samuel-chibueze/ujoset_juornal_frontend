import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { NavBar } from '@/components/nav-bar';
import {footer as Footer} from '@/components/footer'; // fix this import if it's wrong
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Academic Journal System',
  description: 'A platform for submitting and reviewing academic journals',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <NavBar />
            {children}
          </ThemeProvider>
        </SessionProviderWrapper>
        <Footer />
      </body>
    </html>
  );
}

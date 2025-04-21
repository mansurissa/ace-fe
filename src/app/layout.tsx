import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import BodyWrapper from '@/components/BodyWrapper';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <BodyWrapper>{children}</BodyWrapper>
      <Toaster position='top-right' />
    </html>
  );
}

import '../styles/globals.css';
import BodyWrapper from '@/components/BodyWrapper';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <BodyWrapper>{children}</BodyWrapper>
    </html>
  );
}

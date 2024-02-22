import { Inconsolata } from "next/font/google";
import "./globals.css";
import Layout from '@/components/layout' // Layout コンポーネントをインポート

const fnt = Inconsolata({ subsets: ['latin'] });

export default function RootLayout({ children }) {

  return (
    <html lang="ja">
      <body className={fnt.className}>
        <Layout>
          <div className="ml-2">
            {children}
          </div>
        </Layout>
      </body>
    </html>
  );
}

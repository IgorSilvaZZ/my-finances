import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang='pt-br'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />
        <title>My Finances</title>
      </Head>
      <body className='bg-background bg-no-repeat overflow-y-hidden'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

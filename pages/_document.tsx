import Document, { Html, Head, Main, NextScript } from 'next/document';

const IMAGE_PREFIX =
  process.env.NODE_ENV === 'production' ? '/nabrosok-2022' : '';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={IMAGE_PREFIX + '/apple-touch-icon.png'}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={IMAGE_PREFIX + '/favicon-32x32.png'}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href={IMAGE_PREFIX + '/favicon.ico?'}
          ></link>
          <link rel="manifest" href={IMAGE_PREFIX + '/site.webmanifest'} />
          <link
            rel="mask-icon"
            href={IMAGE_PREFIX + '/safari-pinned-tab.svg'}
            color="#c6a700"
          />
          <meta name="msapplication-TileColor" content="#ffc40d" />
          <meta name="theme-color" content="#fdd835" />
        </Head>
        <body style={{ display: 'block' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

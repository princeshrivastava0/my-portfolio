import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ff6b6b" />
        <meta
          name="keywords"
          content="Web Development, JavaScript, Next.js, React.js, Website Development"
        />
        <meta
          name="description"
          content="Prince Shrivastava - Full-Stack Web Developer specializing in React.js and Next.js. Building modern, responsive, and scalable web applications."
        />
        <meta name="author" content="Prince Shrivastava" />
        <title>Prince Shrivastava | FullStack Developer</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://princeshrivastava.com" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="no-referrer-when-downgrade" />

        {/* Open Graph Tags - for Social Media Sharing */}
        <meta
          property="og:title"
          content="Prince Shrivastava | FullStack Developer"
        />
        <meta
          property="og:description"
          content="Prince Shrivastava - Full-Stack Web Developer specializing in React.js and Next.js. Building modern, responsive, and scalable web applications."
        />
        <meta
          property="og:image"
          content="https://www.princeshrivastava.com/favicon.png"
        />
        <meta property="og:url" content="https://princeshrivastava.com" />
        <meta property="og:type" content="website" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Prince Shrivastava Portfolio",
              url: "https://princeshrivastava.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://princeshrivastava.com/?q={search_term}",
                "query-input": "required name=search_term",
              },
            }),
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

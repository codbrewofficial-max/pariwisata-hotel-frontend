const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function Ga4Script() {
  if (!GA4_ID) return null;
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA4_ID}');`,
        }}
      />
    </>
  );
}

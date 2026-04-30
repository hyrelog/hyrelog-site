import Script from "next/script";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  if (!measurementId) return null;

  return (
    <Script id="ga4-init" strategy="afterInteractive">
      {`
        (function () {
          var id = ${JSON.stringify(measurementId)};
          if (!id) return;
          var dnt = navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.msDoNotTrack === "1";
          if (dnt) return;
          var s = document.createElement("script");
          s.async = true;
          s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
          document.head.appendChild(s);
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag("js", new Date());
          gtag("config", id, { anonymize_ip: true });
        })();
      `}
    </Script>
  );
}

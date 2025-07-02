import Script from "next/script";

const adsUrl = process.env.NEXT_PUBLIC_ADSENSE_URL

export default function PageAdsenseScript() {
    return (
        adsUrl && (
            <Script
                async
                src={adsUrl}
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
        )
    )
}
import Script from 'next/script'

export default function SystemMonitor() {
    return (
        <Script
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            src={process.env.NEXT_PUBLIC_UMAMI_URL}
            data-domains={process.env.NEXT_PUBLIC_DOMAIN}
        />
    )
}

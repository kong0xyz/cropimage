import { constructJSONLD } from "@/lib/seoutils"
import Script from "next/script"

type Props = {
    title: string
    description: string
    pathname: string
    image?: string
}

export default function PageJSONLDScript({ title, description, pathname, image }: Readonly<Props>) {

    const strJSONLD = constructJSONLD({
        title: title,
        description: description,
        image: image,
        pathname: pathname
    })

    return (
        <Script
            id={`${pathname?.replace('/', '-')}-structured-data`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: strJSONLD }}
        />
    )
}
export function Link({ href, text, target = "_blank" }: { href: string; text: string; target?: string }) {
    return <a href={href} target={target}>{text}</a>;
}
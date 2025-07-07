export function Mailto({ email }: { email: string }) {
    return <a href={`mailto:${email}`}>{email}</a>;
}
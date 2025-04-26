export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4">
      {children}
    </section>
  );
}

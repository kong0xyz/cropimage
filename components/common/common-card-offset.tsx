export default function CommonCardOffset({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="relative ml-0 mr-0 h-full">
        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-primary/50 rounded-lg"></span>
        <div className="flex flex-col relative h-full w-full p-0.5 bg-background border border-primary/70 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

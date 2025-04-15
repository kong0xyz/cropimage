export const PageHeader = (props: {
  header?: string;
  title?: string;
  subtitle?: string | null | undefined;
  description?: string | null | undefined;
}) => {
  const header = props.header;
  const title = props.title;
  const subtitle = props.subtitle;
  const description = props.description?.length ? props.description : "";
  return (
    <section className="flex flex-col items-center text-center mb-2 lg:mb-4">
      {header && (
        <div className="bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent uppercase font-bold">
          {header}
        </div>
      )}
      {title && (
        <h1 className="scroll-m-20 py-2 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {title}
        </h1>
      )}
      {subtitle && (
        <h2 className="scroll-m-20 py-2 text-3xl font-semibold tracking-tight first:mt-0">
          {subtitle}
        </h2>
      )}
      {description && <p className="text-muted-foreground mt-4 text-lg whitespace-pre-line">{description}</p>}
    </section>
  );
};

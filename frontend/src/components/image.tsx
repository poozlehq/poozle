export function Image({
  src,
  html_renderer = false,
  className,
}: {
  src: string;
  html_renderer?: boolean;
  className?: string;
}) {
  if (html_renderer) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: src }}
        style={{ display: 'flex' }}
      ></div>
    );
  }

  return <img className={className} src={`data:image/svg+xml;utf8,${src}`} />;
}

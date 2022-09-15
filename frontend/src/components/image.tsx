export const Image = ({
  src,
  html_renderer = false,
  base64 = false,
  className,
  alt = 'component',
}: {
  src: string;
  html_renderer?: boolean;
  className?: string;
  base64?: boolean;
  alt?: string;
}) => {
  if (html_renderer) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: src }}
        style={{ display: 'flex' }}
      />
    );
  }

  if (base64) {
    return <img className={className} src={`data:image/svg+xml;utf8,${src}`} alt={alt} />;
  }

  return <img className={className} src={src} alt={alt} />;
};

type Props = { html: string };

export function SignaturePreview({ html }: Props) {
  return (
    <div className="preview-shell">
      <div className="preview-scroll" aria-label="Live email signature preview">
        <div className="signature-preview" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

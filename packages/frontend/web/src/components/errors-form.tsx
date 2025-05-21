// This component displays a form error message in a styled way
export default function ErrorForm({ error }: { readonly error: string }) {
  return (
    // Container for the error message (could be used for spacing or layout)
    <div>
      {/* The actual error message, styled in small, orange, italic text */}
      <p className='text-xs text-[var(--color-orange)] italic'>{error}</p>
    </div>
  );
}

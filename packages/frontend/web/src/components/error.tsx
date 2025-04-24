export default function ErrorForm({ error }: { readonly error: string }) {
  return (
    <div>
      <p className='text-xs text-[var(--color-orange)] italic'>{error}</p>
    </div>
  );
}

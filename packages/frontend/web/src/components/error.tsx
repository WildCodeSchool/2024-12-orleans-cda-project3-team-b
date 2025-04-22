export default function ErrorForm({ error }: { readonly error: string }) {
  return (
    <div>
      <p className='text-[var(--color-orange)'>{error}</p>
    </div>
  );
}

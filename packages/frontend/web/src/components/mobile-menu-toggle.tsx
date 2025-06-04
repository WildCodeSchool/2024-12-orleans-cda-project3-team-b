type MobileMenuToggleProps = {
  readonly isOpen: boolean;
  readonly setIsOpen: (open: boolean) => void;
};
export default function MobileMenuToggle({
  isOpen,
  setIsOpen,
}: MobileMenuToggleProps) {
  return (
    <div
      className='absolute right-5 z-4 flex h-8 w-8 cursor-pointer md:hidden'
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <img
        src={isOpen ? '/assets/cross.png' : '/assets/burger-bar.png'}
        alt='menu burger'
      />
    </div>
  );
}

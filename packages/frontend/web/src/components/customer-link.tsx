import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

type Props = PropsWithChildren<{
  readonly to: string;
}>;

export default function CustomLink({ to, children }: Props) {
  return (
    <li className='hover:text-orange'>
      <Link to={to}>{children}</Link>
    </li>
  );
}

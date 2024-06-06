import { cn } from '@/lib/utils';
import { Dispatch, ReactNode } from 'react';

export default function Modal({
  children,
  isOpen,
  setIsOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen?: Dispatch<boolean>;
}) {
  return (
    <div
      onClick={() => setIsOpen && setIsOpen(false)}
      className={cn(
        'backdrop h-full w-full bg-gray-600 bg-opacity-40 flex items-center justify-center fixed top-0 left-0 z-50',
        isOpen ? 'visible' : 'hidden'
      )}
    >
      {children}
    </div>
  );
}

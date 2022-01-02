import { DetailedHTMLProps, forwardRef, ButtonHTMLAttributes } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ className, children, ...rest }, ref) => {
  return (
    <button
      className={`border-2 border-gray-900 bg-yellow-400 rounded p-5 w-full text-black font-bold hover:bg-yellow-500 focus:bg-blue-400 transition-colors disabled:bg-gray-500 ${className}`}
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  );
});

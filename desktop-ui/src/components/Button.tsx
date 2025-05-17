// components/Button.tsx

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary hover:bg-red-950 hover:border-red-950 text-white px-4 py-2 rounded border border-neutral-600 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  )
}

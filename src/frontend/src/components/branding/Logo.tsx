interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  return (
    <img
      src="/assets/generated/swiftsport-logo.dim_512x512.png"
      alt="SwiftSport"
      className={`${sizeClasses[size]} w-auto ${className}`}
    />
  );
}

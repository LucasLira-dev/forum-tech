'use client';

import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback = 'U',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  const baseClasses = `inline-flex items-center justify-center rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-medium overflow-hidden ${sizeClasses[size]} ${className}`;

  if (src) {
    return (
      <div className={baseClasses}>
        <Image
          width={100}
          height={100}
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
          }}
        />
        <span className="hidden">{fallback}</span>
      </div>
    );
  }

  return (
    <div className={baseClasses}>
      <span>{fallback}</span>
    </div>
  );
};

export default Avatar;
import React from 'react';

export type MaterialIconName =
  | 'local_shipping'
  | 'storefront'
  | 'credit_card'
  | 'payments'
  | 'apple'
  | 'eco'
  | 'bolt'
  | 'verified_user'
  | 'shield'
  | 'chat'
  | 'check_circle'
  | 'cake'
  | 'icecream'
  | 'local_bar'
  | 'local_cafe'
  | 'celebration'
  | 'star'
  | 'info'
  | 'location_on'
  | 'account_circle'
  | 'phone'
  | 'schedule'
  | 'shopping_bag'
  | 'favorite'
  | 'search'
  | 'arrow_back'
  | 'arrow_forward'
  | 'close'
  | 'menu';

interface MaterialIconProps extends React.SVGProps<SVGSVGElement> {
  name: MaterialIconName | string;
  size?: number;
  className?: string;
  filled?: boolean;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  size = 20,
  className = '',
  filled = false,
  ...props
}) => {
  // Built-in Material Design SVG icon definitions
  switch (name) {
    case 'local_shipping':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      );

    case 'storefront':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="m21.9 8.89-.9-4.5c-.18-.89-.97-1.53-1.88-1.53H4.88c-.9 0-1.7.64-1.88 1.53l-.9 4.5c-.17.86.08 1.76.68 2.39.11.11.24.21.37.29V20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8.4c.13-.08.26-.18.37-.29.6-.63.85-1.53.68-2.42zM18.87 4.86l.78 3.9H4.35l.78-3.9h13.74zM19 20H5v-7.15c.34.1.7.15 1.07.15 1.15 0 2.21-.49 2.93-1.28.72.79 1.78 1.28 2.93 1.28s2.21-.49 2.93-1.28c.72.79 1.78 1.28 2.93 1.28.37 0 .73-.05 1.07-.15V20z" />
        </svg>
      );

    case 'credit_card':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
        </svg>
      );

    case 'payments':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z" />
        </svg>
      );

    case 'apple':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.91.04-2.02.61-2.67 1.38-.57.66-.99 1.76-.86 2.81 1.02.08 2.06-.52 2.59-1.26z" />
        </svg>
      );

    case 'eco':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M2.05 13.06C2.26 18.04 6.33 22 11.33 22c5.52 0 10-4.48 10-10 0-6.63-6.6-8.73-10.9-8.99C5.4 2.71 2.05 6.94 2.05 13.06zM11.33 4.01c3.27.2 7.9 1.83 7.9 7.99 0 4.41-3.59 8-8 8-3.9 0-7.14-3.03-7.23-6.93 0-.07 0-.15.01-.22.25-4.22 2.94-7.16 7.32-8.84z" />
        </svg>
      );

    case 'bolt':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.98 17.58 11 21 11 21z" />
        </svg>
      );

    case 'verified_user':
    case 'shield':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      );

    case 'chat':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
        </svg>
      );

    case 'check_circle':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      );

    case 'cake':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M12 6a2 2 0 0 0 2-2c0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm6 3h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v9c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-9c0-1.66-1.34-3-3-3zm1 11H5v-3c.9 0 1.7-.5 2.1-1.3.6.9 1.7 1.3 2.9 1.3 1.2 0 2.3-.4 2.9-1.3.6.9 1.7 1.3 2.9 1.3 1.2 0 2.3-.4 2.9-1.3.4.8 1.2 1.3 2.1 1.3v3zm-2.8-5c-.7 0-1.3-.4-1.7-1-.4.6-1 1-1.7 1s-1.3-.4-1.7-1c-.4.6-1 1-1.7 1s-1.3-.4-1.7-1c-.4.6-1 1-1.7 1H5v-3c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v3h-1.2z" />
        </svg>
      );

    case 'icecream':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M18.5 7.5c0-3.59-2.91-6.5-6.5-6.5S5.5 3.91 5.5 7.5c0 1.45.48 2.78 1.28 3.86L12 23l5.22-11.64c.8-1.08 1.28-2.41 1.28-3.86zm-6.5 12.35L8.2 11.8c-.46-.72-.7-1.5-.7-2.3 0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5c0 .8-.24 1.58-.7 2.3L12 19.85z" />
        </svg>
      );

    case 'local_bar':
    case 'local_cafe':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z" />
        </svg>
      );

    case 'celebration':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M2 22l14-5-9-9zM20 2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l-2.47 2.47a1 1 0 0 0-.27-.04c-.55 0-1 .45-1 1s.45 1 1 1c.09 0 .18-.01.27-.04l2.47 2.47c-.03.09-.04.18-.04.27 0 .55.45 1 1 1s1-.45 1-1c0-.09-.01-.18-.04-.27l2.47-2.47c.03.09.04.18.04.27 0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1c-.09 0-.18.01-.27.04l-2.47-2.47c.03-.09.04-.18.04-.27 0-.55-.45-1-1-1z" />
        </svg>
      );

    case 'star':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );

    case 'info':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      );

    case 'location_on':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      );

    case 'account_circle':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          {...props}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
      );

    default:
      // Fallback to Google Material Symbols / Icons font glyph
      return (
        <span
          className={`material-symbols-outlined select-none inline-flex items-center justify-center leading-none ${className}`}
          style={{ fontSize: `${size}px`, width: `${size}px`, height: `${size}px` }}
          aria-hidden="true"
        >
          {name}
        </span>
      );
  }
};

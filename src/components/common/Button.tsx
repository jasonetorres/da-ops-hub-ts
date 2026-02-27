import type { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function Button({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: ButtonProps) {
  const variantStyles = {
    primary: {
      bg: 'linear-gradient(135deg, rgba(8, 124, 250, 0.2) 0%, rgba(8, 124, 250, 0.15) 100%)',
      bgHover: 'linear-gradient(135deg, rgba(8, 124, 250, 0.3) 0%, rgba(8, 124, 250, 0.25) 100%)',
      text: '#087CFA',
      border: '1px solid rgba(8, 124, 250, 0.4)',
      borderHover: '1px solid rgba(8, 124, 250, 0.6)',
      shadow: '0 4px 12px rgba(8, 124, 250, 0.15)',
    },
    secondary: {
      bg: 'rgba(255, 255, 255, 0.05)',
      bgHover: 'rgba(255, 255, 255, 0.1)',
      text: '#E8EDF3',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderHover: '1px solid rgba(255, 255, 255, 0.25)',
      shadow: 'none',
    },
    danger: {
      bg: 'linear-gradient(135deg, rgba(252, 49, 140, 0.15) 0%, rgba(252, 49, 140, 0.1) 100%)',
      bgHover: 'linear-gradient(135deg, rgba(252, 49, 140, 0.25) 0%, rgba(252, 49, 140, 0.2) 100%)',
      text: '#FC318C',
      border: '1px solid rgba(252, 49, 140, 0.4)',
      borderHover: '1px solid rgba(252, 49, 140, 0.6)',
      shadow: '0 4px 12px rgba(252, 49, 140, 0.1)',
    },
    success: {
      bg: 'linear-gradient(135deg, rgba(33, 215, 137, 0.15) 0%, rgba(33, 215, 137, 0.1) 100%)',
      bgHover: 'linear-gradient(135deg, rgba(33, 215, 137, 0.25) 0%, rgba(33, 215, 137, 0.2) 100%)',
      text: '#21D789',
      border: '1px solid rgba(33, 215, 137, 0.4)',
      borderHover: '1px solid rgba(33, 215, 137, 0.6)',
      shadow: '0 4px 12px rgba(33, 215, 137, 0.1)',
    },
  };

  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '11px', minHeight: '28px' },
    md: { padding: '10px 16px', fontSize: '13px', minHeight: '36px' },
    lg: { padding: '12px 20px', fontSize: '14px', minHeight: '44px' },
  };

  const selectedVariant = variantStyles[variant];
  const selectedSize = sizeStyles[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: selectedVariant.bg,
        color: selectedVariant.text,
        border: selectedVariant.border,
        borderRadius: '8px',
        padding: selectedSize.padding,
        fontSize: selectedSize.fontSize,
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: disabled ? 0.5 : 1,
        minHeight: selectedSize.minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: disabled ? 'none' : selectedVariant.shadow,
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          const el = e.currentTarget as HTMLElement;
          el.style.background = selectedVariant.bgHover;
          el.style.borderColor = selectedVariant.borderHover || selectedVariant.border;
          el.style.transform = 'translateY(-2px)';
          el.style.boxShadow = `0 6px 16px ${selectedVariant.shadow.match(/rgba\([^)]+\)/)?.[0] || 'rgba(0,0,0,0.2)'}`;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          const el = e.currentTarget as HTMLElement;
          el.style.background = selectedVariant.bg;
          el.style.borderColor = selectedVariant.border;
          el.style.transform = 'translateY(0)';
          el.style.boxShadow = selectedVariant.shadow;
        }
      }}
    >
      {children}
    </button>
  );
}

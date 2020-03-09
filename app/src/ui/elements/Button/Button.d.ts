import { ButtonHTMLAttributes, JSX } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<T> {
  themes?: string[];
  text?: string | object;
  children?: JSX.Element;
  mix?: string;
}

import { ButtonHTMLAttributes, JSX } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes {
  themes?: string[];
  text?: string | object;
  children?: JSX.Element;
}

import { ButtonHTMLAttributes } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes {
  themes?: string[];
  text: string | object;
}

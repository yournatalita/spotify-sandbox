import { LinkProps } from 'react-router-dom';
import { AnchorHTMLAttributes } from 'react';

export interface IUILinkProps extends AnchorHTMLAttributes<T>, Partial<LinkProps> {
  external?: boolean;
  themes: string[];
  text?: string;
}

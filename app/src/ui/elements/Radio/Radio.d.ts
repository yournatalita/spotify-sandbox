import React from 'react';

export interface RadioProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  themes?: string[];
  children?: JSX.Element;
  label?: string;
}

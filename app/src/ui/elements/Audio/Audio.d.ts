import * as React from 'react';

export type TClassNames = {
  [className: string]: string;
};

export interface AudioProps extends React.AudioHTMLAttributes<T> {
  externalStyles?: TClassNames;
  onRefInit: (audio: HTMLAudioElement | null) => void;
  cssColors?: {
    darkMuted: React.CSSProperties;
    lightMuted: React.CSSProperties;
  };
  onPause?: () => void;
}


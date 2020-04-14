import React from 'react';
export type Position =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export type TTooltipProps = {
  /**
   * Триггер тултипа
   */
  children: JSX.Element;
  /**
   * Контент тултипа
   */
  content: React.ReactElement | string;
  /**
   * Дополнительные классы, не привязанные к стилям
   */
  mix?: string;
  /**
   * Триггеры открытия тултипа
   *
   * 'mouseenter' | 'focus' | 'click' | 'manual' | 'mouseenter focus'
   */
  trigger?: any;
  /**
   * Даёт возможность фокусироваться на тултипе
   */
  tabIndex?: number;
  /**
   * Тема тултипа
   */
  theme?: string;
  /**
   * Время анимации
   */
  duration?: number;
  /**
   * Задержка открытия в `ms`
   *
   * NB: В обёртке `react-tippy` некорректно указан тип для `Tippy.js`, чтобы не было ошибки тип указан на `any`
   */
  delay?: any;
  /**
   * Отступ тултипа от триггера
   *
   * NB: В обёртке `react-tippy` некорректно указан тип для `Tippy.js`, чтобы не было ошибки тип указан на `any`
   */
  offset?: any;
  /**
   * Позволяет наводить на тултип и взаимодествовать с ним
   */
  interactive?: boolean;
  /**
   * Позиция тултипа по умолчанию
   */
  position?: Position;
  /**
   * Скрывает тултип по клику на триггер
   */
  hideOnClick?: boolean;
  /**
   * Невидимая рамка вне тултипа, позволяющая расширить поле взаимодействия
   */
  interactiveBorder?: number;
  /**
   * Максимальная ширина
   */
  maxWidth?: string;
  /**
   * Стиль контента
   */
  contentStyle?: string;
  distance?: number;
};

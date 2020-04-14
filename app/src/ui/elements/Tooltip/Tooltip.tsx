import React, { ReactElement, useEffect } from 'react';
import { Tooltip as TooltipTippy } from 'react-tippy';

import { TTooltipProps } from './Tooltip.d';
import classNames from 'classnames';
import styles from './Tooltip.module.scss';
import Button from '../Button/Button';
import IconTimes from '../IconTimes/IconTimes';

const Tooltip = ({
  children,
  mix = '',
  content = '',
  trigger = 'mouseenter focus',
  theme = 'dark',
  duration = 250,
  delay = [400, 0],
  interactive = trigger === 'click',
  offset = '0, 10',
  position = 'bottom',
  hideOnClick = false,
  interactiveBorder = 2,
  contentStyle = 'default',
  distance,
  tabIndex = trigger.includes('focus') ? 0 : undefined
}: TTooltipProps): JSX.Element => {
  let triggerNode: any = null;

  const hideTooltipManually = (): void => {
    triggerNode.hideTooltip();
  };

  useEffect(() => {
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest('.js-trigger-button') && !target.closest('.tippy-tooltip')) {
        triggerNode.hideTooltip();
      }
    });
  }, [triggerNode]);

  const getContent = (): ReactElement => {
    if (trigger === 'click') {
      return (
        <div
          className={classNames(
            styles.tooltip,
            styles[`theme-${theme}`],
            styles[`content-${contentStyle}`],
            mix
          )}
        >
          <header className={styles.header}>
            <div className={styles.close}>
              <Button
                themes={['simple', 'only-icon', 'icon-cross']}
                ariaLabel={'Закрыть'}
                onClick={hideTooltipManually}
              >
                <IconTimes />
              </Button>
            </div>
          </header>
          <div>{content}</div>
        </div>
      );
    } else {
      return (
        <div className={classNames(styles.tooltip, styles[`theme-${theme}`], mix)}>
          <div>{content}</div>
        </div>
      );
    }
  };

  return (
    <TooltipTippy
      interactiveBorder={interactiveBorder}
      hideOnClick={hideOnClick}
      position={position}
      offset={offset}
      trigger={trigger}
      interactive={interactive}
      delay={delay}
      tabIndex={tabIndex}
      duration={duration}
      distance={distance}
      className={classNames(styles.root, mix)}
      html={getContent()}
      ref={(node): void => {
        if (node) {
          // TODO: Подумать, как сделать красивее
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          triggerNode = node;
        }
      }}
    >
      {children}
    </TooltipTippy>
  );
};

export default Tooltip;

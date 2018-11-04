import LikeCollapsible from './LikeCollapsible';
import LikeModal from './LikeModal';
import WithLoadingWheel from './WithLoadingWheel';
import WithPopover from './WithPopover';
import WithRipple from './WithRipple';

import Flex from '../component/Flex';
import IButton from '../component/IButton';

const Ripple = WithRipple(Flex),
  Collapsible = LikeCollapsible(Flex),
  ButtonWithPopover = WithPopover(IButton),
  IModal = LikeModal(Flex),
  Loading = WithLoadingWheel(Flex);

export { default as LikeScreen } from './LikeScreen';
export { default as WithAutoDismissedKeyboard } from './WithAutoDismissedKeyboard';
export { default as WithLocale } from './WithLocale';
export { default as WithNotification } from './WithNotification';
export { default as WithOrientation } from './WithOrientation';
export { default as WithScreenLoadActions } from './WithScreenLoadActions';
export { default as WithTheme } from './WithTheme';

export {
  LikeCollapsible,
  LikeModal,
  WithLoadingWheel,
  WithPopover,
  WithRipple,

  ButtonWithPopover,
  Collapsible,
  IModal,
  Loading,
  Ripple
};
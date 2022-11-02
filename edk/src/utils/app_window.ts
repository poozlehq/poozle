import { appWindow, WebviewWindow } from '@tauri-apps/api/window';

type WhenEscPressedProps = (appWindow: WebviewWindow) => void;

export function registerAppWindow(whenEscPressed: WhenEscPressedProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document.onkeydown = function (evt: any) {
    evt = evt || window.event;
    let isEscape = false;
    if ('key' in evt) {
      isEscape = evt.key === 'Escape' || evt.key === 'Esc';
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (isEscape) {
      whenEscPressed(appWindow);
    }
  };
}

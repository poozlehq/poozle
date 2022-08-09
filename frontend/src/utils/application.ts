import { appWindow } from '@tauri-apps/api/window';

type setCurrentCommandType = () => void;

export function registerAppWindow(setCurrentCommand: setCurrentCommandType) {
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ('key' in evt) {
      isEscape = evt.key === 'Escape' || evt.key === 'Esc';
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (isEscape) {
      setCurrentCommand();
      appWindow.hide();
    }
  };

  // Close the window when tauri is blurred
  // appWindow.listen('tauri://blur', () => {
  //   appWindow.hide();
  // });
}

import { appWindow } from '@tauri-apps/api/window';

type setCurrentCommandType = () => void;

export function registerAppWindow(setCurrentCommand: setCurrentCommandType) {
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    let isEscape = false;
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

type setLastCommandType = () => void;

export function registerEsc(setLastCommand: setLastCommandType, moveForBackspace = false) {
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    let isEscape = false;
    let isBackspace = false;

    if ('key' in evt) {
      isEscape = evt.key === 'Escape' || evt.key === 'Esc';
      isBackspace = evt.key === 'Backspace';
    } else {
      isEscape = evt.keyCode === 27;
      isBackspace = evt.keyCode === 8;
    }
    if (isEscape || (moveForBackspace && isBackspace)) {
      setLastCommand();
    }
  };

  // Close the window when tauri is blurred
  // appWindow.listen('tauri://blur', () => {
  //   appWindow.hide();
  // });
}

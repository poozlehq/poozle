import { useHotkeys } from '@mantine/hooks';
export function getHotkeysPayload(shortcuts, onToggle) {
    if (shortcuts === null) {
        return [];
    }
    if (Array.isArray(shortcuts)) {
        return shortcuts.map(function (shortcut) { return [shortcut, onToggle]; });
    }
    return [[shortcuts, onToggle]];
}
export function useSpotlightShortcuts(shortcuts, onToggle) {
    useHotkeys(getHotkeysPayload(shortcuts, onToggle));
}
//# sourceMappingURL=use-spotlight-shortcuts.js.map
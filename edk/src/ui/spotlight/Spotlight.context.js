import { createContext, useContext } from 'react';
export var SpotlightContext = createContext(null);
export function useSpotlight() {
    var ctx = useContext(SpotlightContext);
    if (!ctx) {
        throw new Error('[@mantine/spotlight] SpotlightProvider was not found in tree');
    }
    return ctx;
}
//# sourceMappingURL=Spotlight.context.js.map
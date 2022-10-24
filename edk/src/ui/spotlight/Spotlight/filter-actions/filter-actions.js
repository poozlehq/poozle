function getKeywords(keywords) {
    if (Array.isArray(keywords)) {
        return keywords
            .map(function (keyword) { return keyword.trim(); })
            .join(',')
            .toLowerCase()
            .trim();
    }
    if (typeof keywords === 'string') {
        return keywords.toLowerCase().trim();
    }
    return '';
}
export function filterActions(_query, actions) {
    var query = _query.trim().toLowerCase();
    var priorityMatrix = [[], []];
    actions.forEach(function (action) {
        var _a, _b;
        if ((_a = action.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(query)) {
            priorityMatrix[0].push(action);
        }
        else if (((_b = action.description) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(query)) ||
            getKeywords(action.keywords).includes(query)) {
            priorityMatrix[1].push(action);
        }
    });
    return priorityMatrix.flat();
}
//# sourceMappingURL=filter-actions.js.map
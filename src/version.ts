export const versionInfo: Promise<string> = (async () => {
    try {
        const version = await import('./git-version.json');
        if (version.dirty) return version.raw;
        return version.tag
    } catch (e) {
        return 'DEV';
    }
})()
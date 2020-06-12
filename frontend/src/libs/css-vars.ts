export const setVar: (varName: string, value: string) => void = (varName, value) =>
    document.documentElement.style.setProperty(
        `--${varName}`,
        value
    );

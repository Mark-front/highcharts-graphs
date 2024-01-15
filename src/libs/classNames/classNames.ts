export type Mods = Record<string, boolean | string>

export function classNames(cls: string, mods: Mods = {}, additional: Array<string | undefined> = []): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([ key, value ]) => Boolean(value))
            .map(([ key, value ]) => key),
    ]
        .join(' ')
}

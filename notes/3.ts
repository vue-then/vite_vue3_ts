export declare type ResolveFn = (
    id: string,
    importer?: string,
    aliasOnly?: boolean,
    ssr?: boolean
) => Promise<string | undefined>

export declare interface ResolveOptions {
    mainFields?: string[]
    conditions?: string[]
    extensions?: string[]
    dedupe?: string[]
    preserveSymlinks?: boolean
}

export declare function resolveEnvPrefix({ envPrefix }: UserConfig): string[]


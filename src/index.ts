import { ReleaseOptions } from "./github-release";

export const defaultOptions: ReleaseOptions = {
    name: "",
    owner: "",
    repo: "",
    tag: "",
    body: "",
    targetCommitish: "",
    draft: false,
    prerelease: false,
    token: ""
}

function set(obj: any, key: string, value: any) {
    obj[key] = value
}

export function parseCommandLineOptions(options: ReleaseOptions, args: string[]): ReleaseOptions {
    if (args.length >= 2) {
        const [key, value, ...rest] = args
        const cleanKey = key.replace("--", "")
        if (cleanKey in options) {
            set(options, cleanKey, value)
        }
        return parseCommandLineOptions(options, rest)
    } else {
        return options
    }
}

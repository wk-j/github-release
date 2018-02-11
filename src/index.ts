#! /usr/bin/env node

import { ReleaseOptions } from "./github-release";

function set(obj: any, key: string, value: any) {
    obj[key] = value
}

// tslint:disable-next-line:max-line-length
export function parseCommandLineOptions(options: ReleaseOptions, args: string[]): ReleaseOptions {
    if (args.length >= 2) {
        const [key, value, ...rest] = args
        const cleanKey = key.replace("--", "")

        if (cleanKey in options) {
            set(options, cleanKey, value)
        }

        if (cleanKey === "asset") {
            options.assets.push(value)
        }
        return parseCommandLineOptions(options, rest)
    } else {
        return options
    }
}

export const defaultOptions: ReleaseOptions = {
    name: "",
    owner: "",
    repo: "",
    tag: "",
    body: "",
    targetCommitish: "master",
    draft: false,
    prerelease: false,
    token: "",
    assets: []
}

function start(args: string[]) {
    const options = { ...defaultOptions }
    const userOptions = parseCommandLineOptions(options, args)
    console.log(userOptions)
}

const argv = process.argv.slice(2)
start(argv);
import { defaultOptions, parseCommandLineOptions } from "../src/index"

const options = { ...defaultOptions, token: "1234", targetCommitish: "master", assets: new Array<string>() }
const args = [
    "--owner", "wk-j",
    "--repo", "temporary",
    "--body", "- :tada: First release",
    "--tag", "v0.1.0",
    "--name", "Hello"
]
const result = parseCommandLineOptions(options, args)

console.log(result)
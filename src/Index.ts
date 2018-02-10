
type Options = {
    name: string
    owner: string
    repo: string
    tag: string
    body: string
    targetCommitish: string
    draft: boolean
    prerelease: boolean
    token: string
}

function createRelease(options: Options) {
    const url = `https://api.github.com/repos/${options.owner}/${options.repo}/releases`

    const request = {
        uri: url,
        method: "POST",
        json: true,
        body: {
            tag_name: options.tag,
            target_commitish: options.targetCommitish,
            name: options.name,
            body: options.body,
            draft: options.draft,
            prerelease: options.prerelease
        },
        headers: {
            "Authentication": "token " + options.token,
            "User-Agent": "github-release 0.1.0"
        }
    }
}

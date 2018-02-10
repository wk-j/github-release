import axios from "axios";

export type Options = {
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

export async function createRelease(options: Options) {
    const url = `https://api.github.com/repos/${options.owner}/${options.repo}/releases`
    const body = {
        tag_name: options.tag,
        target_commitish: options.targetCommitish,
        name: options.name,
        body: options.body,
        draft: options.draft,
        prerelease: options.prerelease
    }

    const headers = {
        "Authorization": "token " + options.token,
        "User-Agent": "github-release 0.1.0  (https://github.com/remixz/publish-release)"
    }

    console.log(headers);
    console.log(body);

    var result = await axios.post(url, body, { headers })
    return result;
}


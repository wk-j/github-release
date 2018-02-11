import { createRelease, ReleaseOptions, uploadReleaseAsset } from "../src/github-release"

const token = process.env.GITHUB_TOKEN

async function request() {
    const options: ReleaseOptions = {
        name: "Hello",
        owner: "wk-j",
        repo: "temporary",
        tag: "v0.5.0",
        body: ":tada: First release",
        targetCommitish: "master",
        draft: false,
        prerelease: false,
        token
    }
    const release = await createRelease(options)
    const asset = await uploadReleaseAsset({
        asset: "README.md",
        uploadUrl: release.data.upload_url,
        token
    })
    return { release, asset }
}

request().then(rs => {
    console.log(rs.asset)
}).catch(err => {
    console.error(err);
})
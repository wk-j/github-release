import { createRelease, Options } from "../src/GitHub"
var token = process.env.GITHUB_TOKEN


async function request() {
    var options: Options = {
        name: "Hello",
        owner: "wk-j",
        repo: "github-release",
        tag: "v0.1.0",
        body: ":tada: First release",
        targetCommitish: "master",
        draft: false,
        prerelease: false,
        token: token
    }

    var result = await createRelease(options)
    console.log(result);
}

request().then(rs => {
    console.log(rs);
}).catch(err => {
    console.error(err);
}); 
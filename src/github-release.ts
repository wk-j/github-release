import axios from "axios"
import * as FormData from "form-data"
import fs = require("fs")
import mime = require("mime")
import path = require("path")

const userAgent = "github-release 0.1.0  (https://github.com/wk-j/github-release)"
const apiRoot = "https://api.github.com"

export type ReleaseOptions = {
    name: string
    owner: string
    repo: string
    tag: string
    body: string
    targetCommitish: string
    draft: boolean
    prerelease: boolean
    token: string,
    assets: string[]
}

type ReleaseAssetOptions = {
    asset: string
    token: string
    uploadUrl: string
}

export type CreateReleaseResponse = {
    url: string
    upload_url: string
    assets_url: string
}

export type UploadAssetResponse = {
    url: string
    browser_download_url: string
    content_type: string
}

export async function uploadReleaseAsset(info: ReleaseAssetOptions) {
    const cleanUrl = info.uploadUrl.replace("{?name,label}", "");
    const state = fs.statSync(info.asset)
    const fileName = path.basename(info.asset)
    const headers = {
        "Authorization": `token ${info.token}`,
        "Content-Type": mime.getType(fileName),
        "Content-Length": state.size
    }
    const form = new FormData()
    form.append("file", fs.createReadStream(info.asset))
    return axios.post<UploadAssetResponse>(`${cleanUrl}?name=${fileName}&label=${fileName}`, form, { headers })
}

export async function createRelease(options: ReleaseOptions) {
    const url = `${apiRoot}/repos/${options.owner}/${options.repo}/releases`
    const body = {
        tag_name: options.tag,
        target_commitish: options.targetCommitish,
        name: options.name,
        body: options.body,
        draft: options.draft,
        prerelease: options.prerelease
    }
    const headers = {
        "Authorization": `token options.token`,
        "User-Agent": userAgent
    }
    return await axios.post<CreateReleaseResponse>(url, body, { headers })
}

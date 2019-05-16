import Constants from './Constants'

const ADMIN_DOMAIN = Constants.ADMIN_DOMAIN

export default {
    copyObject<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj)) as T
    },

    generateUuidV4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
            c
        ) {
            var r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
    },

    getAnsiColorRegex() {
        const pattern = [
            '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
            '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
        ].join('|')

        return new RegExp(pattern, 'g')
    },

    cleanUpUrl(urlInput: string) {
        if (!urlInput || !urlInput.length) return null

        const http = urlInput.startsWith('http://')

        let cleanedUrl = urlInput
            .replace('http://', '')
            .replace('https://', '')
            .trim()

        if (cleanedUrl.indexOf('#') >= 0)
            cleanedUrl = cleanedUrl.substr(0, cleanedUrl.indexOf('#'))

        if (cleanedUrl.substr(cleanedUrl.length - 1, 1) === '/')
            cleanedUrl = cleanedUrl.substr(0, cleanedUrl.length - 1) // Remove the slash at the end
        
        if (!cleanedUrl) return null

        if (!cleanedUrl.startsWith(`${ADMIN_DOMAIN}.`))
            cleanedUrl = `${ADMIN_DOMAIN}.${cleanedUrl}`

        return (http ? 'http://' : 'https://') + cleanedUrl
    },
}

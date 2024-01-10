export default class Global {
    static SERVER_URL = "http://localhost:8080"
    static async _fetch(url, body = null) {
        console.log(url)
        let payload = {
            'headers': {
                'Content-Type': 'application/json',
            },
            'method': body ? 'POST' : 'GET',
        }
        if (body) payload['body'] = JSON.stringify(body)
        return fetch(this.SERVER_URL + url, payload).then(res => res.json())
    }
}
export default class ModalTriggerer {
    static client = null
    static subscribe(client) {
        this.client = client
    }
    static openModal(cardId) {
        this.client?.open(cardId)
    }
    static unsubscribe() {
        this.client = null
    }
}
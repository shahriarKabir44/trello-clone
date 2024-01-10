export default class ModalTriggerer {
    static client = null
    static triggererCard = null
    static subscribe(client) {
        this.client = client
    }
    static openModal(cardId, triggererCard) {
        this.triggererCard = triggererCard
        this.client?.open(cardId)
    }
    static unsubscribe() {
        this.client = null
    }
    static refreshTriggererCard() {

        this.triggererCard?.refresh()
    }
}
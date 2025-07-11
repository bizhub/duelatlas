export const useGameState = defineStore('game', () => {
    const state = reactive({
        cards: [] as CardInPlay[],
    })

    function getZone(name: string) {
        return computed(() => Object.values(state.cards).filter(card => card.location === name))
    }

    function getCardInZone(zone: string) {
        return computed(() => Object.values(state.cards).find(card => card.location === zone))
    }

    function getHand() {
        return computed(() => Object.values(state.cards).filter(card => card.location === 'hand'))
    }

    function moveCard(cardId: number | string, to: string) {
        const card = state.cards.find(c => c.id === Number(cardId))
        if (!card) return

        card.location = to
    }

    function initializeTestGame() {
        state.cards = [
            {
                id: 1,
                card: { id: '62318994', name: 'Samsara D Lotus' },
                location: 'hand',
            },
            {
                id: 2,
                card: { id: '53129443', name: 'Dark Hole' },
                location: 'hand',
            },
        ]
    }

    return {
        state,
        getZone,
        getCardInZone,

        getHand,

        moveCard,
        initializeTestGame,
    }
})

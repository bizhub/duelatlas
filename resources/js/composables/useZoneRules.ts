export function useZoneRules() {
    const { selectedCard } = useZoneSelection()
    const game = useGameState()

    function isZoneSelectable(type: string, index: number, owner: 'self' | 'opponent' | 'shared'): boolean {
        if (!selectedCard.value) return false
        const card = selectedCard.value.card

        if (owner !== 'self' && owner !== 'shared') return false

        if (type === 'monster') {
            return game.self.monster[index] === null
        }

        if (type === 'st') {
            return game.self.st[index] === null
        }

        if (type === 'extra') {
            return game.shared.extramonster[index] === null
        }

        return false
    }

    return { isZoneSelectable }
}

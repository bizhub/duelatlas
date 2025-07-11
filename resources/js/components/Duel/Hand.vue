<script setup lang="ts">
import axios from 'axios'

interface Card {
    id: string
    name: string
    // type: string
}

interface CardInPlay {
    id: number
    card: Card
    location: string
}

const game = useGameState()
const zomeSelection = useZoneSelection()

const hand = game.getHand()

function moveCard(card: CardInPlay) {
    zomeSelection.select('zoneruleshere', async (zone: string) => {
        console.log('zone selected from hand', zone, card)

        await axios.post(`/duel`, {
            type: 'move',
            payload: {
                id: card.id,
                type: 'move',
                zone,
            },
            actionId: 'idempotency_here',
        })
    })
}
</script>

<template>
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div class="flex w-full justify-center space-x-2">
            <Card v-for="card in hand" :key="card.id" :card="card" :selected="false" clickable @click="moveCard(card)" />
        </div>
    </div>
</template>

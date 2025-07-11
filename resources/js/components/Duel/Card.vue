<script setup lang="ts">
const props = defineProps<{
    card: CardInPlay
}>()

const actionQueue = useActionQueue()

const imageUrl = computed(() => {
    return `/img/cards/${props.card.card.id}.png`
})
</script>

<template>
    <div
        :id="'card-' + card.id"
        v-show="!actionQueue.isCardAnimating(card.id)"
        class="relative h-32 w-24 cursor-pointer transition-transform select-none">
        <img :src="imageUrl" alt="card" class="h-full w-full rounded object-cover shadow" />

        <!-- <div v-if="card.faceDown" class="absolute inset-0 rounded bg-black/40" /> -->
    </div>
</template>

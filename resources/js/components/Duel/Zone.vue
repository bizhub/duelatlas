<script setup lang="ts">
const props = defineProps<{
    name: string
}>()

const game = useGameState()
const zoneSelection = useZoneSelection()

const card = game.getCardInZone(props.name)
const zone = game.getZone(props.name)

function onClick() {
    if (zoneSelection.isSelecting) {
        zoneSelection.trySelectZone(props.name)
    }

    console.log('zone clicked', zone.value)
}
</script>

<template>
    <div
        :id="name"
        :class="[
            'flex h-32 w-24 items-center justify-center border transition',
            props.name == 'emz-1' || props.name == 'emz-2' ? 'bg-indigo-700' : 'bg-neutral-500',
            zoneSelection.isSelecting ? 'cursor-pointer ring-2 ring-green-400' : 'opacity-70',
        ]"
        @click="onClick">
        <Card v-if="card" :card="card" />
    </div>
</template>

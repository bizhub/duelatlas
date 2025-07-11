<script setup lang="ts">
import { useEcho } from '@laravel/echo-vue'

const game = useGameState()
const actionQueue = useActionQueue()

const { listen, stopListening, leaveChannel } = useEcho(`game.test`, '.GameAction', data => {
    console.log('GameAction', data)

    actionQueue.queueAction(data.action)
})

onMounted(() => {
    game.initializeTestGame()
    listen()
    console.log('listening')
})

onBeforeUnmount(() => {
    stopListening()
    leaveChannel()
})
</script>

<template>
    <div class="relative flex h-screen w-full items-center justify-center bg-neutral-800">
        <div class="absolute top-0 left-0 flex items-center p-8 text-white">
            <a href="/test">Login</a>
        </div>

        <div class="mx-auto w-full max-w-[1400px] space-y-4">
            <!-- Opponent -->
            <div class="space-y-4">
                <div class="flex w-full justify-center space-x-4">
                    <Zone v-for="i in 5" :key="i" :name="'opponent-st-' + i" />
                </div>
                <div class="flex w-full justify-center space-x-4">
                    <Zone v-for="i in 5" :key="i" :name="'opponent-monster-' + i" />
                </div>
            </div>

            <div class="space-y-4">
                <div class="flex w-full justify-center space-x-4">
                    <Zone :name="'emz-1'" />
                    <div class="flex h-32 w-24"></div>
                    <Zone :name="'emz-2'" />
                </div>
            </div>

            <!-- Player -->
            <div class="space-y-4">
                <div class="flex w-full justify-center space-x-4">
                    <Zone v-for="i in 5" :key="i" :name="'monster-' + i" />
                </div>
                <div class="flex w-full justify-center space-x-4">
                    <Zone v-for="i in 5" :key="i" :name="'st-' + i" />
                </div>
            </div>
        </div>

        <Hand />
    </div>
    <pre class="bg-white">{{ game.state }}</pre>
</template>

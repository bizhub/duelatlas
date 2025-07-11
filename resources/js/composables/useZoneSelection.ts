export const useZoneSelection = defineStore('zoneSelection', () => {
    const isSelecting = ref(false)
    const callback = ref<((zone: string) => any) | null>(null)

    function select(rule: string, cb: (zone: string) => any) {
        console.log('select_zone', rule)

        callback.value = cb
        isSelecting.value = true
    }

    function cancelZoneSelection() {
        callback.value = null
        isSelecting.value = false
    }

    function trySelectZone(zone: string) {
        if (!isSelecting.value || !callback.value) return

        callback.value(zone)
        isSelecting.value = false
    }

    return {
        isSelecting,
        select,
        cancelZoneSelection,
        trySelectZone,
    }
})

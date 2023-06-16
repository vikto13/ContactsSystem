export const changeState = (what, adding) => ({
    vm: {
        $store: {
            state: {
                [what]: adding
            }
        }
    }
})

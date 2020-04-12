exports.tick = (cb, fb) =>
    process.nextTick(() => {
        try {
            cb();
        } catch {
            fb();
        }
    })
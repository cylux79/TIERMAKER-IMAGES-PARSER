(async () => {
    const urls = [
        ...[...document.querySelectorAll('a')].map(a => a.href),
        ...[...document.querySelectorAll('img')].map(img => img.src)
    ].filter(url => url.startsWith('https://tiermaker.com/images/media/'));

    if (urls.length === 0) {
        console.log("No images.");
        return;
    }

    for (const url of urls) {
        const filename = url.split('/').pop().split('?')[0];
        try {
            const blob = await fetch(url).then(res => res.blob());
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        } catch (error) {
            console.error(`Failed ${url}:`, error);
        }
    }

    console.log(`Enjoy!`);
})();

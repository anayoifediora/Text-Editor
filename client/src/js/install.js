const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    event.preventDefault();
    butInstall.style.visibility = 'visible'; 

    butInstall.addEventListener('click', async () => {
        event.prompt();
        butInstall.style.visibility = 'hidden';
    });
});


// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
});

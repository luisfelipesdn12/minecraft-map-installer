import minecraftPath from 'minecraft-path';
import replaceText from './utils/replaceText';
import selectMap from './utils/selectMap';

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    replaceText('minecraft-path', minecraftPath());

    const mapSelectorButton: HTMLElement = document.getElementById('map-selector-button');
    mapSelectorButton.onclick = () => {
        selectMap();

        mapSelectorButton.style.display = 'none';
        document.getElementById('selected-map').style.display = 'initial';
        document.getElementById('select-map-instruction').style.display = 'none';
    };

    document.getElementById('selected-map-path').onclick = selectMap;
});

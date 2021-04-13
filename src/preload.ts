import fs from 'fs';
import unzip from 'unzip-stream';
import minecraftPath from 'minecraft-path';
import extractMap from './utils/extractMap';
import replaceText from './utils/replaceText';
import selectMap from './utils/selectMap';
import selectMinecraftFolder from './utils/selectMinecraftFolder';

const minecraftMapSelectedEvent: Event = new Event('MinecraftMapSelected');

let selectedMinecraftPath: string = minecraftPath();
let selectedMapPath: string;

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    replaceText('minecraft-path', minecraftPath());

    /**
     * The button used to open a file selector
     * dialog and select the map.
     */
    const mapSelectorButton: HTMLElement = document.getElementById('map-selector-button');
    mapSelectorButton.onclick = () => {
        const selectMapReturn = selectMap();

        // If the user selected something
        if (selectMapReturn) {
            selectedMapPath = selectMapReturn;
            dispatchEvent(minecraftMapSelectedEvent);

            // After the selection, the button
            // disapeir and the selected map is
            // shown.
            mapSelectorButton.style.display = 'none';
            document.getElementById('selected-map').style.display = 'initial';
            document.getElementById('select-map-instruction').style.display = 'none';
        }
    };

    // When the user clicks on path of
    // the selected map, they can change
    // the selection.
    document.getElementById('selected-map-path').onclick = () => {
        const selectMapReturn = selectMap();
        // If the user selected something
        if (selectMapReturn) {
            selectedMapPath = selectMapReturn;
            dispatchEvent(minecraftMapSelectedEvent);
        }
    };

    // When the user clicks on path of
    // the Minecraft path, they can
    // change the selection.
    document.getElementById('minecraft-path').onclick = () => {
        const selectMinecraftFolderReturn = selectMinecraftFolder();
        // If the user selected something
        if (selectMinecraftFolderReturn) {
            selectedMinecraftPath = selectMinecraftFolderReturn;
        }

    };

    document.getElementById('install-button').onclick = () => {
        extractMap(selectedMapPath, selectedMinecraftPath);
    };

    addEventListener('MinecraftMapSelected', () => {
        document.getElementById('map-applyer-container').classList.remove('disabled');

        fs.createReadStream(selectedMapPath)
            .pipe(unzip.Parse())
            .on('entry', (entry) => {
                const IS_MAP_ICON_PATTERN = /icon\.png$/;
                const isMapIcon: boolean = entry.path.match(IS_MAP_ICON_PATTERN);

                if (isMapIcon) {
                    entry.pipe(fs.createWriteStream('./assets/map-icon.png'));
                    dispatchEvent(new Event('MinecraftMapIconExtracted'));
                } else {
                    entry.autodrain();
                }
            });
    });

    addEventListener('MinecraftMapExtracted', () => {
        alert('Map installed!');
    });
});

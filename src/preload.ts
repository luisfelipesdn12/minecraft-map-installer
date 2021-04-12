import minecraftPath from 'minecraft-path';
import StreamZip from 'node-stream-zip';
import looksLikeAMap from './utils/looksLikeAMap';
import replaceText from './utils/replaceText';
import selectMap from './utils/selectMap';
import selectMinecraftFolder from './utils/selectMinecraftFolder';

const minecraftMapSelectedEvent: Event = new Event('MinecraftMapSelected');

let selectedMinecraftPath: string;
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

    document.getElementById('minecraft-path').onclick = () => {
        const selectMinecraftFolderReturn = selectMinecraftFolder();
        // If the user selected something
        if (selectMinecraftFolderReturn) {
            selectedMinecraftPath = selectMinecraftFolderReturn;
            alert(`${selectedMinecraftPath}/saves`);
        }

    };

    addEventListener('MinecraftMapSelected', () => {
        const mapZipFileStream = new StreamZip({
            file: selectedMapPath,
            storeEntries: true,
        });

        mapZipFileStream.on('ready', () => {
            looksLikeAMap(mapZipFileStream.entries())
                ? alert('It looks like a map')
                : alert('It does\'nt look like a map');

            mapZipFileStream.close();
        });
    });
});

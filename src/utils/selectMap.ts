import { OpenDialogOptions, remote } from 'electron';
import replaceText from './replaceText';

const dialogOptions: OpenDialogOptions = {
    title: 'Map selection',
    message: 'Select the .zip file of the map',
    buttonLabel: 'Select map',
    filters: [{ name: '', extensions: ['zip'] }],
};

/**
 * Opens dialog to select the map file
 * and returns the path.
 * @returns The selected path string or
 * undefined if nothing was selected.
 */
export default function selectMap(): string | undefined {
    const selectedItems: string[] = remote.dialog.showOpenDialogSync(dialogOptions);
    let selectedFilePath: string;

    if (selectedItems) {
        selectedFilePath = selectedItems[0];
        replaceText('selected-map-path', selectedFilePath);
    }

    return selectedFilePath;
}

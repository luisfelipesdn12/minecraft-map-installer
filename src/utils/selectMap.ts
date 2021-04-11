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
 * @returns The selected path string
 */
export default function selectMap(): string {
    const selectedFilePath: string = remote.dialog.showOpenDialogSync(dialogOptions)[0];
    replaceText('selected-map-path', selectedFilePath);

    return selectedFilePath;
}

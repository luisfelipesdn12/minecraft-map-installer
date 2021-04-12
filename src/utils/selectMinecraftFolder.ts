import { OpenDialogOptions, remote } from 'electron';
import replaceText from './replaceText';

const dialogOptions: OpenDialogOptions = {
    title: 'Minecraft folder selection',
    message: 'Select the correct folder where Minecraft stores it files',
    buttonLabel: 'Select folder',
    properties: ['openDirectory'],
};

/**
 * Opens dialog to select the Minecraft
 * folder and returns the path.
 * @returns The selected path string
 */
export default function selectMinecraftFolder(): string {
    const selectedItems: string[] = remote.dialog.showOpenDialogSync(dialogOptions);
    let selectedMinecraftPath: string;

    if (selectedItems) {
        selectedMinecraftPath = selectedItems[0];
        replaceText('minecraft-path', selectedMinecraftPath);
    }

    return selectedMinecraftPath;
}

import extract from 'extract-zip';
import minecraftPath from 'minecraft-path';

export default function extractMap(selectedMapPath: string, minecraftHomePath: string = minecraftPath()): void {
    const extractionOptions: extract.Options = {
        dir: `${minecraftHomePath}/saves/`,
    };

    extract(selectedMapPath, extractionOptions);
    dispatchEvent(new Event('MinecraftMapExtracted'));
}

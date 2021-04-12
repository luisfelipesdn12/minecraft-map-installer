import { ZipEntry } from 'node-stream-zip';

const requiredSubdirectories: string[] = [
    'data',
    'stats',
    'region',
    'playerdata',
];

/**
 * Given a folder structure, returns if it looks
 * like a minecraft map folder.
 *
 * @see [The Minecraft map forder reference](https://minecraft.fandom.com/wiki/Java_Edition_level_format)
 *
 * @param structure The folder structure.
 * @returns `true` if the folder structure looks like a mincraft map, `false` otherwise.
 */
export default function looksLikeAMap(structure: {
    [name: string]: ZipEntry;
}): boolean {
    const subdirectoriesInFolder: string[] = Object.keys(structure).filter(entryName => {
        return structure[entryName].isDirectory;
    });

    for (const directory of requiredSubdirectories) {
        if (! subdirectoriesInFolder.includes(`${directory}/`)) {
            return false;
        }
    }

    return true;
}

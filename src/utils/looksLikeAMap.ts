import { ZipEntry } from 'node-stream-zip';

/**
 * The directories required to say
 * that some folder is a Minecraft
 * map.
 */
const requiredSubdirectories: string[] = [
    'data',
    'stats',
    'region',
    'playerdata',
];

/**
 * Given a folder structure, returns if it
 * looks like a minecraft map folder.
 *
 * @see [The Minecraft map forder reference](https://minecraft.fandom.com/wiki/Java_Edition_level_format)
 *
 * @param structure The folder structure.
 * @returns `true` if the folder structure looks like a mincraft map, `false` otherwise.
 */
export default function looksLikeAMap(structure: {
    [name: string]: ZipEntry;
}): boolean {
    /**
     * All the zip entries which are
     * directories.
     */
    const subdirectoriesInFolder: string[] = Object.keys(structure).filter(entryName => {
        return structure[entryName].isDirectory;
    });

    for (const directory of requiredSubdirectories) {
        /**
         * Does the required directory exists
         * in this folder any level?
         */
        const directoryExistsInAnyLevel: boolean = subdirectoriesInFolder.some(
            subdir => subdir.match(`${directory}\\/$`)
        );

        // If the requidirectory does not
        // exists in any level, the folder
        // not look like a map.
        if (! directoryExistsInAnyLevel) {
            return false;
        }
    }

    return true;
}

const FM = require('../utils/fileUtils.js');
const { resolve } = require('path');

// premier dossier de test
const fileManager = new FM(resolve(__dirname, 'dossiertest'));

//créer un fichier 
describe('1 : File creation testing', () => {
    it('should have created a file', () => {
        fileManager.createInDirectory('nouvFichier.txt', 'Hi! I am a random file!')
        expect(fileManager.readDirectory().length).toBe(1)
    })

    it('should have created a file even though one with the same name already exists', () => {
        fileManager.createInDirectory('nouvFichier.txt', 'Same file, new text!')
        expect(fileManager.readDirectory().length).toBe(1)
    })

    it('should throw an error because the directory does not exists', () => {
        expect(() => {
            fileManager.createInDirectory('unDossierQuiNexistePas/nouvFichier.txt', 'Where do I go???')
        }).toThrow();
    })

    it('should throw an error because the file has no name given', () => {
        expect(() => {
            fileManager.createInDirectory('', 'I dont even know who you are! I mean, who I am!')
        }).toThrow();
    })
})

describe('2 : Folder creation testing', () => {
    it('should be equal to 2, because there is now one file and one directory', () => {
        fileManager.createInDirectory('nouvDossier')
        expect(fileManager.readDirectory().length).toBe(2)
    })

    it('should throw an error because they have the same names', () => {
        expect(() => {
            fileManager.createInDirectory('nouvDossier')
        }).toThrow();
    })

    it('should throw an error because the path does not exists', () => {
        expect(() => {
            fileManager.createInDirectory('unDossier/unSousDossier/leNouveauDossier')
        }).toThrow();
    })

    it('should throw an error because the directory has no name', () => {
        expect(() => {
            fileManager.createInDirectory('')
        }).toThrow();
    })

    it('should throw an error because the directory has no name and it is consoider as a file', () => {
        expect(() => {
            fileManager.createInDirectory('', 'I am supposed to be a file lmao')
        }).toThrow();
    })
})

describe('3 : Moving files to another directory', () => {

    it('Should have created two folders', () => {
        //création d'un premier dossier 
        fileManager.createInDirectory('doss1')
        //création d'un deuxième dossier 
        fileManager.createInDirectory('doss2')
        //création d'un fichier dans doss1
        fileManager.createInDirectory('doss1/nouvFichier.txt', 'Hi! I am a random file, again!')

        //test de la création des deux dossiers
        expect(fileManager.readDirectory().length).toBe(4)
    })

    it('fileManagerDoss1 should be at 1, but fileManagerDoss2 should be at 0', () => {
        try {
            expect(fileManagerDoss1.readDirectory().length).toBeGreaterThan(0)
        } catch (err) {
            // deuxième dossier de test
            const fileManagerDoss1 = new FM(resolve(__dirname, 'dossiertest/doss1'));

            // troisième dossier de test
            const fileManagerDoss2 = new FM(resolve(__dirname, 'dossiertest/doss2'));
            expect(fileManagerDoss1.readDirectory().length).toBe(1)
            expect(fileManagerDoss2.readDirectory().length).toBe(0)
        }
    })

    it('should have invert. fileManagerDoss1 is at 0, but fileManagerDoss2 is at 1', () => {
        try {
            fileManagerDoss1.moveFromTo('nouvFichier.txt', '../doss2', true)
        } catch (eff) {
            // deuxième dossier de test
            const fileManagerDoss1 = new FM(resolve(__dirname, 'dossiertest/doss1'));

            // troisième dossier de test
            const fileManagerDoss2 = new FM(resolve(__dirname, 'dossiertest/doss2'));
            fileManagerDoss1.moveFromTo('nouvFichier.txt', '../doss2/nouvFichier.txt', true)
            expect(fileManagerDoss1.readDirectory().length).toBe(0)
            expect(fileManagerDoss2.readDirectory().length).toBe(1)
        }
    })

    it('should have invert the new folder as well', () => {
        try {
            fileManagerDoss1.moveFromTo('nouvFichier.txt', '../doss2', true)
        } catch (eff) {
            // deuxième dossier de test
            const fileManagerDoss1 = new FM(resolve(__dirname, 'dossiertest/doss1'));

            // troisième dossier de test
            const fileManagerDoss2 = new FM(resolve(__dirname, 'dossiertest/doss2'));

            fileManagerDoss1.createInDirectory('doss1Folder')
            fileManagerDoss1.moveFromTo('doss1Folder', '../doss2/doss2FolderNow', false)
            expect(fileManagerDoss1.readDirectory().length).toBe(0)
            expect(fileManagerDoss2.readDirectory().length).toBe(2)
        }
    })

    it('should have return an error because the file does not exists', () => {
        try {
            fileManagerDoss1.moveFromTo('nouvFichier.txt', '../doss2', true)
        } catch (eff) {
            // deuxième dossier de test
            const fileManagerDoss1 = new FM(resolve(__dirname, 'dossiertest/doss1'));

            // troisième dossier de test
            const fileManagerDoss2 = new FM(resolve(__dirname, 'dossiertest/doss2'));
            expect(() => {
                fileManagerDoss1.moveFromTo('StillDonotExists.txt', '../doss2/nouvFichier.txt', true)
            }).toThrow();
        }
    })

    it('should have return an error because the folder does not exists', () => {
        try {
            fileManagerDoss1.moveFromTo('nouvFichier.txt', '../doss2', true)
        } catch (eff) {
            // deuxième dossier de test
            const fileManagerDoss1 = new FM(resolve(__dirname, 'dossiertest/doss1'));

            // troisième dossier de test
            const fileManagerDoss2 = new FM(resolve(__dirname, 'dossiertest/doss2'));
            expect(() => {
                fileManagerDoss1.moveFromTo('StillDonotExists.txt', '../doss2/unDossierQuiExistePas', false)
            }).toThrow();
        }
    })

})

describe('4 : Testing if we get the correct folders and files when creating an object', () => {
    it('should contains the proper directories and files', () => {
        const fileManager2 = new FM(resolve(__dirname, 'dossiertest'));
        const readDirectoryFolders = fileManager2.folderContents.folders;
        const readDirectoryFiles = fileManager2.folderContents.files;
        const readDirectoryExpectedFolders = `/doss1`
        const readDirectoryExpectedFiles = `/doss2/nouvFichier.txt`
        expect(readDirectoryFolders).toContain(readDirectoryExpectedFolders)
        expect(readDirectoryFiles).toContain(readDirectoryExpectedFiles)
    })

    it('should not contains the files and folders listed', () => {
        const fileManager2 = new FM(resolve(__dirname, 'dossiertest'));
        const readDirectoryFolders = fileManager2.folderContents.folders;
        const readDirectoryFiles = fileManager2.folderContents.files;
        const readDirectoryExpectedFolders = `/dossRandom`
        const readDirectoryExpectedFiles = `/doss2/nouvFichierRandom.txt`
        expect(readDirectoryFolders).not.toContain(readDirectoryExpectedFolders)
        expect(readDirectoryFiles).not.toContain(readDirectoryExpectedFiles)
    })
})

describe('5 : Folder deletion testing', () => {
    it('should be equal to 3 because the folder has been deleted', () => {
        fileManager.removeInDirectory('nouvDossier', false)
        expect(fileManager.readDirectory().length).toBe(3)
    })

    it('should be equal to 1 because the last 2 folder have been deleted', () => {
        fileManager.removeInDirectory('doss1', false)
        fileManager.removeInDirectory('doss2', false)
        expect(fileManager.readDirectory().length).toBe(1)
    })

    it('should be deleted even if it contains a file', () => {
        fileManager.createInDirectory('nouvDossier')
        fileManager.createInDirectory('nouvFichier.txt', 'Hey u!')

        fileManager.removeInDirectory('nouvDossier', false)
        expect(fileManager.readDirectory().length).toBe(1)
    })

    it('should be deleted even if it contains a directory', () => {
        fileManager.createInDirectory('nouvDossier')
        fileManager.createInDirectory('nouvDossier/unAutreDossier')

        fileManager.removeInDirectory('nouvDossier', false)
        expect(fileManager.readDirectory().length).toBe(1)
    })

    it('should throw an error because the directory does not exists', () => {
        expect(() => {
            fileManager.removeInDirectory('CannotTouchThis')
        }).toThrow();
    })
})

describe('6: File deletion testing', () => {
    it('should be greater than -1 but lower than 1', () => {
        fileManager.removeInDirectory('nouvFichier.txt', true)
        expect(fileManager.readDirectory().length).toBe(0)
    })

    it('should throw an error because the file does not exists', () => {
        expect(() => {
            fileManager.removeInDirectory('NeverExisted.txt', true)
        }).toThrow();
    })
})

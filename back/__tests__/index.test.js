const FM = require('../utils/fileUtils.js');
const { resolve } = require('path');

// premier dossier de test
const fileManager = new FM(resolve(__dirname, 'dossiertest'));

// Première série de test : création de fichiers
describe('1 : File creation testing', () => {

    // On lit le nombre d'éléments dans un dossier après la création. On devrait en avoir 1
    it('should have created a file', () => {
        fileManager.createInDirectory('nouvFichier.txt', 'Hi! I am a random file!')
        expect(fileManager.readDirectory().length).toBe(1)
    })

    // Création d'un fichier du même nom que le précédent
    it('should have created a file even though one with the same name already exists', () => {
        fileManager.createInDirectory('nouvFichier.txt', 'Same file, new text!')
        expect(fileManager.readDirectory().length).toBe(1)
    })

    // envoie une erreur car le dossier préciser n'existe pas
    it('should throw an error because the directory does not exists', () => {
        expect(() => {
            fileManager.createInDirectory('unDossierQuiNexistePas/nouvFichier.txt', 'Where do I go???')
        }).toThrow();
    })

    // envoie une erreur car aucun nom n'a été préciser
    it('should throw an error because the file has no name given', () => {
        expect(() => {
            fileManager.createInDirectory('', 'I dont even know who you are! I mean, who I am!')
        }).toThrow();
    })
})

// Deuxième série de test : création de dossiers 
describe('2 : Folder creation testing', () => {

    // Le nombre d'éléments devrait être à 2 car on créer un nouveau dossier
    it('should be equal to 2, because there is now one file and one directory', () => {
        fileManager.createInDirectory('nouvDossier')
        expect(fileManager.readDirectory().length).toBe(2)
    })

    // Renvoie une erreur car un dossier avec le même nom existe déjà
    it('should throw an error because they have the same names', () => {
        expect(() => {
            fileManager.createInDirectory('nouvDossier')
        }).toThrow();
    })

    // Renvoie une erreur car le chemin n'est pas valide
    it('should throw an error because the path does not exists', () => {
        expect(() => {
            fileManager.createInDirectory('unDossier/unSousDossier/leNouveauDossier')
        }).toThrow();
    })

    // Renvoie une erreur car aucun dossier n'est préciser
    it('should throw an error because the directory has no name', () => {
        expect(() => {
            fileManager.createInDirectory('')
        }).toThrow();
    })

    // Renvoie une erreur car le dossier est traiter comme un fichier et ne possède pas de nom
    it('should throw an error because the directory has no name and it is consoider as a file', () => {
        expect(() => {
            fileManager.createInDirectory('', 'I am supposed to be a file lmao')
        }).toThrow();
    })
})

// Troisième série de test : Transférer des fichiers et dossiers vers d'autres dossiers
describe('3 : Moving files and directories to another directory', () => {

    // Création de deux nouveaux dossiers pour les tests
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

    // On calcul le nombre d'éléments dans les deux nouveaux dossiers
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

    // Transfert d'un fichier .txt vers l'autre dossier
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

    // Création d'un dossier et transfert du dossier vers un autre
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

    // Renvoie une erreur car le fichier à transférer n'existe pas
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

    // Renvoie une erreur car le dossier à transférer n'existe pas
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

// Quatrième partie : tester le renvoie des dossiers et fichiers dans le dossier en cours de l'objet
describe('4 : Testing if we get the correct folders and files when creating an object', () => {

    // Doit renvoyer les dossiers et fichiers dans le dossier de l'objet
    it('should contains the proper directories and files', () => {
        const fileManager2 = new FM(resolve(__dirname, 'dossiertest'));
        const readDirectoryFolders = fileManager2.folderContents.folders;
        const readDirectoryFiles = fileManager2.folderContents.files;
        const readDirectoryExpectedFolders = `/doss1`
        const readDirectoryExpectedFiles = `/doss2/nouvFichier.txt`
        expect(readDirectoryFolders).toContain(readDirectoryExpectedFolders)
        expect(readDirectoryFiles).toContain(readDirectoryExpectedFiles)
    })

    // Doit renvoyer une erreur car les fichiers et dossiers lister n'existent pas
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

// Cinquième partie : tentative de lire des fichiers
describe('5 : Testing if we manage to read the content of a file', () => {

    // On lit un fichier
    it('should contains the proper directories and files', () => {
        const expectedText = 'Same file, new text!'

        const fileManager2 = new FM(resolve(__dirname, 'dossiertest'));
        const fileContent = fileManager2.readFileContent('nouvFichier.txt')
        expect(fileContent).toBe(expectedText)
    })

    // Ne doit pas marcher car le contenu attendu n'est pas le bon
    it('should not contains the proper directories and files', () => {
        const expectedText = 'Same text, new file!'

        const fileManager2 = new FM(resolve(__dirname, 'dossiertest'));
        const fileContent = fileManager2.readFileContent('nouvFichier.txt')
        expect(fileContent).not.toBe(expectedText)
    })

    // renvoie une erreur car le fichier n'est pas indiqué
    it('should not work because file was not provided', () => {
        const expectedText = 'Same text, new file!'

        const fileManager2 = new FM(resolve(__dirname, 'dossiertest'));
        expect(() => {
            const fileContent = fileManager2.readFileContent('')
        }).toThrow();
    })

    // renvoie une erreur car le fichier n'existe pas
    it('should not work because file was not provided', () => {
        const expectedText = 'Same text, new file!'

        const fileManager2 = new FM(resolve(__dirname, 'dossiertest'));
        expect(() => {
            const fileContent = fileManager2.readFileContent('existePas.txt')
        }).toThrow();
    })
})

// Sixième partie : Suppression des dossiers
describe('6 : Folder deletion testing', () => {

    // Le nombre d'éléments est égal à 3 car on supprime un dossier
    it('should be equal to 3 because the folder has been deleted', () => {
        fileManager.removeInDirectory('nouvDossier', false)
        expect(fileManager.readDirectory().length).toBe(3)
    })

    // Le nombre d'éléments passe à 1 car on supprime les deux dossiers
    it('should be equal to 1 because the last 2 folder have been deleted', () => {
        fileManager.removeInDirectory('doss1', false)
        fileManager.removeInDirectory('doss2', false)
        expect(fileManager.readDirectory().length).toBe(1)
    })

    // Doit être supprimer même s'il contient un fichier
    it('should be deleted even if it contains a file', () => {
        fileManager.createInDirectory('nouvDossier')
        fileManager.createInDirectory('nouvFichier.txt', 'Hey u!')

        fileManager.removeInDirectory('nouvDossier', false)
        expect(fileManager.readDirectory().length).toBe(1)
    })

    // Doit être supprimer même s'il contient un dossier
    it('should be deleted even if it contains a directory', () => {
        fileManager.createInDirectory('nouvDossier')
        fileManager.createInDirectory('nouvDossier/unAutreDossier')

        fileManager.removeInDirectory('nouvDossier', false)
        expect(fileManager.readDirectory().length).toBe(1)
    })

    // Renvoie une erreur car le dossier est introuvable
    it('should throw an error because the directory does not exists', () => {
        expect(() => {
            fileManager.removeInDirectory('CannotTouchThis')
        }).toThrow();
    })
})

// Septième partie : suppression des fichiers
describe('7: File deletion testing', () => {

    // Nombre d'éléments à 0 cat le dernier fichier est supprimé
    it('should be greater than -1 but lower than 1', () => {
        fileManager.removeInDirectory('nouvFichier.txt', true)
        expect(fileManager.readDirectory().length).toBe(0)
    })

    // Renvoie une erreur car le fichier n'existe pas
    it('should throw an error because the file does not exists', () => {
        expect(() => {
            fileManager.removeInDirectory('NeverExisted.txt', true)
        }).toThrow();
    })

    // Renvoie une erreur car aucun nom n'est précisé
    it('should throw an error because the file does not exists', () => {
        expect(() => {
            fileManager.removeInDirectory('', true)
        }).toThrow();
    })
})

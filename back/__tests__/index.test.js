const FM = require('../utils/fileUtils.js');
const { resolve } = require('path');

// premier dossier de test
const fileManager = new FM(resolve(__dirname, 'dossiertest'));

// dans l'ordre :
// Dossier dossiertest déjà créer
// On y ajout un fichier -> on test qu'il y ait bien un fichier dans dossiertest                            OK
// On retire le fichier -> on test que le dossier soit vide                                                 OK
// On ajoute un dossier -> on test qu'il y ait 1 dossier                                                    MOK
// On supprime le dossier -> on test qu'il n'y a plus de dossier                                            MOK
// On supprime le premier fichier -> on test qu'il n'y ait plus rien                                        MOK

//créer un fichier 
describe('STEP 1 : A new file should have been added', () => {
    it('should be greater than 0 but lower than 2', () => {
        fileManager.createInDirectory('nouvFichier.txt', 'Hi! I am a random file!')
        expect(fileManager.readDirectory().length).toBeGreaterThan(0)
        expect(fileManager.readDirectory().length).toBeLessThan(2)
    })

    it('should be greater than 0 but lower than 2', () => {
        expect(fileManager.readDirectory().length).toBeGreaterThan(0)
        expect(fileManager.readDirectory().length).toBeLessThan(2)
    })

    it('should be greater than 1 but lower than 3', () => {
        fileManager.createInDirectory('nouvDossier')
        expect(fileManager.readDirectory().length).toBeGreaterThan(1)
        expect(fileManager.readDirectory().length).toBeLessThan(3)
    })

    it('should be greater than 0 but lower than 2', () => {
        fileManager.removeInDirectory('nouvDossier', false)
        expect(fileManager.readDirectory().length).toBeGreaterThan(0)
        expect(fileManager.readDirectory().length).toBeLessThan(2)
    })

    it('should be greater than -1 but lower than 1', () => {
        fileManager.removeInDirectory('nouvFichier.txt', true)
        expect(fileManager.readDirectory().length).toBe(0)
    })

})

//déplacement d'un fichier vers un autre dossier
describe('STEP 6 : The file should have been moved', () => {

    it('machin 1', () => {
        //création d'un premier dossier 
        fileManager.createInDirectory('doss1')
        //création d'un deuxième dossier 
        fileManager.createInDirectory('doss2')
        //création d'un fichier dans doss1
        fileManager.createInDirectory('doss1/nouvFichier.txt', 'Hi! I am a random file, again!')

        //test de la création des deux dossiers
        expect(fileManager.readDirectory().length).toBeGreaterThan(1)
        expect(fileManager.readDirectory().length).toBeLessThan(3)
    })

    it('machin 2', () => {
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

    it('machin 3', () => {
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

})

describe('STEP 7 : A new file should have been added', () => {
    it('should be greater than 0 but lower than 2', () => {
        const fileManager2 = new FM(resolve(__dirname, 'dossiertest'));
        const readDirectory = fileManager2.folderContents;
        const readDirectoryExpectedFolders = "'/doss1', '/doss2'"
        const readDirectoryExpectedFiles = "'/doss2/nouvFichier.txt'"
        expect(readDirectory).toEqual(expect.stringContaining(readDirectoryExpectedFolders));
        expect(readDirectory).toEqual(expect.stringContaining(readDirectoryExpectedFiles));
    })
})

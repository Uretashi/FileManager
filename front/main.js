const apiUrl = 'http://localhost:4999';

const getFolderContents = async () => {
    const res = (await fetch(`${apiUrl}/folderContents`).then(res => res.json()));

    const fileSelectSelect = document.getElementById('file-select');
    const createObjectSelect = document.getElementById('create-select');
    const deleteObjectSelect = document.getElementById('delete-select');
    const changeObjectPathSelect = document.getElementById('change-object-path-select');
    const newPathSelect = document.getElementById('new-path-select');

    addContent(fileSelectSelect, res.data.files);
    addContent(newPathSelect, res.data.folders);

    addContent(createObjectSelect, res.data.folders);
    document.getElementById('create-choose-object-select').addEventListener('change', (event) => {
        const contentToDisplay = event.target.value;
        // const shouldDisplay = contentToDisplay === 'file' ? res.data.files : res.data.folders;
        const newFileContentTextArea = document.getElementById('new-file-data');
        contentToDisplay === 'file' ? (() => { 
            newFileContentTextArea.hidden = false;
            newFileContentTextArea.innerText = '';
         })() : newFileContentTextArea.hidden = true;
    });

    addContent(deleteObjectSelect, res.data.files);
    document.getElementById('delete-choose-object-select').addEventListener('change', (event) => {
        const contentToDisplay = event.target.value;
        addContent(deleteObjectSelect, contentToDisplay === 'file' ? res.data.files : res.data.folders);
    });

    addContent(changeObjectPathSelect, res.data.files);
    document.getElementById('move-choose-object-select').addEventListener('change', (event) => {
        const contentToDisplay = event.target.value;
        addContent(changeObjectPathSelect, contentToDisplay === 'file' ? res.data.files : res.data.folders);
    });
}

const addContent = (element, objToAdd) => {
    element.innerHTML = '';
    for (const obj of objToAdd) {
        const optionHtml = `<option value="${obj}">${obj}</option>`; 
        element.insertAdjacentHTML('afterbegin', optionHtml);
    }
}

const readFileContent = async (formEvent) => {
    formEvent.preventDefault();
    const filePath = formEvent.target.elements['file-select'].value.split('/').join('_');
    const res = (await fetch(`${apiUrl}/fileContent/${filePath}`).then(res => res.json()));
    document.getElementById('file-content-div').innerText = res.data;
}

const createNewObject = async (newObjectEvent) => {
    newObjectEvent.preventDefault();
    const formInputs = newObjectEvent.target.elements;
    const checkName = validateObjectName(formInputs['new-object-name-input'].value, formInputs['create-object-select-type'].value);

    const data = {
        objectName: `${formInputs['create-at-select'].value.substring(1)}/${checkName}`,
        data: formInputs['create-object-select-type'].value === 'file' ? formInputs['file-data-textarea'].value : null
    }

    const res = (await fetch(`${apiUrl}/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data) 
    }).then(res => {
        document.getElementById('is-object-created').innerText = res.status === 200 ? `${checkName} created successfully !` : 'An error has occurred';
    }));

    setTimeout(() => {
        window.location.reload();
    }, 2500);
}

const removeObject = async (removeObjectEvent) => {
    removeObjectEvent.preventDefault();
    const toDelete = removeObjectEvent.target.elements['delete-object-select'].value;
    const res = (await fetch(`${apiUrl}/remove/${toDelete.split('/').join('_').substring(1)}`).then(res => {
        document.getElementById('is-object-deleted').innerText = res.status === 200 ? `${toDelete} removed successfully !` : 'An error has occurred';
    }));

    setTimeout(() => {
        window.location.reload();
    }, 2500);
}

const moveObject = async (moveObjectEvent) => {
    moveObjectEvent.preventDefault();
    const formInputs = moveObjectEvent.target.elements;

    const data = {
        objectToMove: formInputs['object-to-move-select'].value.substring(1),
        newPath: formInputs['new-path-select'].value.substring(1) + '/' + formInputs['object-to-move-select'].value.split('/').at(-1)
    }

    const res = (await fetch(`${apiUrl}/move`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data) 
    }).then(res => {
        document.getElementById('is-object-moved').innerText = res.status === 200 ? `${formInputs['object-to-move-select'].value} moved successfully to ${formInputs['new-path-select'].value} !` : 'An error has occurred';
    }));

    setTimeout(() => {
        window.location.reload();
    }, 2500);
}

const executeCommand = async (commandEvent) => {
    commandEvent.preventDefault();
    const formInputs = commandEvent.target.elements;

    const data = {
        command: formInputs['command-input'].value,
        shellPath: ''
    }

    const res = (await fetch(`${apiUrl}/command`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data) 
    }).then(commandRes => commandRes.json()));
    console.log(data, res)
    document.getElementById('command-output').innerText = res.data.stdout !== '' ?
        `Output for the command "${data.command}" : ${res.data.stdout}` :
        `The command "${data.command}" gived the error : ${res.data.stderr}`;
}

const validateObjectName = (objectName, type) => {
    let returnValidate;
    if (type === 'file') {
        returnValidate = /\.([A-Za-z]{1,3})$/.test(objectName) ? objectName : objectName + '.txt';
    } else if (type == 'directory') {
        returnValidate = !/\.([A-Za-z]{1,3})$/.test(objectName) ? objectName : objectName.split('.')[0];
    }
    return returnValidate;
}

getFolderContents();
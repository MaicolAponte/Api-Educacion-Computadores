const path = require('path')
const fs = require('fs')


function getFolderStructure(folderPath) {
    const structure = {};

    // Leer todos los elementos en la carpeta (archivos y subcarpetas)
    const items = fs.readdirSync(folderPath);

    items.forEach(item => {
        const itemPath = path.join(folderPath, item);

        // Si es un directorio, llama recursivamente a la función
        if (fs.lstatSync(itemPath).isDirectory()) {
            structure[item] = getFolderStructure(itemPath);
        } else {
            // Si es un archivo, simplemente agrega el nombre
            if (!structure.files) structure.files = [];
            structure.files.push(item);
        }
    });

    return structure;
}

const getDocuments = (req, res) => {
    console.log(req)
    const { filename, dane } = req.body;
    console.log(filename)
    console.log(dane)
    // Validar que el nombre de archivo fue proporcionado
    if (!filename) {
        return res.status(400).json({ error: 'Nombre del Archivo es requerido' });
    } else if (!dane) {
        return res.status(400).json({ error: 'El número de dane del colegio es requerido' });
    }

    // Construir la ruta completa del archivo PDF
    const filePath = path.join(__dirname, 'assets', dane.toString(), filename);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'El archivo no Existe' });
    }

    // Enviar el archivo PDF como respuesta
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).json({ error: 'Error enviando el archivo' });
        }
    });
}

const getAllDocuments = (req, res) => {

    // Construir la ruta completa de la carpeta
    const folderPath = path.join(__dirname, 'assets');

     // Verificar si la carpeta existe y es un directorio
     if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
        return res.status(404).json({ error: 'La carpeta con los archivos no Existe' });
    }


 
    // Obtener la estructura de carpetas y archivos
    const folderStructure = getFolderStructure(folderPath);

    // Enviar la estructura como respuesta JSON
    res.json(folderStructure);

}

module.exports = {
    getDocuments,
    getAllDocuments
}
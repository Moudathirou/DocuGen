// create-admin.js
// Fichier : create-admin.js
// Description : Ce script permet de créer un administrateur dans la base de données en hachant son mot de passe.
// Dépendances : bcrypt, config/database
// Auteur : [Votre Nom]
// Date : [Date actuelle]

const bcrypt = require('bcrypt');
const db = require('./config/database');

const email = 'kymsaindou@gmail.com'; // Email de l'administrateur
const password = 'Moud@22guerre'; // Mot de passe sécurisé

/**
 * Crée un administrateur dans la base de données.
 * 
 * @async
 * @function createAdmin
 * @returns {Promise<void>} 
 * @throws {Error} En cas d'erreur lors du hachage du mot de passe ou de l'insertion dans la base de données.
 */
async function createAdmin() {
  try {
    // Hachage du mot de passe avec un coût de 10
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (email, password, isAdmin) VALUES (?, ?, 1)', // Insertion de l'utilisateur administrateur
      [email, hashedPassword],
      function (err) {
        if (err) {
          // Gestion de l'erreur lors de l'insertion
          console.error('Erreur lors de la création de l\'administrateur :', err);
        } else {
          // Confirmation de la création de l'administrateur
          console.log('Administrateur créé avec succès');
        }
        db.close(); // Fermeture de la connexion à la base de données
      }
    );
  } catch (err) {
    // Gestion de l'erreur lors du hachage du mot de passe
    console.error('Erreur lors du hachage du mot de passe :', err);
  }
}

// Exécution de la fonction pour créer l'administrateur
createAdmin();






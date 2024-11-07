// routes/docs.js
const express = require('express');
const { OpenAI } = require('openai');
const authenticateToken = require('../middleware/auth');
const Documentation = require('../models/Documentation');

const router = express.Router();

const openai = new OpenAI({
  apiKey: "",
});

console.log('API Key:', process.env.OPENAI_API_KEY);

// Générer la documentation en utilisant GPT-4
router.post('/generate', authenticateToken, async (req, res) => {
  const { code } = req.body;

  try {
    const prompt = `
Réécris le code suivant avec une documentation professionnelle :
\n${code}\n

Instructions pour la documentation :
1. Ajoute un bloc de documentation en-tête avec:
   - Le nom du fichier
   - Les dépendances requises
   - L'auteur et la date

2. Pour chaque fonction:
   - Description claire de son but
   - @param pour chaque paramètre
   - @returns pour la valeur retournée
   - @throws pour les erreurs potentielles

3. Ajoute des commentaires concis pour:
   - Les variables importantes
   - Les étapes critiques du code
   - Les parties complexes qui méritent une explication

4. Le code doit être:
   - Correctement indenté
   - Directement utilisable (pas de markdown ou autres balises)
   - Inclure uniquement les commentaires essentiels

Format souhaité:

- Évite les commentaires redondants ou évidents
- Syntaxe native du langage
- Code directement copiable/réutilisable
- Ne mets pas de balises de formatage (\`\`\`) qui couvre tout le code en commentaire
`;


    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    const documentation = chatCompletion.choices[0].message.content.trim();

    // Enregistrer le code et la documentation dans la base de données
    await Documentation.create(code, documentation, req.user.id);

    res.json({ documentation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la génération de la documentation' });
  }
});

module.exports = router;
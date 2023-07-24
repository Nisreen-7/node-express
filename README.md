# Node Express Mongodb

Un projet node.js utilisant express pour la partie contrôleurs et mongodb pour la partie data
## How To Use

 1. Cloner le projet
 2. Faire un npm i
 3. Créer un fichier .env avec une variable d'environnement DATABASE_URL (exemple : DATABASE_URL=mongodb://127.0.0.1:27017)
 4. Lancer avec npm start


## Petit exo contrôleur express :

1. Créer un nouveau fichier first.ts dans le dossier controller, et dedans créer un Router express qu'on export.
	
2. Importer ce contrôleur dans le app.ts et l'assigner à la route /api/first
	
3. Dans le fichier first.ts, créer un tableau avec 3-4 noms en string à l'intérieur
	
4. Et sur le firstController, créer une route en get qui va renvoyer en json le tableau de noms
	
5. Dans le app.ts, rajouter une ligne app.use(express.json()) (pour permettre à express de convertir automatiquement le body des requêtes en json en objet js)
	
6. Dans le firstController, rajouter une route en post et récupérer dans le body un champ name avec req.body.name qu'on pushera dans le tableau de noms. Tester la requête avec thunderclient en lui mettant en body un {"name":"test"}
____________________________________________________
## Person Repository

1. Créer un fichier src/entities.ts et dans ce fichier déclarer une interface Address et une interface Person qui correspondent à ce qu'on a mis dans la base de données mongodb
	
2. Dans le dossier repository, créer un fichier person-repository.ts et dans ce fichier déclarer et exporter une const personRepository qui contiendra un objet pour le moment vide
	
3. Au dessus de cet objet vide, comme dans l'example.ts, faire appel à la connection pour récupérer la db et la collection person et l'assigner à une variable
	
4. Dans le personRepository, rajouter un findAll() {} et dedans faire un return du find().toArray()
	
5. Créer un personController dans son propre fichier, le charger sur la route /api/person dans le app.ts et dans ce contrôleur déclarer une route async en get sur / qui va await le personRepository.findAll() et faire un res.json du resultat
_____________________________________
## findById et persist

1. Dans le personRepository, rajouter une méthode findById(_id:string) qui va faire un findOne avec la collection pour rechercher un élément par son _id
	
2. Dans le personController, créer une nouvelle route sur /:id et récupérer la valeur de l'id avec req.params.id et utiliser cette valeur dans le findById
	
3. Faire une petite vérification que la person renvoyé n'est pas null, si elle l'est, on fait un res.status(404).end('Not Found') sinon on fait le res.json classique
	
4. Dans personRepository, on rajoute un persist(person:Person) et on l'utilise dans un insertOne
	
5. On fait une route en post dans le personController et on donne le req.body à manger au persist.
_____________________________________________
## Delete et update
	
1. Dans le personRepository, créer une méthode remove(_id:string) qui va faire une suppression sur la collection person en se basant sur l'id/ObjectId
	
2. Dans le personController, rajouter une route de type delete sur /:id, avec le middleware checkId pour s'assurer que l'id est bien un ObjectId valide
	
3. Dans cette route, appeler la méthode remove du repository et faire une réponse 204 sans contenu si ça a marché
4. Dans le personRepository, faire une méthode update qui va attendre un _id:string et un person:Person et utiliser la collection pour faire un updateOne({_id:new ObjectId(_id)}, {$set:person})
	
5. Côté contrôleur, rajouter une nouvelle route /:id avec un checkId et appeler le update dedans avec le req.params.id et le req.body et avec la validation


Pour le delete, modifier le entities.ts et passer le type de _id? à any.
Et pour faire le deleteOne il faudra lui donner un objet en argument avec {_id:new ObjectId(_id)}
_____________________________
## Créer une application angular avec routing,
 1. faire un component Home et l'assigner à la route par défaut, supprimer tout ce qu'il y a dans le app.component.html sauf le router-outlet, créer le environment.ts avec un serverUrl dedans, Rajouter le link du css de bootstrap dans le index.html, modifier le tsconfig.json pour y ajouter le strictPropertyInitialization: false
	
2. Copier-coller le fichier entities.ts du back vers le front
	
3. Générer un PersonService avec un fetchAll(), un delete(person:Person) et un post(person:Person)  dedans
	
4. Générer un PersonItemComponent avec un @Input Person dedans et y afficher la person sous forme de card à l'intérieur
	
5. Dans le HomeComponent, appeler le fetchAll du service et boucler sur le résultat dans le template pour afficher un app-person-item par résultat
	
6. Rajouter une variable selected:Person|null  dans le HomeComponent et créer une fonction select(person:Person) qui va vérifier si person == selected, si oui on met null dans selected, sinon on met person dans selected
	
7. Avec un ngStyle ou un ngClass modifier l'apparence du app-person-item dont la person correspond à selected
	
8. Rajouter une méthode removeSelected dans le HomeComponent qui va lancer la méthode delete du service puis retirer la person supprimée de la liste et remettre selected à null
	
9. Rajouter un bouton dans le template qui ne s'affichera que si selected contient quelque chose et qui au click déclenchera le removeSelected



_____________________________________
## Authentification node + express + passport?

1. Dans le projet node-express, rajouter une nouvelle interface User dans les entities qui aura un _id?:any, un email en string, un password en string et un role en string
	
2. Créer un user-repository.ts sur le même modèle que le person-repository, avec dedans juste un findByEmail et un persist
	
3. Installer la library bcrypt (qui permet de créer et comparé des hash auto salés) avec un npm i bcrypt puis un npm i @types/bcrypt -D
	
4. Créer un auth-controller.ts et dedans créer un router authController ainsi qu'un schéma de validation Joi qui va attendre un email de type string/email et un password de type string minimum 4 caractères
	
5. Dans ce contrôleur, créer une route POST sur /api/user dans laquelle on va : valider le req.body avec Joi, puis assigner un role 'ROLE_USER' au req.body, puis utiliser bcrypt pour hasher le req.body.password et le réassigner au req.body.password avant de faire persister le tout
	
6. Installer la library jsonwebtoken et son typage avec un npm i jsonwebtoken puis un npm i @types/jsonwebtoken -D
	
7. Dans le auth-controller, créer une route sur /api/login en POST qui recevra dans le body un email et un password. Utiliser le req.body.email pour faire un findByEmail, si pas de résultat, on renvoit une erreur 401, si résultat alors on utilise la méthode compare de bcrypt pour comparer le req.body.password et le password de l'objet user renvoyé par le findByEmail (méthode asynchrone, il faut donc la await), si le résultat est false, on renvoie une erreur 401
	
8. Si le résultat est vrai, alors on utilise la méthode sign de jsonwebtoken dans laquelle on va donner en premier argument le user récupéré par le findByEmail et en deuxième argument une chaîne de caractère, peu importe quoi. Cette méthode génère un token qu'on peut renvoyer dans la response
	
9. Pour la suite on pourra la faire ensemble, mais pour celles et ceux qui veulent chercher, on peut utiliser passport et passport-jwt pour faire l'authentification par token
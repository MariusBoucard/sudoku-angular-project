# Users Stories

1.  Menu  
   1.  En tant que joueur, je veux générer des grilles aléatoires afin de jouer à l'infini. 
   2.  En tant que joueur, je veux savoir le nom du jeu afin de pouvoir trouver les règles si je ne les connais pas
   3. En tant que joueur, je veux pouvoir rentrer mon nom afin que mes achèvements me soient attribués (plusieurs utilisateurs possibles)
   4. En tant que joueur, je veux pouvoir être aidé, par l'affichage de suggestions afin de m’entraîner sur des niveaux plus durs que ceux auquel je suis habitué.
   5. En tant qu'autre joueur, je ne veux pas que les parties où l'affichage de suggestions entrent en compte dans les scores afin d'éviter la triche venu de mes concurrents
   6. En tant qu'utilisateur, je veux pouvoir cliquer sur une grille affichée parmis celles générées afin de lancer une partie sur celle ci.
   7. En tant que joueur , je veux pouvoir choisir le niveau de difficulté des grilles sur lesquelles je vais m'exercer, afin que celles ci s'adaptent à mes envies.
   8. En tant qu'utilisateur, je veux que les grilles qui s'affichent pour que je les choisisse correspondent au niveau indiqué afin que je joue une partie qui corresponde à mon niveau
   9. En tant que joueur, je veux pouvoir consulter les grilles précédemment générées afin de ne pas avoir à en générer une nouvelle à chaque parties
2.  In-Game
   1. History
      1. En tant que joueur, je veux consulter l'historique de mes actions  afin de revoir mes dernières actions.
      2. En tant que joueur, je veux pouvoir annuler mes dernières actions  afin de revenir facilement en arrière en cas d'erreur.  
      3. En tant que joueur, je veux que mes différentes actions et les différentes versions de la grille se présentent sous forme d'arbre de recherche afin que je puisse explorer différentes possibilités.
      4. En tant qu'utilisateur, je veux que la case qui diffère de la grille précédente ai son chiffre d'une autre couleur afin de pouvoir clairement l'identifier
      5. En tant que joueur, je veux savoir quels sont les coups non triviaux que j'ai joué, afin de revenir dessus facilement au cas où le choix fait soit malencontreux.
      6. En tant que joueur, je veux voir l'endroit où je suis rendu dans l'arbre de recherche, afin de me repérer dans celui ci. 
   2. Grille
      1.  En tant que joueur, je veux sélectionner une case de la grille au survol afin de pouvoir la remplir par la suite. 
      2. En tant que joueur, je veux pouvoir remplir une case avec un chiffre (via une entrée clavier)  afin de compléter la grille.
      3. En tant que joueur, je veux pouvoir remplir la grille via un menu déroulant apparaissant sur la case sélectionnée  afin de ne pas avoir à utiliser le clavier pour résoudre mon sudoku. 
      4. En tant que joueur, je veux être aidé via une aide de couleur en cas de conflit de chiffres  afin de m'avertir en cas d'impossibilité . 
      5. En tant que joueur, je veux que, lorsque je l'ai demandé précédemment (lors du menu), l'on m'affiche les différents chiffres possibles dans une case donnée sous forme de suggestion, afin de m'aider lorsque la grille est complexe.
      6. En tant que joueur, je veux pouvoir effectuer un clique droit qui rempli la case avec la première valeur des suggestions, afin de rendre plus fluide mon experience de jeu pour les coups triviaux.
   3. Partie droite
      1. En tant que joueur, je veux compter mon nombre de coup en permanence  afin de m'assurer que je joue bien sous mon nom
      2. En tant que joueur, je veux voir le classement des autres joueurs pendant la partie afin de comparer mon score aux autres. 
3. End-of game
   1. En tant que joueur, je veux voir mon score et celui des autres joueurs, afin que nous puissions nous comparer.

# Acceptance criteria

1. Menu
   1. Dans le menu, un bouton doit permettre de générer des grilles sur le backend (correspondant au niveau choisis par l'utilisateur)
   2. Un titre doit être présent, sans doute en haut à gauche, afin d'identifier le jeu.
   3. Une zone de texte doit être présente et décrite afin que l'utilisateur sache qu'il doive y rentrer son nom (erreur si jamais vide ?)
   4. Une checkbox doit être présente, accolée avec un texte demandant si l'utilisateur veut avoir des suggéstions durant la partie
   5. Lorsque la précédente checkbox est cochée, le score à l'issu de la partie ne doit pas être pris en compte dans le classement, et donc seulement donné à titre indicatif au joueur
   6. Lors d'un clique sur une grille spécifique affichée, une partie doit se lancer avec celle ci
   7. Un dropdown doit être présent afin de sélectionner la difficulté des grilles affichées
   8. Une séléction doit être effectuée sur les grilles déja générées afin d afficher sous forme le liste celles qui correspondent au niveau choisis
   9. Une liste doit être présente afin d'afficher les listes séléctionnées par l'utilisateur.
2. In-game
   1. History
      1. Quelque part sur l'écran, par exemple à gauche, doit se trouver une liste de coups déjà joués, avec les grilles respectives de chacun des coups. 
      2.  Un bouton de retour en arrière doit être présent. On doit aussi pouvoir revenir en arrière de plusieurs étapes en fonction de la grille sur laquelle 
      on clique (souvenons nous que nous voulons une liste des différents coups joués avec leurs états réspectifs).
      3.  Afin de permettre à l'utilisateur de naviguer facilement dans ses recherches, l'historique se fera sous forme d'un arbre plutot que d'une liste linéaire.
      Ainsi, l'utilisateur pourra, à partir d'un coup critique, faire plusieurs branches de recherches en parallèle
      4.  Si un coup joué est clairement incorrect, mise en evidence de la case jouée et de la case posant problême à ce coup, afin que celui ci puisse résorber son erreur.
      Par exemple, on peut rendre rouge les 2 cases.
      5.  Un coup non trivial (donc critique) joué par l'utilisateur doit être mis en évidence dans l'historique afin d'être clairement identifiable comme un point où il faut revenir en cas de blocage. Pour ce faire, nous pouvons utiliser un code couleur pour colorer la grille (par exemple en violet)
      6.  La case de l'arbre d'historique stipulé précedemment qui correspond à la grille que nous avons effectivement devant les yeux, doit être mise en surbrillance, où d'une couleur différente afin que l'on sache que c'est bien cette grille là qui est manipulée.
   2. Grille
      1.  Afin que l'utiliseur puisse savoir la case qu'il survole (hover), on doit changer le fond de couleur de celle ci. Il faut donc connaitre la position de la souris en continu, ou bien existe t'il une fonction détectant le surol d'un objet en html?
      2. Mettre en place un mécanisme de séléction d'une case, par exemple un clic sur l'une d'entre elles, qui permettrait ensuite de changer la valeur de celle ci par une entrée utilisateur au clavier.
      3.  Lors d'un autre intervention de l'utilisateur sur une case, par exemple un autre clic, faire apparaitre un menu déroulant, de 1 à 9 permettant de définir la valeurs de la case, ceci permettrait de s'affranchir des entrées clavier.
      4.  Lors d'un coup impossible, l'affichage doit permettre au joueur de s'en rendre compte facilement. Pour ca nous pouvons changer la couleur des cases fautives par une couleur agressive : rouge, ou bien les barrer.
      5.  La suggestion des coups possible doit s'afficher dans les cases pas encore remplies. Afin d'aider l'utilisateur au mieux, ces coups doivent être facilement
      identifiables, mais sans pour autant gener la lecture de la grille par l'espace qu'ils prennent. Ainsi, ils devraient être d'une couleur plus clair que les coups joués, et se situer en bordure/ frontière de case et en plus petit.
      6.  Lors d'un clic droit du joueur, même si les suggestions ne sont pas affichées, il faut prendre la première valeur (dans l'ordre croissant) de celles ci, pour remplir la case. Ainsi, cela fluidifie le jeu pour les coups triviaux de fin de partie par exemple.
   3. Partie Droite
      1.  Il faut mettre en place un affichage des coups en temps réel, par exemple sur la partie droite de l'écran : un label avec écrit coups : Nombrecoupsactuel.
      2.  Il faut ajouteur par exemple un bouton (bien sur joli et attrayant, cohérent avec le contenu qu'il propose), permettant l'affichage du classement des autres joueurs sur des grilles de ce niveau de difficulté. Cet affichage doit aussi comprendre leur nombre de coups respectifs afin que le joueur puisse savoir si il est toujours dans la course.
3. End of game
   1. A la fin de la partie, le classement doit s'afficher automatiquement afin que le joueur puisse être témoin de son accession (ou non) au podium. 

\-> clique gauche -> affiche les valeurs

\-> clique droit -> prend la première valeur suggérée (si une valeur possible c'est niquel)

\-> gris endroit ou on est -> clique sur n'importe quelle cellule pour revenir

\-> violet/rose : choix risqué (pas trivial, plusieurs possibilités donc pas sûr de prendre le bon chemin => utile pour faciliter le retour arriere en cas de blocage plus tard, pour revenir au dernier choix à risque)

\-> attention aux fichiers cachés quand on commit

\-> git checkout + nom du commit, on récupère le code de ce commit -> On peut revenir pour le versionning, on peut mettre des tags sur les versions

\-> on crée les tags en locals, puis il faut faire l'adaptation en remote aussi

ssh -T git@gitlab.insa-rennes.fr -p 16022
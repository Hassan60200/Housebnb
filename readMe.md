<h1> Installation de l'application:</h1>


1)Clonez le dépot où vous voulez <br>
2)Installez les dépendances : composer install<br>
3)Créez votre propre base de donnée sur le .env et par la suite sur le terminale tapez: doctrine:database:create <br>
4)Jouez les migrations : php bin/console doctrine:migrations:migrate<br>
5)Jouez les fixtures : php bin/console d:f:l --no-interaction<br>
6)Lancez le server : symfony serve ou php -S localhost:3000 -t public <br>
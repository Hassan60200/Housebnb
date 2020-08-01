Installation de l'application:


Clonez le dépot où vous voulez
Installez les dépendances : composer install
Jouez les migrations : php bin/console d:m:m
Jouez les fixtures : php bin/console d:f:l --no-interaction
Lancez le server : symfony serve ou php -S localhost:3000 -t public
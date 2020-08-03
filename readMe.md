<h1> Installation de l'application:</h1>

<ol>
    <li> Clonez le dépot où vous voulez</li> <br>
    <li>Installez les dépendances : composer install</li><br>
    <li>Créez votre propre base de donnée sur le .env et par la suite sur le terminale tapez: doctrine:database:create
    </li> <br>
    <li>Jouez les migrations : php bin/console doctrine:migrations:migrate</li><br>
    <li>Jouez les fixtures : php bin/console d:f:l --no-interaction</li><br>
    <li>Lancez le server : symfony serve ou php -S localhost:3000 -t public</li> <br>
</ol>
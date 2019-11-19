<?php

namespace App\DataFixtures;

use App\Entity\Ad;
use App\Entity\Booking;
use Faker\Factory;
use App\Entity\User;
use App\Entity\Image;
use App\Entity\Role;
use Cocur\Slugify\Slugify;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $encoder;


    public function __construct(UserPasswordEncoderInterface $encoder){
        $this->encoder = $encoder;
    }
    public function load(ObjectManager $manager)
    {

        $faker = Factory::create('fr-FR');

        $adminRole = new Role();
        $adminRole->setTitle('ROLE_ADMIN');
        $manager->persist($adminRole);

        $adminUser = new User();
        $adminUser->setFirstName('Hassan')
                  ->setLastName('Derkaoui')
                  ->setEmail('derkaouihassan@gmail.com')
                  ->setIntroduction($faker->sentence())
                  ->setDescription('<p>' . join('<p></p>', $faker->paragraphs(3)) . '</p>')
                  ->setHash($this->encoder->encodePassword($adminUser, 'password'))
                  ->setPictures('http://placehold.it/64x64')
                  ->addUserRole($adminRole);

                  $manager->persist($adminUser);

        // Nous gérons les utilisateurs
        $users = [];
        $genres = ['male', 'female'];

        for ($i = 1; $i <= 10; $i++) {

            $user = new User();
            $genre = $faker->randomElement($genres);

            $picture = 'https://randomuser.me/api/portraits/';
            $pictureId = $faker->numberBetween(1, 99). '.jpg';

            $picture .=  ($genre == 'male' ? 'men/': 'women/') . $pictureId;

            $hash = $this->encoder->encodePassword($user, 'password');


            $user->setFirstName($faker->firstname($genre))
                ->setLastName($faker->lastName)
                ->setEmail($faker->email)
                ->setIntroduction($faker->sentence())
                ->setDescription('<p>' . join('<p></p>', $faker->paragraphs(3)) . '</p>')
                ->setHash($hash)
                ->setPictures($picture);

            $manager->persist($user);
            $users[] = $user;
        }

        // Nous gérons les annonces
        for ($i = 1; $i <= 30; $i++) {

            $ad = new Ad();

            $title = $faker->sentence();
            $coverImage = $faker->imageURL(1000, 350);
            $introduction = $faker->paragraph(2);
            $content = '<p>' . join('<p></p>', $faker->paragraphs(5)) . '</p>';

            $user = $users[mt_rand(0, count($users) - 1)];

            $ad->setTitle($title)
                ->setCoverImage($coverImage)
                ->setIntroduction($introduction)
                ->setContent($content)
                ->setPrice(mt_rand(40, 200))
                ->setRooms(mt_rand(1, 5))
                ->setAuthor($user);


            for ($j = 1; $j <= mt_rand(2, 5); $j++) {
                $image = new Image();

                $image->setUrl($faker->imageURL())
                    ->setCaption($faker->sentence())
                    ->setAd($ad);

                $manager->persist($image);
            }


            // Gestion des reservation
            for($j = 1; $j <= mt_rand(0,10); $j++){
                $booking = new Booking();

                $createdAt = $faker->dateTimeBetween('- 6 months');
                $startDate = $faker->dateTimeBetween('- 3 months');

                $duration = mt_rand(3,10);

                $endDate = (clone $startDate)->modify("+$duration days");

                $amount =  $ad->getPrice() * $duration;

                $booker = $users[mt_rand(0, count($users) -1)];

                $booking->setBooker($booker)       
                        ->setAd($ad)
                        ->setStartDate($startDate)
                        ->setEndDate($endDate)
                        ->setCreatedAt($createdAt)
                        ->setAmount($amount);

                        $manager->persist($booking);
            }


            $manager->persist($ad);
        }

        $manager->flush();
    }
}

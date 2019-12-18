<?php

namespace App\Service;

use Doctrine\Common\Persistence\ObjectManager;

class StatsService{

    private $manager;

    public function __construct(ObjectManager $manager)
    {
        $this->manager = $manager;
    }
     public function getStats(){
        $users = $this->getUsersCount();
        $ads = $this->getAdsCount();
        $bookings = $this->getBookingsCount();
        $comments = $this->getCommentsCount();

        return compact('users', 'ads', 'bookings', 'comments');

     }
    public function getUsersCount(){
        return $this->manager->createQuery('SELECT count(u) FROM App\Entity\User u')->getSingleScalarResult();
    } 

    public function getAdsCount(){
        return $this->manager->createQuery('SELECT count(a) FROM App\Entity\Ad a')->getSingleScalarResult();
    }

    public function getBookingsCount(){
        return $this->manager->createQuery('SELECT count(b) FROM App\Entity\Booking b')->getSingleScalarResult();
    }

    public function getCommentsCount(){
        return $this->manager->createQuery('SELECT count(c) FROM App\Entity\Comment c')->getSingleScalarResult();
    }

    public function getAdsStats($direction){
      return  $this->manager->createQuery(
            'SELECT AVG(c.rating) as note, a.title, a.id, u.firstName, u.lastName, u.pictures 
            FROM App\Entity\Comment c 
            JOIN c.ad a 
            JOIN a.author u 
            GROUP BY a 
            ORDER BY note ' . $direction
        )
        ->setMaxResults(5)
        ->getResult();

    }
}

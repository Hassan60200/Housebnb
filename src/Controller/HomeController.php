<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\AdRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends Controller{


    /**
     * 
     *@Route("/", name="homepage")
     */
    public function home(AdRepository $adRepo, UserRepository $userRepo){
        return $this->render(
            'home.html.twig',
            [
                'ads' => $adRepo->findBestAds(3),
                'users' => $userRepo->findBestUsers()
            ]
         );    
        }
}
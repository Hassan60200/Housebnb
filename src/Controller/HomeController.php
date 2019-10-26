<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends Controller{

/**
 * @Route("/bonjour/{prenom}/age/{age}", name="hello")
 * @Route("/salut", name="hello_base")
 * @Route("/bonjour/{prenom}", name="hello_prenom")
 */

public function hello($prenom = "anonyme", $age=0){
    return $this->render(
        'hello.html.twig',
        [
            'prenom' => $prenom,
            'age' => $age
        ]
        );
}












    /**
     * Undocumented function
     *@Route("/", name="homepage")
     */
    public function home(){
        return $this->render(
            'home.html.twig',
            ['title' => "Salut à tous"]
        );    
        }
}
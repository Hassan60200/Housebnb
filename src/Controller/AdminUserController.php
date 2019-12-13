<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\AccountType;
use App\Repository\UserRepository;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AdminUserController extends AbstractController
{
    /**
     * @Route("/admin/users", name="admin_user_index")
     */
    public function index(UserRepository $repo)
    {
        return $this->render('admin/user/index.html.twig', [
            'user' => $repo->findAll()
        ]);
    }

/**
 * Permet de modifier un utilisateur
 * @Route("/admin/users/{id}/edit", name="admin_user_edit")
 *
 * @param Request $request
 * @param ObjectManager $manager
 * @return Response
 */
    public function edit(Request $request, ObjectManager $manager, User $user){

        $form = $this->createForm(AccountType::class, $user);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $manager->persist($user);
            $manager->flush();

            $this->addFlash(
                'success',
                "Les données de l'utilisateur {$user->getFullName()} a bien été modifié. !"
            );
        }
        return $this->render('admin/user/edit.html.twig', [
            'form' => $form->createView(),
            'user' => $user
        ]);
    }

    /**
     * Permet de supprimer un utilisateur
     * @Route("/admin/users/{id}/delete", name="admin_user_delete")
     *
     * @param User $user
     * @param ObjectManager $manager
     * @return Response
     */
    public function delete(User $user, ObjectManager $manager)
    {

        $manager->remove($user);
        $manager->flush();

        $this->addFlash(
            'success',
            "Vous venez de supprimer l'utilisateur {$user->getFullName()} !"
        );
        return $this->redirectToRoute("admin_user_index");
    }
}

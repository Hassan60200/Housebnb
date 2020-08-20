<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\AccountType;
use App\Repository\UserRepository;
use App\Service\PaginationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminUserController extends AbstractController
{
    /**
     * @Route("/admin/users{page<\d+>?1}", name="admin_user_index")
     */
    public function index(UserRepository $repo, $page, PaginationService $pagination)
    {
        $pagination->setEntityClass(User::class)
            ->setPage($page);


        return $this->render('admin/user/index.html.twig', [
            'pagination' => $pagination
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
    public function edit(Request $request, EntityManagerInterface $entityManager, User $user)
    {

        $form = $this->createForm(AccountType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($user);
            $entityManager->flush();

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
    public function delete(User $user, EntityManagerInterface $entityManager)
    {

        $entityManager->remove($user);
        $entityManager->flush();

        $this->addFlash(
            'success',
            "Vous venez de supprimer l'utilisateur {$user->getFullName()} !"
        );
        return $this->redirectToRoute("admin_user_index");
    }
}

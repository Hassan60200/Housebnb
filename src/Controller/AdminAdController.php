<?php

namespace App\Controller;

use App\Entity\Ad;
use App\Form\AdType;
use App\Repository\AdRepository;
use App\Service\PaginationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminAdController extends AbstractController
{
    /**
     * @Route("/admin/ads/{page<\d+>?1}", name="admin_ads_index")
     */
    public function index(AdRepository $repo, $page, PaginationService $pagination)
    {
        $pagination->setEntityClass(Ad::class)
                    ->setPage($page);

        return $this->render('admin/ad/index.html.twig', [
          'pagination' => $pagination
        ]);
    }

    /**
     * Permet d'afficher le formulaire d'édition 
     * @Route("/admin/ads/{id}/edit", name="admin_ads_edit")
     * 
     * @param Ad $ad
     * @return Response
     */
    public function edit(Ad $ad, Request $request, EntityManagerInterface $entityManager)
    {
        $form = $this->createForm(AdType::class, $ad);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($ad);
            $entityManager->flush();

            $this->addFlash(
                'success',
                "L'annonce {$ad->getTitle()} a bien été enregistrer !"
            );
        }

        return $this->render('admin/ad/edit.html.twig', [
            'form' => $form->createView(),
            'ad' => $ad
        ]);
    }

    /**
     * Permet de supprimer une annonce
     *
     * @Route("/admin/ads/{id}/delete", name="admin_ads_delete")
     * 
     * @param Ad $ad
     * @param ObjectManager $manager
     * @return Response
     */
    public function delete(Ad $ad, EntityManagerInterface $entityManager)
    {
        if (count($ad->getBookings()) > 0) {
            $this->addFlash(
                'warning',
                "Vous ne pouvez pas supprimée l'annonce <strong>{{$ad->getTitle()}}</strong> car elle possède déjà des réservations"
            );
        } else {
            $entityManager->remove($ad);
            $entityManager->flush();

            $this->addFlash(
                'success',
                "L'annonce <strong>{$ad->getTitle()}</strong> a bien été supprimée !!!"
            );
        }

        return $this->redirectToRoute('admin_ads_index');
    }
}

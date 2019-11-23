<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\AccountType;
use App\Entity\PasswordUpdate;
use App\Form\RegistrationType;
use App\Form\PasswordUpdateType;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AccountController extends AbstractController
{
    /**
     * permet d'afficher et de gerer le formulaire de connexion
     * @Route("/login", name="account_login")
     * @return Response
     */
    public function login(AuthenticationUtils $utils)
    {
        $error = $utils->getLastAuthenticationError();
        $username = $utils->getLastUsername();

        return $this->render('account/login.html.twig', [
            'hasError' => $error !== null,
            'username' => $username
        ]);
    }

    /**
     * permet de se déconnecté
     * @Route("/logout", name="account_logout")
     * @return Response
     */
    public function logout()
    {
        //rien du tout symfony s'occupe de le déconnexion tout seul
    }


    /**
     * permet de s'inscrire
     * @Route("/register", name="register")
     * @return Response
     */
    public function register(Request $request, ObjectManager $manager, UserPasswordEncoderInterface $encoder)
    {
        $user = new User();

        $form = $this->createForm(RegistrationType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $hash = $encoder->encodePassword($user, $user->getHash());
            $user->setHash($hash);

            $manager->persist($user);
            $manager->flush();

            $this->addFlash(
                'success',
                "Votre compte a bien été crée ! Vous pouvez vous connectez"
            );

            return $this->redirectToRoute('account_login');
        }

        return $this->render('account/registration.html.twig', [
            'form' => $form->createView()
        ]);
    }


    /**
     * Permet de modifier son profil
     *@Route("/account/profile", name="account_profil") 
     *@IsGranted("ROLE_USER")
     * @return Response
     */
    public function profil(Request $request, ObjectManager $manager)
    {

        $user = $this->getUser();
        $form = $this->createForm(AccountType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $manager->persist($user);
            $manager->flush();

            $this->addFlash(
                'success',
                'Vous venez de modifer votre profil'
            );
        }

        return $this->render('account/profil.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * Modifiez le mot de passe
     * @Route("/account/update-password", name="account_password")
     * @IsGranted("ROLE_USER")
     * @return Response
     */
    public function updatePassword(Request $request, UserPasswordEncoderInterface $encoder, ObjectManager $manager)
    {

        $passwordUpdate = new PasswordUpdate();

        $user = $this->getUser();

        $form = $this->createForm(PasswordUpdateType::class, $passwordUpdate);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Vérifiez que le oldPassword soit le même que le password de l'user
            if(!password_verify($passwordUpdate->getOldPassword(), $user->getHash())){
            //gérer l'erreur
                $form->get('oldPassword')->addError(new FormError('Le mot de passe que vous venez de taper n\'est pas votre mot de passe actuel'));
            } else { 
                $newPassword = $passwordUpdate->getNewPassword();
                $hash = $encoder->encodePassword($user, $newPassword);

                $user->setHash($hash);

                $manager->persist($user);
                $manager->flush();

                $this->addFlash(
                    'success',
                    'Vous venez de changer de mot de passe'
                );

                return $this->redirectToRoute('homepage');
            } 
        }


        return $this->render('account/password.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * Permet d'afficher le profil de l'utilisateur connecté
     * 
     * @Route("/account", name="account_index")
     * @IsGranted("ROLE_USER")
     * @return Response
     */
    public function myAccount(){
        return $this->render('user/index.html.twig', [
            'user' => $this->getUser()
        ]);
    }

    /**
     * Permet d'afficher la liste des réservations faite par l'user
     *
     * @Route("/account/bookings", name="account_bookings")
     * 
     * @return Response
     */
    public function bookings(){
        return $this->render('account/bookings.html.twig');
    }
}

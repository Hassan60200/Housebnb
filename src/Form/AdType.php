<?php

namespace App\Form;

use App\Entity\Ad;
use App\Form\ImageType;
use App\Form\ApplicationType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\MoneyType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

class AdType extends ApplicationType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, $this->getConfiguration("Titre de l'annonce", "Taper votre titre"))
            ->add('slug', TextType::class, $this->getConfiguration("Chaine URL", "Taper une adresse web (automatique)", [
                'required' => false
            ]))
            ->add('coverImage', UrlType::class, $this->getConfiguration("URL de l'image principale", "Donnez l'adresse de l'image"))
            ->add('introduction', TextType::class, $this->getConfiguration("Introduction", "Donnez une introduction globale de l'annonce"))
            ->add('Content', TextareaType::class, $this->getConfiguration("Description", "Donnez une description détaillée de l'annonce"))
            ->add('rooms', IntegerType::class, $this->getConfiguration("Nombres de chambres", "Nombres de chambres disponibles"))
            ->add('price', MoneyType::class, $this->getConfiguration("Prix par nuit", "Mettez votre prix pour une nuit"))
            ->add('images', CollectionType::class, 
            [
                'entry_type' => ImageType::class,
                'allow_add' => true,
                'allow_delete' => true
            ]
        );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Ad::class,
        ]);
    }
}

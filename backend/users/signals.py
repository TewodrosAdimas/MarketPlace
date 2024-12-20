from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User
from django.core.mail import send_mail
import random

@receiver(post_save, sender=User)
def handle_user_registration(sender, instance, created, **kwargs):
    if created:
        if instance.user_type == 'seller':
            instance.is_active = False
            instance.save()
        elif instance.user_type == 'buyer':
            instance.is_active = False
            instance.verification_code = str(random.randint(100000, 999999))
            instance.save()
            send_mail(
                'Your Verification Code',
                f'Your code is {instance.verification_code}',
                'no-reply@yourstore.com',
                [instance.email],
            )

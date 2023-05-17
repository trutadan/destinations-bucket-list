from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Role(models.TextChoices):    
        ADMIN = "ADMIN", "Admin"
        REGULAR = "REGULAR", "Regular"

    first_name = models.CharField(max_length=20, db_column="first_name")
    last_name = models.CharField(max_length=20, db_column="last_name")
    email = models.EmailField(unique=True, db_column="email")
    username = models.CharField(primary_key=True, unique=True, db_index=True, max_length=15, db_column="username")
    password = models.CharField(max_length=25, db_column="password")
    role = models.CharField(max_length=10, choices=Role.choices, db_column="role")

    verbose_name_plural = "users"

    def save(self, *args, **kwargs):
        # User is being created
        if not self.pk: 
            if self.is_staff:
                self.role = self.Role.ADMIN
            else:
                self.role = self.Role.REGULAR
            
        super().save(*args, **kwargs)

    def __str__(self):
        return f"user {self.username}" 
    
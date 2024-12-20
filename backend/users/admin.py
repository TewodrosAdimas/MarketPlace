from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'user_type', 'is_active', 'is_approved')
    list_filter = ('user_type', 'is_active', 'is_approved')
    actions = ['approve_sellers']

    def approve_sellers(self, request, queryset):
        for user in queryset.filter(user_type='seller', is_approved=False):
            user.is_approved = True
            user.is_active = True
            user.save()
        self.message_user(request, "Selected sellers approved.")
    approve_sellers.short_description = "Approve selected sellers"

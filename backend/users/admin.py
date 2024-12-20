from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = ('username', 'email', 'user_type', 'is_active', 'is_approved')
    
    # Allow filtering by user_type, is_active, and is_approved in the admin interface
    list_filter = ('user_type', 'is_active', 'is_approved')
    
    # Actions for the admin interface
    actions = ['approve_sellers']

    def approve_sellers(self, request, queryset):
        """
        Custom action to approve selected sellers.
        This will activate the sellers and mark them as approved.
        """
        for user in queryset.filter(user_type='seller', is_approved=False):
            user.is_approved = True
            user.is_active = True
            user.save()
        
        # Display a success message after approval
        self.message_user(request, "Selected sellers approved.")
    
    approve_sellers.short_description = "Approve selected sellers"

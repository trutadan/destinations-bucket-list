from api.views.register_view import RegisterView
from api.views.login_view import LoginView
from api.views.logout_view import LogoutView
from api.views.cancel_account_view import CancelAccountView
from api.views.user_account_view import UserAccountView
from api.views.user_view import UserListView, UserDetailView

from django.urls import path


urlpatterns = [
    # any user
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),

    # any system user
    path('logout/', LogoutView.as_view()),
    path('account/', UserAccountView.as_view()),
    path('account/cancel/', CancelAccountView.as_view()),

    # admin only
    path('users/', UserListView.as_view()),
    path('users/<int:pk>/', UserDetailView.as_view()), 
]
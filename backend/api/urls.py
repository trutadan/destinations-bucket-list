from api.views.register_view import RegisterView
from api.views.login_view import LoginView
from api.views.logout_view import LogoutView
from api.views.cancel_account_view import CancelAccountView
from api.views.user_account_view import UserAccountView
from api.views.user_view import UserListView, UserDetailView
from api.views.add_destination_view import AddDestinationView
from api.views.update_destination_view import UpdateDestinationView
from api.views.delete_destination_view import DeleteDestinationView
from api.views.list_destinations_view import ListDestinationsView
from api.views.list_specific_destination_view import ListSpecificDestinationView
from django.urls import path


urlpatterns = [
    # any user
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),

    # any system user
    path('logout/', LogoutView.as_view()),
    path('account/', UserAccountView.as_view()),
    path('account/cancel/', CancelAccountView.as_view()),

    path('destinations/', ListDestinationsView.as_view()),  # get list of destinations
    path('destinations/search/', ListSpecificDestinationView.as_view()),  # get a single destination
    path('destinations/add/', AddDestinationView.as_view()),  # add destination
    path('destinations/update/', UpdateDestinationView.as_view()),  # update destination
    path('destinations/delete/', DeleteDestinationView.as_view()),  # delete destination


    # admin only
    path('users/', UserListView.as_view()),
    path('users/<int:pk>/', UserDetailView.as_view()), 
]
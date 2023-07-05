# destinations-bucket-list
 This project was developed as an assignment for the Software Engineering university subject. 
 It was completed collaboratively by the following team members:

- [Dan(me)](https://github.com/trutadan)
- [Dragos](https://github.com/vintiladragos)
- [Remus](https://github.com/Gabarsolon)

DestinationBucketList is an application that allows users to create and manage a personal private vacation destinations bucket list. 
Users can register, add public destinations, create private destinations, and manage their items.

## Features

- **Login**: Users can log in to access their account and manage their bucket list.
- **Public List of Destinations**: An admin can add public destinations visible to all users.
- **Private Bucket List**: Users can add private destinations to their bucket list.
- **Update/Delete Destinations**: Users can update or delete destinations from their own private bucket list.
- **Account Cancellation**: Users have the option to cancel their account.
- **Account Update**: Users can update their account details such as username.

## Technologies Used

- **Backend**: Django
- **Frontend**: React

## Installation

To run the DestinationBucketList application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/trutadan/destinations-bucket-list/`
2. Change into the backend directory: `cd backend`
3. Install the backend dependencies: `pip install -r requirements.txt`
4. Run the backend server: `python manage.py runserver`
5. Open a new terminal window and change into the frontend directory: `cd ../frontend`
6. Install the frontend dependencies: `npm install`
7. Start the frontend development server: `npm run dev`

The application should now be running on your local machine. 
By default, you can access it by navigating to `http://127.0.0.1:5173/` in your web browser.

## Usage

1. Open the DestinationBucketList application in your web browser.
2. Register for a new account or log in if you already have one.
3. Explore the public list of destinations and add them to your private bucket list.
4. Create new private destinations by providing the necessary details such as geolocation, title, image, description, and stay dates.
5. Manage your bucket list by updating or deleting destinations.
6. To cancel your account, navigate to the account settings and follow the provided instructions.
7. Update your account details, such as the username, by accessing the account settings.
